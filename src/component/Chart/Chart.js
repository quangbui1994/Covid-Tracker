import React, { useState, useEffect } from 'react';
import { fetchDataDaily } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [dataDaily, setDataDaily] = useState([]);

    useEffect(() => {
        const getDataDaily = async () => {
            setDataDaily(await fetchDataDaily());
        }

        getDataDaily();
    }, []);

    const lineChart = (
        dataDaily.length 
            ? <Line
                data={{
                    labels: dataDaily.map(data => data.date),
                    datasets: [
                        {
                            data: dataDaily.map(data => data.confirmed),
                            label: 'Infected',
                            fill: true,
                            borderColor: '#3333ff'
                        }, 
                        {
                            data: dataDaily.map(data => data.deaths),
                            label: 'Deaths',
                            fill: true,
                            borderColor: 'red',
                            backgroundColor: 'rgba(225,0,0,.5)'
                        }
                    ]
                }}
                /> 
            : null
    )

    const barChart = (
        confirmed 
            ? <Bar 
                data={{
                    labels: ['Infected', 'Deaths', 'Recovered'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(0,0,255,.5)', 'rgba(255,0,0,.5)', 'rgba(0,255,0,.5)'],
                        data: [confirmed.value, deaths.value, recovered.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` }
                }}/>
            : null
    )

    return (
        <div className={styles.container}>{country ? barChart : lineChart}</div>
    )
};

export default Chart;