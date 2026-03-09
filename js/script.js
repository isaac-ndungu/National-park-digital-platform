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
    if (!cardContainer) return;
    cardContainer.innerHTML = '';

    parksData.slice(0, 3).forEach(park => {
        const card = document.createElement('div');
        card.classList.add('park-card');

        card.innerHTML = `
        <div class="park-image">
            <img src="${park.thumbnailImage}" alt="${park.name}">
        </div>

        <div class="park-content p-4 bg-white/90">
            <h3 class="park-title text-lg font-bold mb-4">${park.name}</h3>
            <p class="park-description text-sm mb-4">${park.description}</p>

            <div class="flex gap-4">
                <p class="text-xs text-gray-700 px-4 py-1 rounded-full bg-gray-300/50">${park.activities[0].name}</p>
                <p class="text-xs text-gray-700 px-4 py-1 rounded-full bg-gray-300/50">${park.activities[1].name}</p>
                <p class="text-xs text-gray-700 px-4 py-1 rounded-full bg-gray-300/50">${park.activities[2].name}</p>
            </div>
        
        <button class="explore-btn bg-white/70 hover:bg-green-600 text-green-600 hover:text-white border border-2 border-green-600 font-bold py-2 px-4 mt-8 w-full rounded" data-id="${park.id}">Explore Park</button>
        </div>
    `;
        cardContainer.appendChild(card);
    });
    cardContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('explore-btn')) {
            const id = event.target.dataset.id;
            window.location.hash = `park/${id}`;
        }
    });

}





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
    blog: {
        template: "/templates/blog.html",
        title: "Blog | " + pageTitle,
        description: " Safarii blogs"
    },
    park: {
        template: "/templates/park.html",
        title: "Park | " + pageTitle,
        description: "National Park Details"
    },
};

// location handling
const locationHandler = async () => {
    var location = window.location.hash.replace('#', '');

    // handle parks


    if (location.length == 0) {
        location = '/';
    }
    const [route, id] = location.split('/');

    // get the route object from the routes object
    const routeObj = routes[route] || routes[404];

    // get the html from the template
    html = await fetch(routeObj.template).then((response) => response.text());

    content.innerHTML = html;
    await fetchParksData();
    createParkCards();
    createWildlifeHighlights();
    addParks();;

    if (route === 'park' && id) {
        loadParkDetails(id);
    }

    document.title = routeObj.title;
    // set the desctiprion of the document to the descriotion of the route
    document.querySelector('meta[name="description"]').setAttribute("content", routeObj.description);
}

window.addEventListener("hashchange", locationHandler);

locationHandler();



// Add wildlife highlights

function createWildlifeHighlights() {
    const wildlife = document.getElementById('wildlife-highlights');
    if (!wildlife) return;
    wildlife.innerHTML = '';

    parksData.slice(0, 8).forEach(park => {
        const card = document.createElement('div');
        card.classList.add('wildlife-card');
        card.style.cssText = ' overflow: hidden; transition: transform 0.3s ease;'


        card.innerHTML = `
        <div class="park-image">
            <img src="${park.wildlifeHighlights[0].image}" alt="${park.wildlifeHighlights[0].name}">
        </div>

        <div class="park-content p-4">
            <h3 class="park-title text-lg font-bold mb-4">${park.wildlifeHighlights[0].name}</h3>
        
        </div>
        `;
        wildlife.appendChild(card)
    });
}



// add parks to the park page

function addParks() {
    // clear existing cards
    let parkContainer = document.getElementById('parkContainer');
    if (!parkContainer) return;
    parkContainer.innerHTML = '';

    parksData.forEach((park, index) => {
        const parkWrapper = document.createElement('div');
        parkWrapper.className = 'flex gap-8 mb-8';

        let isEven = index % 2 === 0;


        const textContent = `
                <div class="w-[55%]">
                    <h3 class="text-3xl font-bold tracking-wide mb-4 pt-16">${park.name}</h3>
                    <p class="texl-md px-8 font-regular mb-4"> ${park.mainDescription}</p>
                    <p class="texl-md px-8 font-regular">${[park.mainDescription1]}</p>
                </div>
                `;
        const imageContent = `
                <div class="w-[45%]">
                    <div class="h-1 bg-orange-700 mb-4"></div>
                    <img src="${park.thumbnailImage}" alt="${park.name}">
                    <button class="explore-btn bg-white/70 hover:bg-green-600 text-green-600 hover:text-white border border-2 border-green-600 font-bold py-2 px-4 mt-8 w-full rounded" data-id="${park.id}">Explore Park</button>
                </div>
    `;
        if (isEven) {
            parkWrapper.innerHTML = textContent + imageContent;
        } else {
            parkWrapper.innerHTML = imageContent + textContent;
        }
        parkContainer.appendChild(parkWrapper);


    });


    parkContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('explore-btn')) {
            const id = event.target.dataset.id;
            window.location.hash = `park/${id}`;
        }
    });
}

// load Park Details in park.html

function loadParkDetails(id) {
    const park = parksData.find(park => park.id == id);
    if (!park) return;

    // Elements
    const parkHero = document.getElementById('park-hero');
    const parkName = document.getElementById('park-name');
    const parkDescription = document.getElementById('park-description');
    const mainDescription = document.getElementById('park-main-desc');
    const mainDescription1 = document.getElementById('park-main-desc1');
    const parkThumbnail = document.getElementById('park-thumbnail');
    const wildlife = document.getElementById('park-wildlife');
    const activities = document.getElementById('park-activities');
    const lodges = document.getElementById('park-lodges');

    // hero section
    parkHero.src = park.heroImage;
    parkHero.alt = park.name;
    parkName.textContent = park.name;
    parkDescription.textContent = park.description;

    // about section
    mainDescription.textContent = park.mainDescription;
    mainDescription1.textContent = park.mainDescription1;
    parkThumbnail.src = park.thumbnailImage;
    parkThumbnail.alt = park.name;

    // highlights section
    wildlife.innerHTML = '';
    park.wildlifeHighlights.forEach(animal => {
        wildlife.innerHTML += `
        <div class="text-center">
            <img src="${animal.image}" alt="${animal.name}" class="w-full h-48 object-cover rounded mb-2">
            <p class="font-semibold">${animal.name}</p>
        </div>
        `;
    });

    // activities 
    activities.innerHTML = '';
    park.activities.forEach(activity => {
        activities.innerHTML += `
        <div class="text-center">
            <img src="${activity.image}" alt="${activity.name}" class="w-full h-48 object-cover rounded mb-2">
            <p class="font-semibold">${activity.name}</p>
        </div>
        `;
    });

    // entry fees
    

    // Lodges
    lodges.innerHTML = '';
    park.lodges.forEach(lodge => {
        lodges.innerHTML += `
        <div class=" bg-white shadow-sm overflow-hidden"> 
            <img src="${lodge.heroImage}" alt="${lodge.name}" class=" w-full h-48 object-cover mb-2">
             

            <div class="p-4">
            <h3 class="font-bold text-lg"> ${lodge.name}</h3>
                <div class="flex items-center mb-2 gap-4  mt-2">
                   <p class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">${lodge.type}</p>
                    <p class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">${lodge.rank}</p>
                </div>
                
                <p class="text-sm text-gray-700">${lodge.description}</p>

                <button class="explore-btn bg-white/70 hover:bg-green-600 text-green-600 hover:text-white border border-2 border-green-600 font-bold py-2 px-4 mt-4 w-full rounded" data-id="${lodge.id}">Explore Lodge</button>
            </div>
        
        </div>
        `;
    });

    document.title = `${park.name} | Safarii`;

}

