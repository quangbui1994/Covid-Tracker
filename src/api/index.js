import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async country => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        const { data: { confirmed, deaths, recovered, lastUpdate }} = await axios.get(changeableUrl);
        return { confirmed, deaths, recovered, lastUpdate }; 
    } catch (e) {

    }
}

export const fetchDataDaily = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map(el => ({
            confirmed: el.confirmed.total,
            deaths: el.deaths.total,
            date: el.reportDate
        }));
        return modifiedData;
    } catch (e) {

    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map(country => country.name);
    } catch (e) {

    }
}