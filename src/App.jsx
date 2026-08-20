import { useEffect, useState } from 'react'
import './App.css'

function App() {

    const [countries, setCountries] = useState([])
    
    console.log(countries);

    useEffect(() => {
        async function getCountries() {
            try{
                const response = await fetch(
                    'https://api.restcountries.com/countries/v5',
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_REST_COUNTRIES_API_KEY}`
                        }
                    }
                )
    
                if(!response.ok) {
                    throw new Error('Erro ao buscar países')
                }
    
                const data = await response.json()
                setCountries(data.data.objects)

            } catch (error) {
                console.error('Error fetching countries:', error)
            }
        }

        getCountries()
    }, [])

    return (
        <main>
            <h1>Country Explorer</h1>
            {countries.map((country) => (
                <p key={country.uuid}>{country.names.common}</p>
            ))}
        </main>
    )
}

export default App
