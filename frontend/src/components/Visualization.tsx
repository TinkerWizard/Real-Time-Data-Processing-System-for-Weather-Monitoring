import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Forecast {
    temp: number[];
    min: number[];
    max: number[];
}

export const Visualization: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const [delhiForecast, setDelhiForecast] = useState<Forecast | undefined>();
    const [mumbaiForecast, setMumbaiForecast] = useState<Forecast | undefined>();
    const [kolkataForecast, setKolkataForecast] = useState<Forecast | undefined>();
    const [chennaiForecast, setChennaiForecast] = useState<Forecast | undefined>();
    const [bengaluruForecast, setBengaluruForecast] = useState<Forecast | undefined>();
    const [hyderabadForecast, setHyderabadForecast] = useState<Forecast | undefined>();
    
    const [currentCityForecast, setCurrentCityForecast] = useState<Forecast | undefined>();
    
    const [currentCity, setCurrentCity] = useState<string>("Delhi");

    // Handle city forecast change
    useEffect(() => {
        const storedCity = localStorage.getItem("city") ?? "Delhi";
        setCurrentCity(storedCity);
    })
    useEffect(() => {
        const storedCity = localStorage.getItem("city") ?? "Delhi";
        // alert(storedCity);
        setCurrentCity(storedCity);

        if (storedCity === "Delhi") {
            setCurrentCityForecast(delhiForecast);
        } else if (storedCity === "Mumbai") {
            setCurrentCityForecast(mumbaiForecast);
        } else if (storedCity === "Chennai") {
            setCurrentCityForecast(chennaiForecast);
        } else if (storedCity === "Bengaluru") {
            setCurrentCityForecast(bengaluruForecast);
        } else if (storedCity === "Hyderabad") {
            setCurrentCityForecast(hyderabadForecast);
        } else if (storedCity === "Kolkata") {
            setCurrentCityForecast(kolkataForecast);
        }
    }, [delhiForecast, mumbaiForecast, kolkataForecast, chennaiForecast, bengaluruForecast, hyderabadForecast, currentCity]);

    // Fetch dataset once and store it
    useEffect(() => {
        async function fetchDataset() {
            try {
                const response = await fetch('http://localhost:3000/fetch-forecast');
                const data = await response.json();

                if (response.ok) {
                    setDelhiForecast(data.delhiTemp);
                    setMumbaiForecast(data.mumbaiTemp);
                    setKolkataForecast(data.kolkataTemp);
                    setChennaiForecast(data.chennaiTemp);
                    setBengaluruForecast(data.bengaluruTemp);
                    setHyderabadForecast(data.hyderabadTemp);
                } else {
                    alert("Failed to fetch forecast data: " + data.message);
                }
            } catch (error) {
                console.error("Error fetching forecast data:", error);
                alert("An error occurred while fetching the forecast.");
            }
        }

        fetchDataset();
    }, []); // Run only once on mount

    // Create chart when currentCityForecast changes
    useEffect(() => {
        if (currentCityForecast && chartRef.current) {
            const myChart = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: ['00', '03', '06', '09', '12', '15', '18', '21', '24'],
                    datasets: [
                        {
                            label: 'Temperature',
                            data: currentCityForecast?.temp || [],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 1)',
                            fill: false,
                        },
                        {
                            label: 'Min Temperature',
                            data: currentCityForecast?.min || [],
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 1)',
                            fill: false,
                        },
                        {
                            label: 'Max Temperature',
                            data: currentCityForecast?.max || [],
                            borderColor: 'rgba(54, 162, 235, 1)',
                            backgroundColor: 'rgba(54, 162, 235, 1)',
                            fill: false,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Temperature (°C)',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Time (hours)',
                            },
                        },
                    },
                },
            });

            return () => {
                myChart.destroy(); // Cleanup chart on unmount
            };
        }
    }, [currentCityForecast]); // Redraw chart when current forecast data changes

    return <canvas ref={chartRef} />;
};
