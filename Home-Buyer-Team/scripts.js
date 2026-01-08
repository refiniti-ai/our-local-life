document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    navToggle?.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navLinks?.classList.toggle('open');
    });

    document.querySelectorAll('.page-link').forEach(link => {
        if (link.dataset.page === document.body.dataset.page) {
            link.classList.add('active');
        }
    });

    const slider = document.getElementById('value-slider');
    const display = document.getElementById('value-display');
    const commission = document.getElementById('commission');
    const closing = document.getElementById('closing');
    const holding = document.getElementById('holding');
    const net = document.getElementById('net-display');

    const updateNet = () => {
        const val = Number(slider?.value || 350000);
        const comm = Math.round(val * 0.06);
        const closeCost = Math.round(val * 0.025);
        const savings = Math.round(val * 0.01);
        const netValue = val - comm - closeCost - savings;
        if (display) display.textContent = `$${val.toLocaleString()}`;
        if (commission) commission.textContent = `-$${comm.toLocaleString()}`;
        if (closing) closing.textContent = `-$${closeCost.toLocaleString()}`;
        if (holding) holding.textContent = `-$${savings.toLocaleString()}`;
        if (net) net.textContent = `$${netValue.toLocaleString()}`;
    };

    slider?.addEventListener('input', updateNet);
    updateNet();

    document.getElementById('contact-form')?.addEventListener('submit', event => {
        event.preventDefault();
        alert('Request received. A specialist will contact you within minutes.');
        event.target.reset();
    });

    const modal = document.getElementById('offer-modal');
    const modalSteps = Array.from(document.querySelectorAll('.offer-step'));
    const progressSteps = Array.from(document.querySelectorAll('.progress-step'));
    let activeStep = 0;

    const showStep = (index) => {
        activeStep = index;
        modalSteps.forEach((step, idx) => {
            step.classList.toggle('active', idx === index);
        });
        progressSteps.forEach((dot, idx) => {
            dot.classList.toggle('active', idx <= index);
        });
    };

    const nextButtons = document.querySelectorAll('[data-next]');
    const prevButtons = document.querySelectorAll('[data-prev]');

    showStep(0);

    nextButtons.forEach(btn => btn.addEventListener('click', () => {
        if (activeStep < modalSteps.length - 1) {
            showStep(activeStep + 1);
        }
    }));

    prevButtons.forEach(btn => btn.addEventListener('click', () => {
        if (activeStep > 0) {
            showStep(activeStep - 1);
        }
    }));

    document.querySelectorAll('.open-offer').forEach(btn => {
        btn.addEventListener('click', () => {
            modal?.classList.add('active');
            showStep(0);
        });
    });

    document.querySelector('.modal-close')?.addEventListener('click', () => modal?.classList.remove('active'));
    document.getElementById('close-offer-modal')?.addEventListener('click', () => modal?.classList.remove('active'));
    modal?.addEventListener('click', (event) => {
        if (event.target === modal) modal.classList.remove('active');
    });

    document.getElementById('offer-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you! A specialist will contact you shortly.');
        modal?.classList.remove('active');
        event.target.reset();
    });

    const planMatrix = {
        general: [
            'Lock an as-is price that mirrors nearby comps and rehab scope.',
            'Align the closing timeline with the cash you need today.',
            'Confirm outstanding liens and title issues before escrow opens.',
            'Deliver a clean release package that protects every dollar of equity.'
        ],
        foreclosure: [
            'Verify the auction clock, lender contact, and payoff requirements.',
            'Negotiate a pause or refinance that keeps the doors closed.',
            'Structure a cash offer that covers the lender payoff and closes fast.',
            'Coordinate title, insurance, and funding to eliminate surprises.'
        ],
        probate: [
            'Map heirship, title, and beneficiary documents that affect the deal.',
            'Assign the estate to a trusted acquisition partner to move the home.',
            'Deliver a transparent cash offer with a clear closing roadmap.',
            'Communicate to heirs so the estate clears without extra court time.'
        ],
        divorce: [
            'Neutralize the equity split with a calm, cash-based solution.',
            'Remove the property from the listing circuit to limit exposure.',
            'Sequence disbursements so both parties receive funds simultaneously.',
            'Document the deal so attorneys and judges see a clean closing.'
        ],
        landlord: [
            'Stabilize tenant transitions or lock a vacancy-ready plan.',
            'Commit to an as-is offer so repairs and management headaches end.',
            'Deploy concierge closing support with 24/7 updates.',
            'Transfer ownership cleanly so you can redeploy capital on your timeline.'
        ]
    };

    const opportunityMatrix = {
        general: 'Maximize cash while avoiding repairs, fees, and listing risk.',
        foreclosure: 'Pause the auction, honor deadlines, and protect the equity you earned.',
        probate: 'Move the estate fast, eliminate legal risk, and keep funds in the family.',
        divorce: 'Deliver a neutral, cash-first closing so both parties can move forward.',
        landlord: 'Exit the rental without landlord headaches or deferred maintenance.'
    };

    const planInsights = {
        general: 'We prioritize cash flow, repair-free exits, and clarity on every fee so your funds land in hand quickly.',
        foreclosure: 'We move before auctions escalate, honor banking deadlines, and reframe the lender conversation with transparent cash.',
        probate: 'We coordinate heirs, title, and vendors so the estate clears cleanly and cash stays within the family.',
        divorce: 'We neutralize equity splits with fast, transparent cash so the process stays calm and confidential.',
        landlord: 'We ensure tenant transitions, leasing headaches, and repairs are handled while you gain instant liquidity.'
    };

    const pageLabels = {
        general: 'general distress',
        foreclosure: 'foreclosure defense',
        probate: 'probate transition',
        divorce: 'divorce settlement',
        landlord: 'landlord exit'
    };

    const helpHighlights = [
        'We buy homes as-is and take ownership of repairs, liens, and compliance so you can walk away.',
        'Our acquisition specialists coordinate title, insurance, and closing partners to meet any deadline.',
        'You retain control while we deliver transparent funding, concierge communication, and a calm experience.'
    ];

    const buildSnapshotData = (details, pageKey) => {
        const trimmed = details.trim();
        const focus = trimmed.split(/[\.\n]/).find(entry => entry.trim().length)?.trim() || 'Immediate liquidity needs';
        const opportunity = opportunityMatrix[pageKey] || opportunityMatrix.general;
        const insight = planInsights[pageKey] || planInsights.general;
        const planSteps = planMatrix[pageKey] || planMatrix.general;
        
        const htmlSummary = `
            <h3><span class="report-icon">🔍</span> Your Situation Analysis</h3>
            <p>${focus}</p>
            
            <h3><span class="report-icon">💡</span> The Strategic Opportunity</h3>
            <p>${opportunity}</p>
            
            <h3><span class="report-icon">🧠</span> AI Tactical Insight</h3>
            <p>${insight}</p>
            
            <h3><span class="report-icon">📋</span> Recommended Execution Plan</h3>
            <ul class="report-list">
                ${planSteps.map(step => `<li>${step}</li>`).join('')}
            </ul>
        `;

        const plainTextSummary = [
            `Situation: ${focus}`,
            `Opportunity: ${opportunity}`,
            `Insight: ${insight}`,
            'Plan Steps:',
            ...planSteps.map((item, index) => `${index + 1}. ${item}`)
        ].join('\n');

        return {
            summaryHtml: htmlSummary,
            summaryText: plainTextSummary,
            focus,
            opportunity,
            insight,
            planSteps
        };
    };

    const escapePdfString = (value) => {
        return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    };

    const createPdfBlob = (body) => {
        const encoder = new TextEncoder();
        const pageWidth = 612;
        const pageHeight = 792;
        const margin = 72;
        const fontSize = 12;
        const lineHeight = 14;
        
        // Simple word wrap
        const wrapText = (text, maxChars) => {
            const lines = [];
            const paragraphs = text.split('\n');
            paragraphs.forEach(p => {
                if (p.trim().length === 0) {
                    lines.push('');
                    return;
                }
                let currentLine = '';
                const words = p.split(' ');
                words.forEach(word => {
                    if ((currentLine + word).length > maxChars) {
                        lines.push(currentLine.trim());
                        currentLine = word + ' ';
                    } else {
                        currentLine += word + ' ';
                    }
                });
                lines.push(currentLine.trim());
            });
            return lines;
        };

        const wrappedLines = wrapText(body, 85); // Adjusted for letter width

        let offset = 0;
        const parts = [];
        const objStarts = [0];

        const append = (chunk) => {
            parts.push(chunk);
            offset += encoder.encode(chunk).length;
        };

        const appendObject = (chunk) => {
            objStarts.push(offset);
            append(chunk);
        };

        append('%PDF-1.3\n%âãÏÓ\n');
        appendObject('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
        appendObject('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
        appendObject('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 4 0 R >> >> >>\nendobj\n');
        appendObject('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');
        
        let contentStream = `BT\n/F1 ${fontSize} Tf\n${lineHeight} TL\n${margin} ${pageHeight - margin} Td\n`;
        wrappedLines.forEach(line => {
            contentStream += `(${escapePdfString(line)}) Tj\nT*\n`;
        });
        contentStream += 'ET\n';

        const streamLength = encoder.encode(contentStream).length;
        appendObject(`5 0 obj\n<< /Length ${streamLength} >>\nstream\n${contentStream}endstream\nendobj\n`);

        const xrefStart = offset;
        append('xref\n0 6\n');
        append('0000000000 65535 f \n');
        for (let i = 1; i <= 5; i++) {
            append(`${objStarts[i].toString().padStart(10, '0')} 00000 n \n`);
        }
        append('trailer\n<< /Size 6 /Root 1 0 R >>\n');
        append(`startxref\n${xrefStart}\n%%EOF\n`);

        const pdfString = parts.join('');
        return new Blob([pdfString], { type: 'application/pdf' });
    };

    const safeParseContext = (value) => {
        if (!value) return null;
        try {
            return JSON.parse(value);
        } catch {
            return null;
        }
    };

    // Strategy Modal logic
    const strategyModal = document.getElementById('strategy-modal');
    const openStrategyBtn = document.getElementById('open-strategy-modal');
    const closeStrategyBtn = document.getElementById('close-strategy-modal');
    const strategyInput = document.querySelector('[data-strategy-input]');
    const strategyReportText = document.querySelector('.strategy-report-text');
    const strategyForm = document.querySelector('.strategy-report-form');
    const strategySubmitBtn = document.querySelector('.strategy-report-submit');
    const strategyStatus = document.querySelector('.strategy-report-status');

    const updateStrategyReport = () => {
        const details = strategyInput?.value || '';
        const pageKey = document.body.dataset.page || 'general';
        const snapshotData = buildSnapshotData(details, pageKey);
        if (strategyReportText) {
            strategyReportText.innerHTML = snapshotData.summaryHtml;
        }
        
        // Store context for PDF generation
        const generator = document.querySelector('[data-strategy-generator]');
        if (generator) {
            generator.dataset.reportContext = JSON.stringify(snapshotData);
            generator.dataset.reportDetails = details.trim() || 'No additional details provided.';
        }
    };

    openStrategyBtn?.addEventListener('click', () => {
        updateStrategyReport();
        strategyModal?.classList.add('active');
        if (strategyStatus) strategyStatus.textContent = '';
    });

    closeStrategyBtn?.addEventListener('click', () => {
        strategyModal?.classList.remove('active');
    });

    strategyModal?.addEventListener('click', (e) => {
        if (e.target === strategyModal) {
            strategyModal.classList.remove('active');
        }
    });

    const checkStrategyFormValidity = () => {
        if (!strategyForm || !strategySubmitBtn) return;
        const data = new FormData(strategyForm);
        const valid = ['full-name', 'email', 'phone'].every(field => {
            const val = data.get(field);
            return val && val.toString().trim().length > 0;
        });
        strategySubmitBtn.disabled = !valid;
    };

    strategyForm?.addEventListener('input', checkStrategyFormValidity);

    strategyForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const generator = document.querySelector('[data-strategy-generator]');
        const pageKey = generator?.dataset.generatorId || 'general';
        const formData = new FormData(strategyForm);
        
        const name = formData.get('full-name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        
        const snapshotContext = safeParseContext(generator?.dataset.reportContext) || buildSnapshotData('', pageKey);
        const detailsCopy = generator?.dataset.reportDetails || 'No further details provided.';

        const pdfBody = [
            '==================================================',
            '   THE HOME BUYER TEAM - AI STRATEGY REPORT',
            '==================================================',
            '',
            'AI SITUATION ANALYSIS',
            '--------------------------------------------------',
            snapshotContext.focus,
            '',
            'STRATEGIC OPPORTUNITY',
            '--------------------------------------------------',
            snapshotContext.opportunity,
            '',
            'AI TACTICAL INSIGHT',
            '--------------------------------------------------',
            snapshotContext.insight,
            '',
            'RECOMMENDED EXECUTION PLAN',
            '--------------------------------------------------',
            ...(snapshotContext.planSteps || []).map((item, index) => `${index + 1}. ${item}`),
            '',
            'HOW THE HOME BUYER TEAM SUPPORTS YOU',
            '--------------------------------------------------',
            ...helpHighlights.map(h => `* ${h}`),
            '',
            'YOUR PROVIDED DETAILS',
            '--------------------------------------------------',
            detailsCopy,
            '',
            'CONTACT INFORMATION',
            '--------------------------------------------------',
            `Name:  ${name}`,
            `Phone: ${phone}`,
            `Email: ${email}`,
            '',
            '--------------------------------------------------',
            'Generated on: ' + new Date().toLocaleString(),
            'The Home Buyer Team | Fast Cash for Distressed Sellers'
        ].join('\n');

        const pdfBlob = createPdfBlob(pdfBody);
        const tempLink = document.createElement('a');
        tempLink.href = URL.createObjectURL(pdfBlob);
        tempLink.download = `HomeBuyer-Detailed-Strategy-${Date.now()}.pdf`;
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        tempLink.click();
        
        setTimeout(() => {
            URL.revokeObjectURL(tempLink.href);
            document.body.removeChild(tempLink);
        }, 1000);

        if (strategyStatus) {
            strategyStatus.textContent = 'Download initiated! We will contact you shortly.';
            strategyStatus.style.color = 'green';
        }
    });
});

