// DOM Elements
const content = document.getElementById('content');

// fetch

let parksData = [];

async function fetchParksData() {
    if (parksData.length > 0) return;
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
//  fetch safaris data
let safarisData = [];
async function fetchsafarisData() {
    if (safarisData.length > 0) return;
    try {
        const response = await fetch('data/safaris.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        safarisData = data.safaris;
        // console.log(safarisData);
    } catch (error) {
        console.error('Error fetching Safaris data', error);
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
    addParks();
    if (route === 'park' && id) {
        loadParkDetails(id);
    }
    if (route === 'lodge' && id) {
        loadLodgeDetails(id);
    }
    await fetchsafarisData();
    if (route === 'safaris') {
        loadSafaris();
    }
    if (route === 'safari' && id) {
        loadSafariDetails(id);
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
                <p class="text-xs tracking-widest uppercase text-orange-700 mb-3">National Park</p>
                    <h3 class="font-serif text-4xl font-bold text-stone-800 tracking-wide mb-6">${park.name}</h3>
                    <p class="texl-md px-8 mb-4"> ${park.mainDescription}</p>
                    <p class="texl-md px-8 mb-8">${[park.mainDescription1]}</p>
                    
                </div>
                `;
        const imageContent = `
                <div class="w-[45%]">
                    <div class="h-1 bg-orange-700 mb-4"></div>
                    <img src="${park.thumbnailImage}" alt="${park.name}" class="w-full object-cover">
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
    const feesKenyan = document.getElementById('fees-kenyan');
    const feesEastAfrican = document.getElementById('fees-eastafrican');
    const feesNonResident = document.getElementById('fees-nonresident');

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
    feesKenyan.innerHTML = '';
    feesEastAfrican.innerHTML = '';
    feesNonResident.innerHTML = '';

    park.entryFees.kenyan.forEach(fee => {
        feesKenyan.innerHTML += `
        <div class="flex justify-between border-b py-2">
            <span>${fee.category}</span>
            <span class="font-bold">${fee.fee}</span>
        </div>
        `
    });

    park.entryFees.eastAfrican.forEach(fee => {
        feesEastAfrican.innerHTML += `
        <div class="flex justify-between border-b py-2">
            <span>${fee.category}</span>
            <span class="font-bold">${fee.fee}</span>
        </div>
        `
    });

    park.entryFees.noneResident.forEach(fee => {
        feesNonResident.innerHTML += `
        <div class="flex justify-between border-b py-2">
            <span>${fee.category}</span>
            <span class="font-bold">${fee.fee}</span>
        </div>
        `
    });


    // Lodges
    lodges.innerHTML = '';
    if (park.lodges) {
        park.lodges.forEach(lodge => {
            lodges.innerHTML += `
        <div class=" bg-white shadow-sm overflow-hidden"> 
            <div class="relative">
                <img src="${lodge.heroImage}" alt="${lodge.name}" class=" w-full h-48 object-cover">
                <div class="absolute bottom-0 left-0 flex items-center gap-2 p-3">
                   <p class="text-xs tracking-widest uppercase px-3 py-1 border border-white/80 text-white">${lodge.type}</p>
                    <p class="text-xs tracking-widest uppercase px-3 py-1 bg-orange-700 text-white">${lodge.rank}</p>
                </div>
            </div>
            
             

            <div class="p-4">
            <h3 class="font-bold text-lg"> ${lodge.name}</h3>
                
                
                <p class="text-sm text-gray-700 my-4">${lodge.description}</p>

                <button class="explore-btn bg-white/70 hover:bg-green-600 text-green-600 hover:text-white border border-2 border-green-600 font-bold py-2 px-4 mt-4 w-full rounded" data-id="${lodge.id}">Explore Lodge</button>
            </div>
        
        </div>
        `;
        });
    }
    document.title = `${park.name} | Safarii`;

    lodges.addEventListener('click', (event) => {
        if (event.target.classList.contains('explore-btn')) {
            const id = event.target.dataset.id;
            window.location.hash = `lodge/${id}`;
        }
    });

}

// Load lodge details for each lodge in lodge.html
function loadLodgeDetails(id) {
    let lodge = null;
    parksData.forEach(park => {
        if (!park.lodges) return;
        const exists = park.lodges.find(lodge => lodge.id === id);
        if (exists) lodge = exists;
    });

    if (!lodge) return;

    // Elements
    const lodgeHero = document.getElementById('lodge-hero');
    const lodgeType = document.getElementById('lodge-type');
    const lodgeRank = document.getElementById('lodge-rank');
    const lodgeName = document.getElementById('lodge-name');
    const lodgeDescription = document.getElementById('lodge-description');

    const overviewImage = document.getElementById('overview-image')
    const overviewTitle = document.getElementById('overview-title')
    const mainDescription = document.getElementById('lodge-main-desc');
    const mainDescription1 = document.getElementById('lodge-main-desc1');
    const statRooms = document.getElementById('stat-rooms');
    const statType = document.getElementById('stat-type');
    const statEco = document.getElementById('stat-eco');

    const roomsDiv = document.getElementById('rooms-div');
    const ctaName = document.getElementById('cta-lodge-name');

    // Hero section
    lodgeHero.src = lodge.heroImage;
    lodgeHero.alt = lodge.name;
    lodgeType.textContent = lodge.type;
    lodgeRank.textContent = lodge.rank;
    lodgeName.textContent = lodge.name;
    lodgeDescription.textContent = lodge.description;

    // Overview
    overviewImage.src = lodge.gallery[0];
    overviewImage.alt = lodge.name;
    overviewTitle.textContent = lodge.name;
    mainDescription.textContent = lodge.mainDescription;
    mainDescription1.textContent = lodge.mainDescription1;

    let totalRooms = 0;
    lodge.rooms.forEach(function (room) {
        totalRooms = totalRooms + room.totalRooms;
    });
    statRooms.textContent = totalRooms;
    statType.textContent = lodge.type;

    statEco.innerHTML = `<i class="fa-solid fa-star" style="color: rgb(29, 97, 29);"></i>${lodge.ecoRating}`;

    // Rooms
    roomsDiv.innerHTML = '';
    lodge.rooms.forEach((room, index) => {
        const roomWrapper = document.createElement('div');
        roomWrapper.className = 'flex gap-8 mb-16';

        let isEven = index % 2 === 0;

        const textContent = `
        <div class="w-[55%]">
            <p class="text-xs tracking-widest uppercase text-orange-600 mb-2">${room.id}</p>
            <h3 class="font-serif text-3xl text-gray-800 mb-1">${room.name}</h3>
            <div class="flex items-baseline gap-1 mb-6">
                <span class="font-serif text-2xl text-orange-700">${room.basePrice}</span>
                <span class="text-xs text-gray-400">/ night</span>
            </div>
            <p class="text-gray-500 text-sm leading-relaxed mb-8">${room.description || ''}</p>
            <div class="flex gap-6 text-sm text-gray-500 mb-8">
                <span class="flex items-center gap-2">
                    Up to <strong class="text-gray-700 ml-1">${room.capacity}</strong>&nbsp;guests
                </span>
                <span class="flex items-center gap-2">

                    <strong class="text-gray-700">${room.totalRooms}</strong>&nbsp;rooms
                </span>
            </div>
            <button"
                class="self-start px-8 py-3 bg-stone-800 hover:bg-orange-600 text-white text-xs tracking-widest uppercase transition-colors">
                Book This Room
            </button>
        </div>
        `;

        const imageContent = `
        <div class="w-[45%]">
            <div class="w-full h-1 bg-orange-900  mb-8"></div>
            <img src="${room.image}" alt="${room.name}" class="w-full h-auto object-cover ">
        </div>
        `;

        if (isEven) {
            roomWrapper.innerHTML = textContent + imageContent;
        } else {
            roomWrapper.innerHTML = imageContent + textContent;
        }

        roomsDiv.appendChild(roomWrapper);
    });



    ctaName.textContent = lodge.name;

    document.title = `${lodge.name} | Safarii`

}


// function to load safaris listing

function loadSafaris() {
    const safariContainer = document.getElementById('safariContainer');
    if (!safariContainer) return;
    safariContainer.innerHTML = '';

    safarisData.forEach(safari => {
        const parkNames = safari.parks.map(p => p.parkName).join(' → ');
        const card = document.createElement('div');
        card.classList.add('safari-card');

        card.innerHTML = `
            <div class="safari-image overflow-hidden relative">
                <img src="${safari.thumbnailImage}" alt="${safari.name}" class="w-full h-56 object-cover">
                <span class="absolute top-3 left-3 text-xs uppercase tracking-widest px-3 py-1 bg-stone-800/80 text-white">${safari.category}</span>
                <span class="absolute top-3 right-3 text-xs uppercase tracking-widest px-3 py-1 bg-orange-700 text-white">${safari.duration}</span>
            </div>

            <div class="safari-content p-5 bg-white">
                <p class="text-xs text-orange-700 tracking-widest uppercase mb-1">${parkNames}</p>
                <h3 class="text-xl font-serif font-bold text-stone-800 mb-2">${safari.name}</h3>
                <p class="text-sm text-stone-500 mb-5">${safari.tagline}</p>

                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs text-stone-400 uppercase tracking-wider">From</p>
                        <p class="font-serif text-xl text-orange-700">KES ${Number(safari.price).toLocaleString('en-KE')}</p>
                        <p class="text-xs text-stone-400">per person</p>
                    </div>
                    <button class="view-safari-btn bg-stone-800 hover:bg-orange-700 text-white text-xs tracking-widest uppercase py-2 px-5 transition-colors" data-id="${safari.id}">
                        View Package
                    </button>
                </div>
            </div>
        `;

        safariContainer.appendChild(card);
    });

    safariContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-safari-btn')) {
            const id = event.target.dataset.id;
            window.location.hash = `safari/${id}`;
        }
    });
}

// filter 
function filterSafaris(category) {
    const safariContainer = document.getElementById('safariContainer');
    if (!safariContainer) return;

    document.querySelectorAll('.safari-filter-btn').forEach(btn => {
        btn.classList.toggle('active-filter', btn.dataset.filter === category);
    });

    safariContainer.innerHTML = '';

    const filtered = category === 'all'
        ? safarisData
        : safarisData.filter(s => s.category === category);

    filtered.forEach(safari => {
        const parkNames = safari.parks.map(p => p.parkName).join(' → ');

        safariContainer.innerHTML += `
            <div class="safari-card">
                <div class="safari-image overflow-hidden relative">
                    <img src="${safari.thumbnailImage}" alt="${safari.name}" class="w-full h-56 object-cover">
                    <span class="absolute top-3 left-3 text-xs uppercase tracking-widest px-3 py-1 bg-stone-800/80 text-white">${safari.category}</span>
                    <span class="absolute top-3 right-3 text-xs uppercase tracking-widest px-3 py-1 bg-orange-700 text-white">${safari.duration}</span>
                </div>

                <div class="safari-content p-5 bg-white">
                    <p class="text-xs text-orange-700 tracking-widest uppercase mb-1">${parkNames}</p>
                    <h3 class="text-xl font-serif font-bold text-stone-800 mb-2">${safari.name}</h3>
                    <p class="text-sm text-stone-500 mb-5">${safari.tagline}</p>

                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs text-stone-400 uppercase tracking-wider">From</p>
                            <p class="font-serif text-xl text-orange-700">KES ${Number(safari.price).toLocaleString('en-KE')}</p>
                            <p class="text-xs text-stone-400">per person</p>
                        </div>
                        <button class="view-safari-btn bg-stone-800 hover:bg-orange-700 text-white text-xs tracking-widest uppercase py-2 px-5 transition-colors" data-id="${safari.id}">
                            View Package
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    // Re-attach click listener after re-render
    safariContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-safari-btn')) {
            const id = event.target.dataset.id;
            window.location.hash = `safaris/${id}`;
        }
    });
}

// load safari details for each safari
currentSafari = safari;
function loadSafariDetails(id) {
    const safari = safarisData.find(safari => safari.id === id);
    if (!safari) return;

    // Elements
    const safariHero        = document.getElementById('safari-hero');
    const safariCategory    = document.getElementById('safari-category');
    const safariDuration    = document.getElementById('safari-duration');
    const safariName        = document.getElementById('safari-name');
    const safariTagline     = document.getElementById('safari-tagline');
    const safariDescription = document.getElementById('safari-description');
    const safariRoute       = document.getElementById('safari-route');
    const safariHighlights  = document.getElementById('safari-highlights');
    const safariIncludes    = document.getElementById('safari-includes');
    const safariExcludes    = document.getElementById('safari-excludes');
    const ctaName           = document.getElementById('cta-safari-name');
    const summaryPrice     = document.getElementById('summary-price');
    const summaryDuration  = document.getElementById('summary-duration');
    const summaryParks     = document.getElementById('summary-parks');
    const summaryCategory  = document.getElementById('summary-category');
    const summaryBestTime  = document.getElementById('summary-best-time');
    const summaryRating = document.getElementById('summary-rating')

    // Hero
    safariHero.src = safari.heroImage;
    safariHero.alt = safari.name;
    safariCategory.textContent = safari.category;
    safariDuration.textContent = safari.duration;
    safariName.textContent = safari.name;
    safariTagline.textContent = safari.tagline;
    safariDescription.textContent = safari.description;

    // Summary card
    summaryPrice.textContent    = 'KES ' + Number(safari.price).toLocaleString('en-KE');
    summaryDuration.textContent = safari.duration;
    summaryParks.textContent    = safari.parks.map(p => p.parkName).join(', ');
    summaryCategory.textContent = safari.category;
    summaryBestTime.textContent = safari.bestTime.join(', ');
    ctaName.textContent         = safari.name;
    summaryRating.textContent = safari.rating;

    // Journey route stops
    safariRoute.innerHTML = '';
    safari.parks.forEach((stop, index) => {
        const isLast = index === safari.parks.length - 1;
        safariRoute.innerHTML += `
            <div class="flex gap-4 ${isLast ? '' : 'mb-0'}">
                <div class="flex flex-col items-center w-8 flex-shrink-0">
                    <div class="w-3 h-3 rounded-full bg-orange-700 mt-1 flex-shrink-0"></div>
                </div>
                <div class="pb-8 flex-1">
                    <div class="flex items-start justify-between">
                        <div>
                            <p class="text-xs tracking-widest uppercase text-orange-700 mb-0.5">Stop ${index + 1}</p>
                            <h4 class="font-serif text-lg text-stone-800">${stop.parkName}</h4>
                            <p class="text-sm text-stone-500">${stop.lodgeName}</p>
                        </div>
                        <span class="text-xs bg-stone-100 text-stone-600 px-3 py-1 mt-1 ml-4 whitespace-nowrap">
                            ${stop.nights} night${stop.nights !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            </div>
        `;
    });

    // Highlights
    safariHighlights.innerHTML = '';
    safari.highlights.forEach(highlight => {
        safariHighlights.innerHTML += `
            <div class="flex items-start gap-3 bg-stone-50 p-4">
                <i class="fa-solid fa-paw text-orange-600 mt-0.5 flex-shrink-0 text-sm"></i>
                <p class="text-sm text-stone-700">${highlight}</p>
            </div>
        `;
    });

    // Includes
    safariIncludes.innerHTML = '';
    safari.includes.forEach(item => {
        safariIncludes.innerHTML += `
            <li class="flex items-start gap-3 text-sm text-stone-700">
                <i class="fa-solid fa-circle-check text-green-600 mt-0.5 flex-shrink-0"></i>
                <span>${item}</span>
            </li>
        `;
    });

    // Excludes
    safariExcludes.innerHTML = '';
    safari.excludes.forEach(item => {
        safariExcludes.innerHTML += `
            <li class="flex items-start gap-3 text-sm text-stone-500">
                <i class="fa-solid fa-circle-xmark text-red-400 mt-0.5 flex-shrink-0"></i>
                <span>${item}</span>
            </li>
        `;
    });

    document.title = `${safari.name} | Safarii`;
}