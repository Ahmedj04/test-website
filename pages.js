// Shared by the homepage and platform page. Each block runs only if its HTML exists.
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Both pages use the same click and keyboard controls for their stage tabs.
    function setupTabs(tabs, showStage) {
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => showStage(index));
            tab.addEventListener('keydown', event => {
                let next = index;
                if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
                else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
                else if (event.key === 'Home') next = 0;
                else if (event.key === 'End') next = tabs.length - 1;
                else return;

                event.preventDefault();
                showStage(next);
                tabs[next].focus({ preventScroll: true });
            });
        });
        showStage(0);
    }

    // HOMEPAGE: update the text and illustration when a stage is selected.
    const homeTabs = document.querySelectorAll('.da-stage-tab');
    if (homeTabs.length) {
        // Edit the homepage stage text here. The keys match data-stage in the HTML.
        const stages = {
            acquire: {
                number: '01', label: 'Acquire', title: 'Start processing when a document arrives.',
                description: 'Upload PDFs and images, import Outlook messages or attachments, or submit documents through the API.'
            },
            extract: {
                number: '02', label: 'Extract', title: 'Capture once. Use throughout the process.',
                description: 'Capture single values and repeated sections using the fields and extraction guidance configured for your workflow.'
            },
            transform: {
                number: '03', label: 'Transform', title: 'Remove the manual reformatting.',
                description: 'Map values into a common output structure. Standardise dates and numbers, apply lookups and calculate derived values.'
            },
            validate: {
                number: '04', label: 'Validate', title: 'Put your business rules to work.',
                description: 'Check required values, ranges, allowed values and dates before delivery. Configure warning or blocking rules to fit your process.'
            },
            review: {
                number: '05', label: 'Review', title: 'Keep work moving. Bring people in where needed.',
                description: 'Review all documents, focus on exceptions, or omit routine review. Blocking failures still need attention. This is data review; business approval stays in your downstream process.'
            },
            deliver: {
                number: '06', label: 'Deliver', title: 'Finish with a record in your system.',
                description: 'Deliver configured records to your applications or storage, with delivery status and supported retries. Your receiving system handles the business actions that follow.'
            }
        };
        const illustrations = document.querySelectorAll('[data-stage-art]');

        function showHomeStage(index) {
            const key = homeTabs[index].dataset.stage;
            const stage = stages[key];
            homeTabs.forEach((tab, position) => {
                tab.setAttribute('aria-selected', position === index ? 'true' : 'false');
                tab.tabIndex = position === index ? 0 : -1;
            });
            document.getElementById('stage-panel').setAttribute('aria-labelledby', homeTabs[index].id);
            document.getElementById('stage-eyebrow').textContent = stage.number + ' / 06';
            document.getElementById('stage-title').textContent = stage.label;
            document.getElementById('stage-subtitle').textContent = stage.title;
            document.getElementById('stage-description').textContent = stage.description;
            illustrations.forEach(figure => { figure.hidden = figure.dataset.stageArt !== key; });
        }

        setupTabs(homeTabs, showHomeStage);
    }

    // PLATFORM: show the selected stage panel. Its text stays in platform.html.
    const platformTablist = document.querySelector('.dp-tour-tabs');
    if (platformTablist) {
        const tabs = platformTablist.querySelectorAll('[role="tab"]');
        tabs.forEach(tab => {
            const panel = document.getElementById(tab.getAttribute('aria-controls'));
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('aria-labelledby', tab.id);
            panel.tabIndex = 0;
        });

        function showPlatformStage(index) {
            tabs.forEach((tab, position) => {
                const selected = position === index;
                tab.setAttribute('aria-selected', selected ? 'true' : 'false');
                tab.tabIndex = selected ? 0 : -1;
                document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
            });
        }

        setupTabs(tabs, showPlatformStage);
        platformTablist.hidden = false;
    }

    // PLATFORM: measure the sticky menu and highlight the section below it.
    const nav = document.querySelector('.dp-sticky-nav');
    if (nav) {
        const links = nav.querySelectorAll('a[href^="#"]');

        function updateNavigation() {
            const navHeight = nav.offsetHeight;
            document.documentElement.style.setProperty('--dp-nav-height', navHeight + 'px');
            let currentLink = null;

            links.forEach(link => {
                const section = document.getElementById(link.hash.slice(1));
                if (section && section.getBoundingClientRect().top <= navHeight + 40) {
                    currentLink = link;
                }
            });
            links.forEach(link => {
                if (link === currentLink) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        }

        window.addEventListener('scroll', updateNavigation, { passive: true });
        window.addEventListener('resize', updateNavigation);
        window.addEventListener('load', updateNavigation);

        // Images and changing stage panels can move sections without a window resize.
        if ('ResizeObserver' in window) {
            new ResizeObserver(updateNavigation).observe(document.getElementById('platform-content'));
        }
        updateNavigation();
    }
});
