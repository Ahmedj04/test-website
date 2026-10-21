(() => {
    'use strict';
    // One illustrative invoice demonstrates the six stages. This is not a live workflow.
    const stages = {
        ingest: {
            number: '01', label: 'Ingest', title: 'Give every document a starting point.',
            description: 'Upload PDFs and images, import Outlook messages or attachments, or submit documents through the API.',
            exampleTitle: 'An invoice arrives.',
            exampleDescription: 'A supplier uploads invoice-201.pdf to start this example workflow.',
            from: 'invoice-201.pdf', to: 'Document received'
        },
        extract: {
            number: '02', label: 'Extract', title: 'Capture the information that matters.',
            description: 'Capture single values and repeated sections using the fields and extraction guidance configured for the workflow.',
            exampleTitle: 'From invoice to structured data.',
            exampleDescription: 'Invoice number 201, the date, total and line items become structured fields.',
            from: 'Invoice 201', to: 'Fields and line items'
        },
        transform: {
            number: '03', label: 'Transform', title: 'Get your data into the right format.',
            description: 'Map values into a common output structure. Standardise dates and numbers, apply lookups and calculate derived values.',
            exampleTitle: 'Make the values consistent.',
            exampleDescription: 'Convert the invoice date into a consistent format for the receiving process.',
            from: 'Jan 28, 2025', to: '2025-01-28'
        },
        validate: {
            number: '04', label: 'Validate', title: 'Put your business rules to work.',
            description: 'Check required values, ranges, allowed values and dates, with warning or blocking rules.',
            exampleTitle: 'Check what the process needs.',
            exampleDescription: 'A required-field check confirms that the invoice number has been captured.',
            from: 'Required invoice number', to: '201 · check passed'
        },
        review: {
            number: '05', label: 'Review', title: 'Choose where people are needed.',
            description: 'Review all documents, focus on exceptions, or omit routine review. Blocking validation failures still require attention.',
            exampleTitle: 'Let routine invoices continue.',
            exampleDescription: 'With required values present and checks passed, this example invoice can continue without routine review under an exceptions-only policy.',
            from: 'Checks passed', to: 'No routine review'
        },
        deliver: {
            number: '06', label: 'Deliver', title: 'Get the results where they belong.',
            description: 'Deliver configured records to applications or storage, with delivery status and supported retries.',
            exampleTitle: 'Deliver the invoice record.',
            exampleDescription: 'Send the eligible invoice record to the Zoho Books connection configured for this example workflow.',
            from: 'Invoice 201 · validated record', to: 'Zoho Books'
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
            'stage-example-title': stage.exampleTitle,
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
})();
