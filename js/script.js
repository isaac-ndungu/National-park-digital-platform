import { fetchParksData, fetchSafarisData } from './data.js';
import { createParkCards, createWildlifeHighlights, addParks, loadParkDetails } from './parks.js';
import { loadLodgeDetails } from './lodge.js';
import { loadSafaris, filterSafaris, loadSafariDetails } from './safaris.js';
import { submitContactForm } from './contact.js';
import {
    safariBooking, closeSafariModal, changeSafariGuests, submitSafariBooking,
    openLodgeBooking, closeLodgeModal, changeLodgeGuests, changeLodgeRooms, submitLodgeBooking
} from './booking.js';
import { submitLogin, submitRegister, logout, getSession, updateNavAuth, checkLoginNotice } from './auth.js';

window.filterSafaris = filterSafaris;
window.submitContactForm = submitContactForm;
window.safariBooking = safariBooking;
window.closeSafariModal = closeSafariModal;
window.changeSafariGuests = changeSafariGuests;
window.submitSafariBooking = submitSafariBooking;
window.openLodgeBooking = openLodgeBooking;
window.closeLodgeModal = closeLodgeModal;
window.changeLodgeGuests = changeLodgeGuests;
window.changeLodgeRooms = changeLodgeRooms;
window.submitLodgeBooking = submitLodgeBooking;
window.submitLogin = submitLogin;
window.submitRegister = submitRegister;
window.logout = logout;
window.getSession = getSession;


// DOM Elements
const content = document.getElementById('content');
//  Dynamic routing
const pageTitle = "safarii"

const routes = {
    404: {
        template: "/templates/404.html",
        title: "404 | " + pageTitle,
        description: "Page not found"
    },
    "": {
        template: "/templates/index.html",
        title: "Home " + pageTitle,
        description: "Safarii home page"
    },
    about: {
        template: "/templates/about.html",
        title: "About Us | " + pageTitle,
        description: "About Safarii "
    },
    parks: {
        template: "/templates/parks.html",
        title: "Parks | " + pageTitle,
        description: "Featured parks"
    },
    safaris: {
        template: "/templates/safaris.html",
        title: "Safaris | " + pageTitle,
        description: "Featured safari packages"
    },
    safari: {
        template: "/templates/safari.html",
        title: "Safaris | " + pageTitle,
        description: "Featured safari packages"
    },
    contact: {
        template: "/templates/contact.html",
        title: "Contact Us |" + pageTitle,
        description: "Contact Us"
    },
    park: {
        template: "/templates/park.html",
        title: "Park | " + pageTitle,
        description: "National Park Details"
    },
    lodge: {
        template: "/templates/lodge.html",
        title: "Lodge | " + pageTitle,
        description: "Lodge Details"
    },
    login: {
        template: "/templates/login.html",
        title: "Login | " + pageTitle,
        description: "User login page"
    },
    register: {
        template: "/templates/register.html",
        title: "Register | " + pageTitle,
        description: "User registration page"
    },
    cancel: {
        template: "/templates/cancel.html",
        title: "Cancellation Policy | " + pageTitle,
        description: "Cancellation policy page"
    },
    terms: {
        template: "/templates/terms.html",
        title: "Terms of Service | " + pageTitle,
        description: "Terms of Service page"
    },
};

// location handling
const locationHandler = async () => {
    var location = window.location.hash.replace('#', '');

    if (location.length == 0) {
        location = '/';
    }
    const [route, id] = location.split('/');

    // handle login
    const session = getSession();
    if (session && (route === 'login' || route === 'register')) {
        window.location.hash = '';
        return;
    }

    // get the route object from the routes object
    const routeObj = routes[route] || routes[404];

    // get the html from the template
    const html = await fetch(routeObj.template).then((response) => response.text());

    content.innerHTML = html;
    window.scrollTo(0, 0);

    await fetchParksData();
    createParkCards();
    createWildlifeHighlights();
    addParks();
    if (route === 'park' && id) {
        loadParkDetails(id);
    }
    if (route === 'lodge' && id) {
        loadLodgeDetails(id);
    }
    await fetchSafarisData();
    if (route === 'safaris') {
        loadSafaris();
    }
    if (route === 'safari' && id) {
        loadSafariDetails(id);
    }
    updateNavAuth();
    if (route === 'login') {
        checkLoginNotice();
    }

    document.title = routeObj.title;
    // set the desctiprion of the document to the descriotion of the route
    document.querySelector('meta[name="description"]').setAttribute("content", routeObj.description);
}

window.addEventListener("hashchange", locationHandler);

locationHandler();


