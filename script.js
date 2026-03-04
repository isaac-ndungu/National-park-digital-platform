// DOM Elements

const cardContainer = document.getElementById('cardContainer');

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
