import { parksData, state } from "./data.js";


// Load lodge details for each lodge in lodge.html
export function loadLodgeDetails(id) {
    let lodge = null;
    parksData.forEach(park => {
        if (!park.lodges) return;
        const exists = park.lodges.find(lodge => lodge.id === id);
        if (exists) lodge = exists;
    });

    if (!lodge) return;

    state.currentRoom = lodge.rooms[0];
    window.currentLodge = lodge;

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
            <button onclick="openLodgeBooking('${room.id}')" class="self-start px-8 py-3 bg-stone-800 hover:bg-orange-600 text-white text-xs tracking-widest uppercase transition-colors">
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
