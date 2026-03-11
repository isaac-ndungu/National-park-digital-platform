export const parksData = [];
export const safarisData = [];

export const state = {
    currentSafari: null,
    currentRoom: null,
    lodgeGuestCount: 2,
    lodgeRoomCount: 1,
    safariGuestCount: 2,
};

// Fetch park data

export async function fetchParksData() {
    if (parksData.length > 0) return;
    try {
        const response = await fetch('data/parks.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        parksData.push(...data.parks);
    } catch (error) {
        console.error('Error fetching parks data:', error);
    }
}
//  fetch safaris data
export async function fetchSafarisData() {
    if (safarisData.length > 0) return;
    try {
        const response = await fetch('data/safaris.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        safarisData.push(...data.safaris);
        // console.log(safarisData);
    } catch (error) {
        console.error('Error fetching Safaris data', error);
    }
}