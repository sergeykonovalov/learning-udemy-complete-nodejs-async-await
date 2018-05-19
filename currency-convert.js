const axios = require('axios');

let fixerApiKey = process.env.FIXER_KEY;
console.log(`Fixer API key is ${fixerApiKey}`);

let fixerApiUrl = `http://data.fixer.io/api/latest?access_key=${fixerApiKey}&format=1`;
let countriesApiUrl = 'https://restcountries.eu/rest/v2/currency/';
console.log(`Fixer API URL is ${fixerApiUrl}`);

// let getExchangeRate = (from, to) => {
//     return axios.get(fixerApiUrl).then((response) => {
//         let euro = 1 / response.data.rates[from];
//         let rate = euro * response.data.rates[to];
//         return rate;
//     }).catch();
// };

let getExchangeRate = async (from, to) => {
    try {
        let response = await axios.get(fixerApiUrl);
        let euro = 1 / response.data.rates[from];
        let rate = euro * response.data.rates[to];
        return rate;
    } catch {
        throw new Error(`Impossible to convert from ${from} to ${to}.`);
    }

};

let getCountries = async (currency) => {
    let response = await axios.get(`${countriesApiUrl}${currency}`);
    return response.data.map((country) => country.name);
};

let convertCurrency = async (from, to, amount) => {
    let exchangeRate = await getExchangeRate(from, to);
    let countries = await getCountries(to);
    let exchangeAmount = (exchangeRate * amount).toFixed(2);
    let message = `You have ${exchangeAmount} to spend in ${countries.join(', ')}`;
    return message;
}

getExchangeRate('USD', 'CAD').then((rate) => {
    console.log(rate);
});

convertCurrency('USD', 'CAD', 42);