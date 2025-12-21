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
    if (!e.target.classList.contains('suggested-cities')) return;

    const selectCity = e.target.textContent;
    console.log("clicked", selectCity);
    cityInput.value = selectCity;
    chooseCityBtn.innerHTML = `<span><i
                                class="fa-solid fa-location-arrow"></i></span>${selectCity}
                        </a>`;
    dialogBox.close();
})