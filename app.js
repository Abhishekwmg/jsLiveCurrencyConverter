import { countryList } from "./data/countries.js";
import { cities } from "./data/cities.js";

// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'apy-token': 'APY0GWx2bR1QV3Z9OD6gOqW0zEpS4kXitBSOQY0NwCSEKjFfdAmOSCnxw2KVUpNS'
//     },
//     body: '{"source":"eur","target":"inr"}'
// };

// fetch('https://api.apyhub.com/data/convert/currency', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));



const pageLogo = document.querySelector('#page-logo');
const dialogBox = document.querySelector('#dialog-box');
const chooseCityBtn = document.querySelector('.choose-city');
const closeModal = document.querySelector('.close-modal')
const cityInput = document.querySelector("#city-input");
const suggestedCities = document.querySelector('.suggested-cities');
const suggestions = document.querySelector('.suggestions')
const citySelect = document.querySelector('.city-select');


chooseCityBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialogBox.showModal();
})

closeModal.addEventListener('click', () => {
    dialogBox.close();
})
// pageLogo.src = countryList[19].country_img;

const citiesSuggestion = [];

cityInput.addEventListener('input', (e) => {
    let enteredCity = e.target.value.toLowerCase();
    let suggestedCity = cities.filter((city) => city.city.toLowerCase().startsWith(enteredCity) || city.country.toLowerCase().startsWith(enteredCity));

    // const [city] = suggestedCity;


    suggestions.innerHTML = "";
    if (!enteredCity) return;

    suggestedCity.map((city) => {
        suggestions.innerHTML += `<p class="suggested-cities">${city.city}, ${city.country}</p>`
    })
})

suggestions.addEventListener('click', (e) => {
    e.preventDefault();
    if (!e.target.classList.contains('suggested-cities')) return;

    const selectCity = e.target.textContent;
    cityInput.value = selectCity;
    chooseCityBtn.innerHTML = `<span><i
                                class="fa-solid fa-location-arrow"></i></span>${selectCity}<i class="fa-solid fa-caret-down"></i>`;
    cityInput.value = "";
    suggestions.innerHTML = "";
    dialogBox.close();
})


// function timeZone() {
//     const d = new Date();
//     const days = [
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday"
//     ];

//     const currDay = days[d.getDay()];
//     const currDate = d.getDate();
//     const currMonth = d.getMonth() + 1;
//     const currYear = d.getFullYear();
//     const currMinute = d.getMinutes();
//     const currHour = d.getHours();
//     const currSecond = d.getSeconds();
//     // const currTimezone = d.

//     // console.log(`${d}`)

//     const timeZone = new Intl.DateTimeFormat("en-US", {
//         timeZoneName: "short"
//     }).format(d);

//     // console.log(timeZone);
//     const tz = timeZone.split(" ").pop();
//     // console.log(tz)

//     document.querySelector('.timezone-date').textContent = `${currDay}, ${currDate < 10 ? 0 + currDate : currDate}/${currMonth < 10 ? 0 + currMonth : currMonth}/${currYear}`;
//     document.querySelector('.timezone-curr-time').textContent = `${currHour < 10 ? "0" + currHour : currHour}:${currMinute < 10 ? "0" + currMinute : currMinute}:${currSecond < 10 ? "0" + currSecond : currSecond} ${tz}`;

//     // console.log(`${currDay}, ${currDate}/${currMonth}/${currYear}`);
//     // console.log(`${currHour}:${currMinute}:${currSecond} ${tz}`)
// }


// setInterval(() => { timeZone() }, 1000);
// timeZone();

const dateEl = document.querySelector('.timezone-date');
const timeEl = document.querySelector('.timezone-curr-time');

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short"
});

function updateTime() {
    const now = new Date();

    dateEl.textContent = dateFormatter.format(now);
    timeEl.textContent = timeFormatter.format(now);
}

setInterval(updateTime, 1000);
// updateTime(); // run immediately

const mobileMenu = document.querySelector('.mobile-menu');
const menuOpen = document.querySelector('.menu-open');

mobileMenu.addEventListener('click', (e) => {
    menuOpen.classList.add('show');
    console.log("Clicked Menu Btn.")
})