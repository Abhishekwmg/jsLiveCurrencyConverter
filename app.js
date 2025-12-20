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
// pageLogo.src = countryList[19].country_img;