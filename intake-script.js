// Intake Form Handler
const intakeForm = document.getElementById('intakeForm');

if (intakeForm) {
    intakeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get all form data
        const formData = new FormData(intakeForm);
        const data = {};
        
        // Get regular form fields
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (checkboxes)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        // Get checkboxes separately
        const caseTypeCheckboxes = intakeForm.querySelectorAll('input[name="caseType"]:checked');
        const caseTypes = Array.from(caseTypeCheckboxes).map(cb => cb.value);
        if (caseTypes.length > 0) {
            data.caseType = caseTypes;
        }
        
        const terminationCheckboxes = intakeForm.querySelectorAll('input[name="terminationOfMarriage"]:checked');
        const terminations = Array.from(terminationCheckboxes).map(cb => cb.value);
        if (terminations.length > 0) {
            data.terminationOfMarriage = terminations;
        }
        
        const postDecreeCheckboxes = intakeForm.querySelectorAll('input[name="postDecree"]:checked');
        const postDecrees = Array.from(postDecreeCheckboxes).map(cb => cb.value);
        if (postDecrees.length > 0) {
            data.postDecree = postDecrees;
        }
        
        // Get Civil Protection Order checkbox
        const civilProtectionOrder = document.getElementById('civilProtectionOrder');
        if (civilProtectionOrder && civilProtectionOrder.checked) {
            data.civilProtectionOrder = civilProtectionOrder.value;
        }
        
        // Set today's date if not provided
        if (!data.date) {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('date').value = today;
            data.date = today;
        }
        
        // Format the data for display/email
        console.log('Form Data:', data);
        
        // Here you would typically send this data to a server/email
        // For now, we'll show a success message
        
        // Create a formatted summary
        let summary = 'PROSPECTIVE CLIENT INTAKE FORM SUBMISSION\n\n';
        summary += `Date: ${data.date || 'Not provided'}\n`;
        summary += `Client Name: ${data.clientName || 'Not provided'}\n`;
        summary += `Telephone: ${data.clientTelephone || 'Not provided'}\n`;
        summary += `Email: ${data.clientEmail || 'Not provided'}\n`;
        summary += `Referral Source: ${data.referralSource || 'Not provided'}\n\n`;
        
        if (caseTypes.length > 0) {
            summary += `Case Type(s): ${caseTypes.join(', ')}\n`;
        }
        
        // Show success message
        alert('Thank you for submitting your intake form! We will review your information and contact you shortly.\n\nIn a production environment, this data would be sent to our office automatically.');
        
        // In production, you would send this data via:
        // 1. Email API (SendGrid, Mailgun, etc.)
        // 2. Form submission service (Formspree, Netlify Forms, etc.)
        // 3. Backend API endpoint
        
        // Optionally, you could create a PDF or download link here
        // For now, the form is submitted
        
        // Reset form after a delay (optional)
        // setTimeout(() => {
        //     intakeForm.reset();
        // }, 2000);
    });
}

// Auto-fill today's date on page load
window.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    if (dateInput && !dateInput.value) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
});

