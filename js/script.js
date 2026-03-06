// DOM Elements
const content = document.getElementById('content');

// fetch

let parksData = [];

async function fetchParksData() {
    try {
        const response = await fetch('data/parks.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        parksData = data.parks;
    } catch (error) {
        console.error('Error fetching parks data:', error);
    }
}

// create park card

function createParkCards() {
    // clear existing cards
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    parksData.forEach(park => {
        const card = document.createElement('div');
        card.classList.add('park-card');

        card.innerHTML = `
        <div class="park-image">
            <img src="${park.thumbnailImage}" alt="${park.name}">
        </div>

        <div class="park-content p-4">
            <h3 class="park-title text-lg font-bold mb-4">${park.name}</h3>
            <p class="park-description text-sm mb-4">${park.description}</p>
        
        <button class="explore-btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" data-id="${park.id}">Explore Park</button>
        </div>
    `;
        cardContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchParksData();
    createParkCards();
});



//  Dynamic routing
const pageTitle = "safarii"

const routes = {
    404: {
        template: "/templates/404.html",
        title: "404 | " + pageTitle,
        description: "Page not found"
    },
    "/": {
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
    safari: {
        template: "/template/safari.com",
        title: "Safaris | " + pageTitle,
        description: "Featured safari packages"
    },
    contact: {
        template: "/templates/contact.html",
        title: "Contact Us |" + pageTitle,
        description: "Contact Us"
    },
    blog: {
        template: "/templates.blog.html",
        title: "Blog | " + pageTitle,
        description: " Safarii blogs"
    },
    nairobi: {
        template: "../template/nairobi-park.html",
        title: "Nairobi National Park | " + pageTitle,
        description: "Nairobi national park pahe"
    },
};

// location handling
const locationHandler = async () => {
    var location = window.location.hash.replace('#', '');

    if (location.length == 0){
        location = '/';
    }

    // get the route object from the routes object
    const route = routes[location] || routes[404];
    
    // get the html from the template
    html = await fetch(route.template).then((response) => response.text());

    content.innerHTML = html;
    createParkCards();

    document.title = route.title;
    // set the desctiprion of the document to the descriotion of the route
    document.querySelector('meta[name="description"]').setAttribute("content", route.description);
}

window.addEventListener("hashchange", locationHandler);

locationHandler();
