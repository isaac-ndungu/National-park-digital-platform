

// Contact form
 export function submitContactForm() {
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const phone = document.getElementById('contact-phone');
    const subject = document.getElementById('contact-subject');
    const message = document.getElementById('contact-message');
    const err = document.getElementById('contact-error');
    const succ = document.getElementById('contact-success');

    err.classList.add('hidden');
    succ.classList.add('hidden');

    // Validation
    if (!name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
        err.textContent = 'Please fill in all required fields.';
        err.classList.remove('hidden');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        err.textContent = 'Please enter a valid email address.';
        err.classList.remove('hidden');
        return;
    }

    succ.classList.remove('hidden');
    name.value = '';
    email.value = '';
    phone.value = '';
    subject.value = '';
    message.value = '';
 }
