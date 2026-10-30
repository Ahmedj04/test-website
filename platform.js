(() => {
    'use strict';

    const stickyNav = document.querySelector('.dp-sticky-nav');
    if (stickyNav) {
        const updateNavHeight = () => {
            document.documentElement.style.setProperty('--dp-nav-height', `${stickyNav.offsetHeight}px`);
        };
        updateNavHeight();
        if ('ResizeObserver' in window) {
            new ResizeObserver(updateNavHeight).observe(stickyNav);
        } else {
            window.addEventListener('resize', updateNavHeight);
        }
    }

    const tablist = document.querySelector('.dp-tour-tabs');
    if (!tablist) return;
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
    if (panels.some(panel => !panel)) return;

    function selectTab(index, focus = false) {
        tabs.forEach((tab, position) => {
            const selected = position === index;
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = selected ? 0 : -1;
            panels[position].hidden = !selected;
        });
        if (focus) tabs[index].focus({ preventScroll: true });
    }

    tabs.forEach((tab, index) => {
        panels[index].setAttribute('role', 'tabpanel');
        panels[index].setAttribute('aria-labelledby', tab.id);
        panels[index].tabIndex = 0;
        tab.addEventListener('click', () => selectTab(index));
        tab.addEventListener('keydown', event => {
            const keys = {
                ArrowRight: (index + 1) % tabs.length,
                ArrowLeft: (index - 1 + tabs.length) % tabs.length,
                Home: 0,
                End: tabs.length - 1
            };
            if (!(event.key in keys)) return;
            event.preventDefault();
            selectTab(keys[event.key], true);
        });
    });

    selectTab(0);
    tablist.hidden = false;
})();
