document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('searchBox');
    const cafeList = document.getElementById('cafeList');

    // Fetch cafes and places from API
    fetchCafes().then(cafes => {
        fetchPlaces().then(places => {
            displayCafeList(cafes, places);

            // Add event listener to search box
            searchBox.addEventListener('input', () => {
                const searchTerm = searchBox.value.toLowerCase();
                const filteredCafes = filterCafesByName(cafes, searchTerm);
                displayCafeList(filteredCafes, places);
            });
        });
    });
});

async function fetchCafes() {
    const response = await fetch('https://api.example.com/cafes');
    const cafes = await response.json();
    return cafes;
}

async function fetchPlaces() {
    const response = await fetch('https://api.example.com/places');
    const places = await response.json();
    return places;
}

function filterCafesByName(cafes, searchTerm) {
    return cafes.filter(cafe => cafe.name.toLowerCase().includes(searchTerm));
}

function displayCafeList(cafes, places) {
    const cafeList = document.getElementById('cafeList');
    cafeList.innerHTML = '';

    cafes.forEach(cafe => {
        const place = places.find(p => p.id === cafe.place_id);
        if (place) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cafe.name}</td>
                <td>${place.street_no}</td>
                <td>${place.locality}</td>
                <td>${place.postal_code}</td>
                <td>${place.lat}</td>
                <td>${place.long}</td>
            `;
            cafeList.appendChild(row);
        }
    });
}
