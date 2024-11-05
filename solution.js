let reservation = {
    startDate: null,
    endDate: null,
    guestsCount: 0,
    roomType: null,
    name: null,
    phone: null,
    email: null
};

function changeContent(className) {
    document.querySelectorAll('.custom-form').forEach(div => div.classList.add('hidden'));
    if (document.querySelector(`.${className}`) != null) {
        document.querySelector(`.${className}`).classList.remove('hidden');
    }
}

// Event listener to start a new reservation and clean data
document.querySelector('#new-reservation').addEventListener('click', (e) => cleanData(e));

function cleanData(e) {
    e.preventDefault();
    reservation = {
        startDate: null,
        endDate: null,
        guestsCount: 0,
        roomType: null,
        name: null,
        phone: null,
        email: null
    };
    changeContent('search-form-content');
}

// Search Form Submit
document.querySelector('#search-form-button').addEventListener('click', (e) => searchFormData(e));

function searchFormData(e) {
    e.preventDefault();
    const data = e.target.parentElement;
    const checkIn = data.querySelector('#check-in').value;
    const checkOut = data.querySelector('#check-out').value;
    const people = data.querySelector('#people').value;
    if (checkIn !== '' && checkOut !== '' && people !== '' &&
        new Date(checkIn) <= new Date(checkOut)) {
        reservation.startDate = checkIn;
        reservation.endDate = checkOut;
        reservation.guestsCount = people;
        console.log("Reservation data from search form:", reservation);
        changeContent('search-result-form-content');
    }
}

// Back Button to go back to the search form
document.querySelector('#search-back-btn').addEventListener('click', (e) => fillSearchForm(e));

function fillSearchForm(e) {
    e.preventDefault();
    changeContent('search-form-content');
    document.querySelector('#check-in').value = reservation.startDate;
    document.querySelector('#check-out').value = reservation.endDate;
    document.querySelector('#people').value = reservation.guestsCount;
}

// Room Selection
document.querySelectorAll('.room-type').forEach(room => {
    room.addEventListener("click", (e) => selectRoomType(e));
});

function selectRoomType(e) {
    e.preventDefault();
    let myTarget;
    if (e.target.tagName === 'IMG') {
        myTarget = e.target.parentElement;
    } else {
        myTarget = e.target;
    }
    document.querySelectorAll('.room-type').forEach(room =>
        room.classList.remove('selected-room'));
    myTarget.classList.add('selected-room');
}

// Next Button to confirm room selection and go to guest details form
document.querySelector('#search-next-btn').addEventListener('click', (e) => findRoom(e));

function findRoom(e) {
    e.preventDefault();
    const roomInfo = document.querySelector('.selected-room h4').textContent;
    reservation.roomType = roomInfo;
    console.log("Room selected:", reservation);
    changeContent('guest-details-form-content');
}
