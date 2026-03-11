import { safarisData, state } from "./data.js";

// function to load safaris listing
export function loadSafaris() {
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
            window.location.hash = `safari/${event.target.dataset.id}`;
        }
    });
}

// filter 
export function filterSafaris(category) {
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
            window.location.hash = `safari/${id}`;
        }
    });
}


// load safari details for each safari
export function loadSafariDetails(id) {
    const safari = safarisData.find(safari => safari.id === id);
    if (!safari) return;

    state.currentSafari = safari;

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

    window.currentSafari = safari;

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
