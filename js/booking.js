import { parksData, safarisData, state } from "./data.js";

// Safari booking
export function safariBooking(id) {
    state.currentSafari = safarisData.find(safari => safari.id === id);
    if (!currentSafari) return;

    // reset to step 1
    document.getElementById('safari-step-1').classList.remove('hidden');
    document.getElementById('safari-step-2').classList.add('hidden');

    // reset fields
    document.getElementById('safari-firstname').value = '';
    document.getElementById('safari-lastname').value  = '';
    document.getElementById('safari-email').value     = '';
    document.getElementById('safari-phone').value     = '';
    document.getElementById('safari-checkin').value   = '';
    document.getElementById('safari-requests').value  = '';
    state.safariGuestCount = 2;
    document.getElementById('safari-guest-count').textContent = state.safariGuestCount;

    // clear errors
    ['err-safari-firstname', 'err-safari-lastname', 'err-safari-email', 'err-safari-date'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });

    document.getElementById('modal-safari-name').textContent = currentSafari.name;

    const modal = document.getElementById('safari-booking-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

export function closeSafariModal() {
    const modal = document.getElementById('safari-booking-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

export function changeSafariGuests(delta) {
    state.safariGuestCount = Math.max(1, Math.min(20, state.safariGuestCount + delta));
    document.getElementById('safari-guest-count').textContent = state.safariGuestCount;
}

export function submitSafariBooking() {
    const firstname = document.getElementById('safari-firstname');
    const lastname  = document.getElementById('safari-lastname');
    const email     = document.getElementById('safari-email');
    const checkin   = document.getElementById('safari-checkin');

    let valid = true;

    // clear errors
    ['err-safari-firstname', 'err-safari-lastname', 'err-safari-email', 'err-safari-date'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });

    if (!firstname.value.trim()) {
        document.getElementById('err-safari-firstname').textContent = 'Required';
        document.getElementById('err-safari-firstname').classList.remove('hidden');
        valid = false;
    }
    if (!lastname.value.trim()) {
        document.getElementById('err-safari-lastname').textContent = 'Required';
        document.getElementById('err-safari-lastname').classList.remove('hidden');
        valid = false;
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById('err-safari-email').textContent = 'Valid email required';
        document.getElementById('err-safari-email').classList.remove('hidden');
        valid = false;
    }
    if (!checkin.value) {
        document.getElementById('err-safari-date').textContent = 'Please select a departure date';
        document.getElementById('err-safari-date').classList.remove('hidden');
        valid = false;
    }

    if (!valid) return;

    //show success
    const ref = 'SFR-' + Date.now().toString(36).toUpperCase().slice(-6);
    document.getElementById('safari-booking-ref').textContent = ref;
    document.getElementById('safari-step-1').classList.add('hidden');
    document.getElementById('safari-step-2').classList.remove('hidden');
}


export function openLodgeBooking(roomId) {
    // find the room across all parks/lodges
    state.currentRoom = null;
    parksData.forEach(park => {
        if (!park.lodges) return;
        park.lodges.forEach(lodge => {
            const found = lodge.rooms.find(r => r.id === roomId);
            if (found) state.currentRoom = found;
        });
    });
    if (!state.currentRoom) return;

    // reset to step 1
    document.getElementById('lodge-step-1').classList.remove('hidden');
    document.getElementById('lodge-step-2').classList.add('hidden');

    // reset fields
    document.getElementById('lodge-firstname').value = '';
    document.getElementById('lodge-lastname').value  = '';
    document.getElementById('lodge-email').value     = '';
    document.getElementById('lodge-phone').value     = '';
    document.getElementById('lodge-checkin').value   = '';
    document.getElementById('lodge-checkout').value  = '';
    document.getElementById('lodge-requests').value  = '';
    state.lodgeGuestCount = 2;
    state.lodgeRoomCount  = 1;
    document.getElementById('lodge-guest-count').textContent = state.lodgeGuestCount;
    document.getElementById('lodge-room-count').textContent  = state.lodgeRoomCount;

    // clear errors
    ['err-lodge-firstname', 'err-lodge-lastname', 'err-lodge-email', 'err-lodge-date'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });

    document.getElementById('modal-room-name').textContent = state.currentRoom.name;

    const modal = document.getElementById('lodge-booking-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

export function closeLodgeModal() {
    const modal = document.getElementById('lodge-booking-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

export function changeLodgeGuests(delta) {
    const max = state.currentRoom ? state.currentRoom.capacity : 10;
    lodgeGuestCount = Math.max(1, Math.min(max, lodgeGuestCount + delta));
    document.getElementById('lodge-guest-count').textContent = lodgeGuestCount;
}

export function changeLodgeRooms(delta) {
    const max = state.currentRoom ? state.currentRoom.totalRooms : 10;
    lodgeRoomCount = Math.max(1, Math.min(max, lodgeRoomCount + delta));
    document.getElementById('lodge-room-count').textContent = lodgeRoomCount;
}

export function submitLodgeBooking() {
    const firstname = document.getElementById('lodge-firstname');
    const lastname  = document.getElementById('lodge-lastname');
    const email     = document.getElementById('lodge-email');
    const checkin   = document.getElementById('lodge-checkin');

    let valid = true;

    // clear errors
    ['err-lodge-firstname', 'err-lodge-lastname', 'err-lodge-email', 'err-lodge-date'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });

    if (!firstname.value.trim()) {
        document.getElementById('err-lodge-firstname').textContent = 'Required';
        document.getElementById('err-lodge-firstname').classList.remove('hidden');
        valid = false;
    }
    if (!lastname.value.trim()) {
        document.getElementById('err-lodge-lastname').textContent = 'Required';
        document.getElementById('err-lodge-lastname').classList.remove('hidden');
        valid = false;
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById('err-lodge-email').textContent = 'Valid email required';
        document.getElementById('err-lodge-email').classList.remove('hidden');
        valid = false;
    }
    if (!checkin.value) {
        document.getElementById('err-lodge-date').textContent = 'Please select a check-in date';
        document.getElementById('err-lodge-date').classList.remove('hidden');
        valid = false;
    }

    if (!valid) return;

    // generate ref and show success
    const ref = 'SBR-' + Date.now().toString(36).toUpperCase().slice(-6);
    document.getElementById('lodge-booking-ref').textContent = ref;
    document.getElementById('lodge-step-1').classList.add('hidden');
    document.getElementById('lodge-step-2').classList.remove('hidden');
}