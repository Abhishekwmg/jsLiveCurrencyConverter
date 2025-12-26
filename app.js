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

closeModal.addEventListener('click', () => dialogBox.close())
// pageLogo.src = countryList[19].country_img;

const citiesSuggestion = [];

cityInput.addEventListener('input', (e) => {
    let enteredCity = e.target.value.toLowerCase();
    let suggestedCity = cities.filter((city) => city.city.toLowerCase().startsWith(enteredCity) || city.country.toLowerCase().startsWith(enteredCity));

    // const [city] = suggestedCity;


    suggestions.innerHTML = "";
    if (!enteredCity) return;

    suggestedCity.forEach((city) => {
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


const dateEl = document.querySelectorAll('.timezone-date');
const timeEl = document.querySelectorAll('.timezone-curr-time');

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

    dateEl.forEach((date) => {
        date.textContent = dateFormatter.format(now);
    })

    timeEl.forEach((time) => {
        time.textContent = timeFormatter.format(now)
    })
}

setInterval(updateTime, 1000);

const mobileMenu = document.querySelector('.mobile-menu');
const menuOpen = document.querySelector('.menu-open');
const closeMenu = document.querySelector('.close-menu');

mobileMenu.addEventListener('click', (e) => {
    // menuOpen.classList.add('show')
    if (menuOpen.classList.contains('show')) {
        menuOpen.classList.remove('show')
    } else {
        menuOpen.classList.add('show')
    }
})

closeMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    menuOpen.classList.remove('show')
})

// const sourceBtn = document.querySelectorAll('#source-btn');
// const sourceCountryDropdown = document.querySelectorAll('#source-country-dropdown');
// const currencyCountryList = document.querySelectorAll('#currency-country-list');
// const currencySymbol = document.querySelectorAll('.curr-sign');


// sourceBtn.forEach((srcbtn) => {
//     srcbtn.addEventListener('click', () => {

//         sourceCountryDropdown.forEach((srcdrop) => {
//             if (srcdrop.classList.contains("show")) {
//                 srcdrop.classList.remove("show")
//             } else {
//                 srcdrop.classList.add("show")
//             }
//         })

//         currencyCountryList.innerHTML = "";

//         countryList.forEach((countries) => {
//             const { currency, country, country_img, symbol } = countries;
//             currencyCountryList.forEach((cl) => {
//                 cl.insertAdjacentHTML('beforeend', `<li data-currency="${currency}" data-icon="${country_img}" data-symbol="${symbol}">
//                                 <p>${currency}</p>
//                                 <span><img src="${country_img}" alt="${country}"></span>
//                             </li>` );
//             })
//         })
//     })
// })

// currencyCountryList.innerHTML = "";

// currencyCountryList.forEach((list) => {
//     list.addEventListener("click", (e) => {
//         const liEl = e.target.closest("li");

//         if (!liEl) return;

//         const chosenCurr = liEl.dataset.currency;
//         const currIcon = liEl.dataset.icon;
//         const currSymbol = liEl.dataset.symbol;
//         console.log(currSymbol);
//         sourceBtn.forEach((srcbtns) => {
//             srcbtns.innerHTML = `
//                         <p>${chosenCurr}</p>
//                         <div class="moto">
//                             <img src="${currIcon}" alt="${chosenCurr}">
//                             <span>
//                                 <i class="fa-solid fa-caret-down"></i>
//                             </span>
//                         </div>
//                     `;
//         })
//         currencySymbol.textContent = currSymbol;
//         sourceCountryDropdown.forEach((sc) => {
//             sc.classList.remove("show")
//         })

//     })
// })

// const revertCurr = document.querySelector('.revert');
// revertCurr.addEventListener('click', (e) => {
//     console.log("clicked")
//     const revertEl = document.querySelector('.split-button-drops');
//     revertEl.style.flexDirection = revertEl.style.flexDirection === "row-reverse" ? "row" : "row-reverse";
// })

// //New Logic

// document.querySelectorAll('.btn-wid').forEach((btns) => {
//     const srcBtn = document.querySelector('.source-btn');
//     const genCountry = document.querySelector('.generate-country');
//     const currCountryList = document.querySelector('.currency-country-list');
//     const currSign = document.querySelector('.curr-sign');

//     srcBtn.addEventListener('click', () => {

//         genCountry.classList.toggle("show");
//     })

// })


const btnSourceModel = document.querySelector("#btn-source-model");
const sourceBtn = document.querySelector('#src-btn');
const sourceCountryDropdown = document.querySelector("#src-country-dropdown");
const sourceCurrencyCountryList = document.querySelector("#source-currency-country-list");
const sourceCurrencySign = document.querySelector("#source-curr-sign");



let sourceCurrency;
let targetCurrency;

async function fetchCurrDetails(source, target) {
    const getData = await fetch(`https://hexarate.paikama.co/api/rates/${source}/${target}/latest`);
    const data = await getData.json();
    return data.data.mid;
}

const srcBtn = document.querySelector('.src-btn');
const generateCountry = document.querySelector('.generate-country');
const srcCurrencyCountryList = document.querySelector('.source-currency-country-list');
const srcCurrIcon = document.querySelector('#src-curr-icon');

srcBtn.addEventListener('click', () => {
    generateCountry.classList.toggle("show");
    srcCurrencyCountryList.innerHTML = "";
    countryList.forEach(({ currency, country_img, country, symbol, currency_code }) => {
        srcCurrencyCountryList.insertAdjacentHTML('beforeend', `<li data-currency="${currency}" data-icon="${country_img}" data-currcode="${currency_code}" data-symbol="${symbol}">
                                <p>${currency}</p>
                                 <span><img src="${country_img}" alt="${country}"></span>
                             </li>`);
    })

    srcCurrencyCountryList.addEventListener('click', (e) => {
        let liEl = e.target.closest('li');

        let currency = liEl.dataset.currency;
        let country = liEl.dataset.country;
        let symbol = liEl.dataset.symbol;
        let currImg = liEl.dataset.icon
        let srcCurrCode = liEl.dataset.currcode;

        if (!liEl) return;

        srcBtn.innerHTML = `<p>${currency}</p>
                        <div class="moto">
                            <img src="${currImg}" alt="">
                            <span>
                                <i class="fa-solid fa-caret-down"></i>
                            </span>
                        </div>`
        generateCountry.classList.remove("show");
        srcCurrIcon.textContent = symbol;
        sourceCurrency = srcCurrCode;
    })
});

const targetBtn = document.querySelector('#target-btn');
const targetDropdown = document.querySelector('#target-country-dropdown');
const targetCurrCountryList = document.querySelector('#target-currency-country-list');
const targetCurrIcon = document.querySelector('#target-curr-icon');

targetBtn.addEventListener('click', () => {
    targetDropdown.classList.toggle("show");
    targetCurrCountryList.innerHTML = "";
    countryList.forEach(({ currency, country_img, country, symbol, currency_code }) => {
        targetCurrCountryList.insertAdjacentHTML('beforeend', `<li data-targetcurrency="${currency}" data-targeticon="${country_img}" data-targetcurrcode="${currency_code}" data-targetsymbol="${symbol}">
                                <p>${currency}</p>
                                 <span><img src="${country_img}" alt="${country}"></span>
                             </li>`);
    })

    targetCurrCountryList.addEventListener('click', (e) => {
        let liEl = e.target.closest('li');

        if (!liEl) return;

        let currency = liEl.dataset.targetcurrency;
        let country = liEl.dataset.country;
        let symbol = liEl.dataset.targetsymbol;
        let currImg = liEl.dataset.targeticon
        let targetCurrCode = liEl.dataset.targetcurrcode;

        if (!liEl) return;

        targetBtn.innerHTML = `<p>${currency}</p>
                        <div class="moto">
                            <img src="${currImg}" alt="">
                            <span>
                                <i class="fa-solid fa-caret-down"></i>
                            </span>
                        </div>`
        targetDropdown.classList.remove("show");
        targetCurrIcon.textContent = symbol;
        targetCurrency = targetCurrCode;
    })
});


const currInp = document.querySelector(".currency-input");

currInp.addEventListener("input", async (e) => {

    let eva = Number(e.target.value);

    if (eva) {
        const data = await fetchCurrDetails(sourceCurrency, targetCurrency);
        // console.log(typeof eva);
        // console.log(data);
        document.querySelector('#target-currency-converted').value = (eva * data).toFixed(2);
    }
    if (!eva) {
        document.querySelector('#target-currency-converted').value = "";
    }
})

