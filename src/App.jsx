import { useEffect, useState } from 'react'
import './App.css'
import CountryCard from './components/CountryCard'

function App() {

    const [countries, setCountries] = useState([])
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        getCountries()
    }, [])

    return (
        <main>
            <h1>Country Explorer</h1>

            {loading && <p>Carregando países...</p>}
            {error && <p>Não foi possível carregar os países.</p>}

            {countries.map((country) => (
                <CountryCard key={country.uuid} country={country} />
            ))}
        </main>
    )
}

export default App
