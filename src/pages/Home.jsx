import { useEffect, useState } from 'react'
import CountryCard from '../components/CountryCard'

function Home() {

    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
    const [region, setRegion] = useState('')
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getCountries() {
            try{
                const response = await fetch(
                    'https://api.restcountries.com/countries/v5?limit=100',
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

    const filteredCountries = countries.filter((country) => {

        // Filtro de pesquisa

        const searchFilter = country.names.common.toLowerCase().includes(search.toLowerCase())

        // Filtro de região
        const regionFilter = region === '' || country.region === region

        return searchFilter && regionFilter
    })

    return (
        <main>
            <h1>Country Explorer</h1>

            <input 
                type="text" 
                placeholder="Pesquisar país" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
            >
                <option value="">Todas as regiões</option>
                <option value="Africa">África</option>
                <option value="Americas">Américas</option>
                <option value="Asia">Ásia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceania</option>
            </select>

            {loading && <p>Carregando países...</p>}
            {error && <p>Não foi possível carregar os países.</p>}

            {filteredCountries.map((country) => (
                <CountryCard key={country.uuid} country={country} />
            ))}

            {filteredCountries.length === 0 && !loading && !error && (
                <p>Nenhum país encontrado.</p>
            )}

        </main>
    )
}

export default Home
