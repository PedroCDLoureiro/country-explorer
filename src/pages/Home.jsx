import { useEffect, useState } from 'react'
import CountryCard from '../components/CountryCard'

function Home() {

    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [region, setRegion] = useState('')
    const [page, setPage] = useState(1)
    const limit = 20
    const offset = (page - 1) * limit
    const [total, setTotal] = useState(0)
    const totalPages = Math.ceil(total / limit)
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getCountries() {
            try{
                const params = new URLSearchParams({
                    limit: limit,
                    offset: offset,
                })

                if (debouncedSearch) {
                    params.set('names.common', debouncedSearch)
                }

                if (region) {
                    params.set('region', region)
                }

                const response = await fetch(
                    `https://api.restcountries.com/countries/v5?${params.toString()}`,
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
                setTotal(data.data.meta.total)

            } catch (error) {
                console.error('Error fetching countries:', error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        getCountries()
    }, [page, debouncedSearch, region])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [search])

    useEffect(() => {
        setPage(1)
    }, [debouncedSearch, region])

    return (
        <main className="home">
            <header className="home-header">
                <h1>Country Explorer</h1>
            </header>

            <section className="filters"> 
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
            </section>

            {loading && <p>Carregando países...</p>}

            {error && <p>Não foi possível carregar os países.</p>}

            {countries.length === 0 && !loading && !error && (
                <p>Nenhum país encontrado.</p>
            )}

            <section className="countries-grid">
                {countries.map((country) => (
                    <CountryCard key={country.uuid} country={country} />
                ))}
            </section>

            {!loading && (
                <div className="pagination">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Anterior
                    </button>

                    <span>
                        Página {page} de {totalPages}
                    </span>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Próxima
                    </button>
                </div>
            )}

        </main>
    )
}

export default Home
