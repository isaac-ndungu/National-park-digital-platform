// add parks to the park page

function addParks() {
    // clear existing cards
    let parkContainer = document.getElementById('parkContainer');
    parkContainer.innerHTML = '';

    console.log(`${park.name}`);
    parksData.forEach(park => {
        console.log(`${park.name}`);
        const parkWrapper = document.createElement('div');
        parkWrapper.className = 'flex gap-16 mb-8'

        parkWrapper.innerHTML = `
                <div class="w-[55%]">
                    <h3 class="mb-6">${park.name}</h3>
                    <p> ${park.mainDescription}</p>
                </div>
                <div class="w-[45%]">
                    <div class="h-1 bg-orange-700 mb-4"></div>
                    <img src="${park.thumbnailImage}" alt="${park.name}">
                    <button class="explore-btn bg-white/70 hover:bg-green-600 text-green-600 hover:text-white border border-2 border-green-600 font-bold py-2 px-4 mt-8 w-full rounded" data-id="${park.id}">Explore Park</button>
                </div>
    `;
        parkContainer.appendChild(parkWrapper);
    });
}

