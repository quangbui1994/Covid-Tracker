import React, { useEffect, useState } from 'react';
import { FormControl, NativeSelect } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';

const CountryPicker = ({ countryChangeHandler }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchCountries());
        };

        fetchAPI();
    }, []);

    return (
        <div className={styles.formControl}>
            <FormControl fullWidth>
                <NativeSelect defaultValue="" onChange={e => countryChangeHandler(e.target.value)}>
                    <option value="">Global</option>
                    {countries.map(country => <option key={country} value={country}>{country}</option>)}
                </NativeSelect>
            </FormControl>
        </div>
    )
};

export default CountryPicker;