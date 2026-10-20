(() => {
    'use strict';
    // These examples explain the stages; they do not create or process workflows.
    const stages = {
        ingest: {
            number: '01', label: 'Ingest', title: 'Give every document a starting point.',
            description: 'Upload documents or receive them through an integration. Ingestion brings documents into the workflow so the next steps can begin.',
            question: 'How will documents enter this workflow?',
            exampleTitle: 'An invoice arrives.', exampleDescription: 'A supplier invoice enters the workflow, ready for the configured fields to be captured.',
            from: 'Incoming document', to: 'Ready for extraction'
        },
        extract: {
            number: '02', label: 'Extract', title: 'Capture the information that matters.',
            description: 'Capture configured fields and repeated data from your documents. Define the single values and repeated information, such as line items, that your process needs.',
            question: 'Which fields and repeated data do you need to capture?',
            exampleTitle: 'From invoice to structured data.', exampleDescription: 'Capture the supplier name, invoice number, total and individual line items from the invoice.',
            from: 'Invoice document', to: 'Configured fields and line items'
        },
        transform: {
            number: '03', label: 'Transform', title: 'Get your data into the right format.',
            description: 'Convert extracted values into the required format. Prepare the captured information for the checks, review and downstream use that follow.',
            question: 'What format should the extracted values use?',
            exampleTitle: 'Make the values consistent.', exampleDescription: 'For this example, convert an extracted invoice date into the date format required by the receiving process.',
            from: 'Extracted values', to: 'Values in the required format'
        },
        validate: {
            number: '04', label: 'Validate', title: 'Put your business rules to work.',
            description: 'Apply required checks and business rules to your data. Make validation part of the process before values are reviewed and results are delivered.',
            question: 'Which required checks and business rules should apply?',
            exampleTitle: 'Check what the process needs.', exampleDescription: 'In this invoice example, check that the required invoice number and supplier information are present before review.',
            from: 'Prepared invoice data', to: 'Data checked against your rules'
        },
        review: {
            number: '05', label: 'Review', title: 'Bring people in where attention is needed.',
            description: 'Confirm values and resolve issues that need attention. Give your team a review step before results move to their destination.',
            question: 'What should your team confirm before delivery?',
            exampleTitle: 'A reviewer resolves an issue.', exampleDescription: 'A team member checks the invoice data, confirms the values and resolves information that needs attention.',
            from: 'Data needing attention', to: 'Confirmed, reviewed results'
        },
        deliver: {
            number: '06', label: 'Deliver', title: 'Get the results where they belong.',
            description: 'Keep results in DocAcquire or send them downstream. Complete the workflow by choosing where the usable, reviewed data should go.',
            question: 'Where should the reviewed results be delivered?',
            exampleTitle: 'Ready for the next business step.', exampleDescription: 'Keep the reviewed invoice results in DocAcquire or send the data to the downstream destination configured for the workflow.',
            from: 'Reviewed invoice results', to: 'DocAcquire or your next system'
        }
    };
    const tabs = Array.from(document.querySelectorAll('.da-stage-tab'));
    const panel = document.getElementById('stage-panel');
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
        const text = {
            'stage-eyebrow': `${stage.number} / ${stage.label.toUpperCase()}`,
            'stage-title': stage.title, 'stage-description': stage.description,
            'stage-question': stage.question, 'stage-example-title': stage.exampleTitle,
            'stage-example-description': stage.exampleDescription,
            'stage-example-from': stage.from, 'stage-example-to': stage.to
        };
        Object.entries(text).forEach(([id, value]) => { document.getElementById(id).textContent = value; });
        document.querySelector('#stage-icon use').setAttribute('href', `#i-${key}`);
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
    document.querySelectorAll('[data-stage-link]').forEach(link => {
        link.addEventListener('click', () => selectStage(link.dataset.stageLink, true));
    });
})();
