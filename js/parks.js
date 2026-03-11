import { parksData } from './data.js';

// create park card

export function createParkCards() {
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


// Add wildlife highlights

export function createWildlifeHighlights() {
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

export function addParks() {
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

export function loadParkDetails(id) {
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
            window.location.hash = `lodge/${event.target.dataset.id}`;
        }
    });

}