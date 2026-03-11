// get session
export function getSession() {
    return JSON.parse(localStorage.getItem('safarii-session') || 'null');
}

// set session
function setSession(user) {
    localStorage.setItem('safarii-session', JSON.stringify({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
    }));
}

// logout
export function logout() {
    localStorage.removeItem('safarii-session');
    window.location.hash = '';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
}

// register
export function submitRegister() {
    const firstname = document.getElementById('reg-firstname');
    const lastname = document.getElementById('reg-lastname');
    const email = document.getElementById('reg-email');
    const password = document.getElementById('reg-password');
    const confirm = document.getElementById('reg-confirm');
    const errBox = document.getElementById('reg-error');
    const errText = document.getElementById('reg-error-text');

    // clear errors
    errBox.classList.add('hidden');
    document.getElementById('err-reg-firstname').classList.add('hidden');
    document.getElementById('err-reg-lastname').classList.add('hidden');
    document.getElementById('err-reg-email').classList.add('hidden');
    document.getElementById('err-reg-password').classList.add('hidden');
    document.getElementById('err-reg-confirm').classList.add('hidden');

    let valid = true;

    if (!firstname.value.trim()) {
        document.getElementById('err-reg-firstname').textContent = 'First name is required';
        document.getElementById('err-reg-firstname').classList.remove('hidden');
        valid = false;
    }
    if (!lastname.value.trim()) {
        document.getElementById('err-reg-lastname').textContent = 'Last name is required';
        document.getElementById('err-reg-lastname').classList.remove('hidden');
        valid = false;
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById('err-reg-email').textContent = 'Please enter a valid email address';
        document.getElementById('err-reg-email').classList.remove('hidden');
        valid = false;
    }
    if (password.value.length < 8) {
        document.getElementById('err-reg-password').textContent = 'Password must be at least 8 characters';
        document.getElementById('err-reg-password').classList.remove('hidden');
        valid = false;
    }
    if (confirm.value !== password.value) {
        document.getElementById('err-reg-confirm').textContent = 'Passwords do not match';
        document.getElementById('err-reg-confirm').classList.remove('hidden');
        valid = false;
    }

    if (!valid) return;

    // check for existing account
    const users = JSON.parse(localStorage.getItem('safarii-users') || '[]');
    const exists = users.find(u => u.email === email.value.trim());

    if (exists) {
        errText.textContent = 'An account with this email already exists.';
        errBox.classList.remove('hidden');
        return;
    }

    // save new user
    const newUser = {
        firstname: firstname.value.trim(),
        lastname: lastname.value.trim(),
        email: email.value.trim(),
        password: password.value,
    };
    users.push(newUser);
    localStorage.setItem('safarii-users', JSON.stringify(users));

    // auto sign in and redirect home
    setSession(newUser);
    window.location.hash = '';
}

// login
export function submitLogin() {
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    const errBox = document.getElementById('login-error');
    const errText = document.getElementById('login-error-text');

    // clear errors
    errBox.classList.add('hidden');
    document.getElementById('err-login-email').classList.add('hidden');
    document.getElementById('err-login-password').classList.add('hidden');

    let valid = true;

    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById('err-login-email').textContent = 'Please enter a valid email address';
        document.getElementById('err-login-email').classList.remove('hidden');
        valid = false;
    }
    if (!password.value.trim()) {
        document.getElementById('err-login-password').textContent = 'Password is required';
        document.getElementById('err-login-password').classList.remove('hidden');
        valid = false;
    }

    if (!valid) return;

    // check against stored users
    const users = JSON.parse(localStorage.getItem('safarii-users') || '[]');
    const match = users.find(u => u.email === email.value.trim() && u.password === password.value);

    if (!match) {
        errText.textContent = 'Incorrect email or password. Please try again.';
        errBox.classList.remove('hidden');
        return;
    }

    setSession(match);
    const message = localStorage.getItem('safarii-redirect');
    if (message) {
        localStorage.removeItem('safarii-redirect');
    }
    window.location.hash = '';
}

// update navbar based on session
export function updateNavAuth() {
    const navAuth = document.getElementById('nav-auth');
    if (!navAuth) return;

    const session = getSession();

    if (session) {
        navAuth.innerHTML = `
            <div class="flex items-center gap-4">
                <span class="text-lg tracking-wide text-stone-900 font-bold">
                    Hi, ${session.firstname}
                </span>
                <button onclick="logout()" class="text-xs tracking-widest uppercase px-4 py-2 border border-white hover:bg-red-500 hover:text-white text-white transition-colors">
                    Sign Out
                </button>
            </div>
        `;
    } else {
        navAuth.innerHTML = `
            <a href="#login" class="text-xs tracking-widest uppercase px-4 py-2 bg-stone-800 hover:bg-orange-700 text-white transition-colors">
                Sign In
            </a>
        `;
    }
}

// show redirect message
export function checkLoginNotice() {
    const notice = document.getElementById('login-notice');
    const noticeText = document.getElementById('login-notice-text');
    if (!notice || !noticeText) return;

    const message = localStorage.getItem('safarii-redirect');
    if (message) {
        noticeText.textContent = message;
        notice.classList.remove('hidden');
        localStorage.removeItem('safarii-redirect');
    }
}
