(() => {
    'use strict';
    // These are illustrative workflow scenes, not live product or delivery states.
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
    const tabs = Array.from(document.querySelectorAll('.da-stage-tab'));
    const panel = document.getElementById('stage-panel');
    const illustrations = Array.from(document.querySelectorAll('[data-stage-art]'));
    if (!tabs.length || !panel) return;
    function selectStage(key, moveFocus = false) {
        const stage = stages[key];
        if (!stage) return;
        tabs.forEach(tab => {
            const selected = tab.dataset.stage === key;
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = selected ? 0 : -1;
            if (selected && moveFocus) tab.focus({ preventScroll: true });
        });
        panel.setAttribute('aria-labelledby', `tab-${key}`);
        document.getElementById('stage-eyebrow').textContent = `${stage.number} / 06`;
        document.getElementById('stage-title').textContent = stage.label;
        document.getElementById('stage-subtitle').textContent = stage.title;
        document.getElementById('stage-description').textContent = stage.description;
        illustrations.forEach(figure => { figure.hidden = figure.dataset.stageArt !== key; });
    }
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => selectStage(tab.dataset.stage));
        tab.addEventListener('keydown', event => {
            let nextIndex;
            if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
            if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = tabs.length - 1;
            if (nextIndex === undefined) return;
            event.preventDefault();
            selectStage(tabs[nextIndex].dataset.stage, true);
        });
    });
    selectStage('acquire');
})();
