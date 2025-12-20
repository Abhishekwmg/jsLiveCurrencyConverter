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
const suggestions = document.querySelector('.suggestions')


chooseCityBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialogBox.showModal();
})

closeModal.addEventListener('click', () => {
    dialogBox.close();
})
// pageLogo.src = countryList[19].country_img;

cityInput.addEventListener('input', (e) => {
    let enteredCity = e.target.value.toLowerCase();
    let suggestedCity = cities.filter((city) => city.city.toLowerCase().startsWith(enteredCity));

    const [city] = suggestedCity;
    suggestedCity.map((city) => {
        let cityNames = `<p class="suggested-cities">${city.city}</p>`
        return suggestions.append(cityNames)
    })
    // suggestedCities.textContent = city.city;
    // console.log(city.city);
    // suggestedCities.textContent = k
})  