const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://bmi-calculator6.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'bmi-calculator6.p.rapidapi.com',
        'Content-Type': 'application/json',
    },
});

module.exports = instance;
