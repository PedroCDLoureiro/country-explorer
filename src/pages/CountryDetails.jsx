import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'

function CountryDetails() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        async function getCountry() {
            try {
                const response = await fetch(
                    `https://api.restcountries.com/countries/v5/uuid/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_REST_COUNTRIES_API_KEY}`
                        }
                    }
                )

                if (!response.ok) {
                    throw new Error('Erro ao buscar país')
                }

                const data = await response.json()
                
                setCountry(data.data.objects[0])

            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        getCountry()
    }, [id])

    if(loading) {
        return <p>Carregando...</p>
    }

    if(error) {
        return <p>Erro: {error}</p>
    }

    if(!country) {
        return <p>País não encontrado</p>
    }

    return (
        <main>
            <button onClick={() => navigate(-1)}>
                ← Voltar
            </button>
            <h1>{country.names.common}</h1>
            <img src={country.flag.url_svg} alt={country.flag.description} />
            <p>
                {country.capitals.length > 1 ? 'Capitais' : 'Capital'}:{' '}
                {country.capitals.length > 0
                    ? country.capitals.map((capital) => capital.name).join(', ')
                    : 'Não informada'}
            </p>
            <p>Continentes: {country.continents.length > 0 ? country.continents.join(', ') : 'Não informado'}</p>
            <p>Região: {country.region}</p>
            <p>Subregião: {country.subregion}</p>
            <p>População: {country.population.toLocaleString('pt-BR')}</p>
            <p>Área: {country.area.kilometers.toLocaleString('pt-BR')} km²</p>
            <p>Moeda: {country.currencies.length > 0 ? country.currencies[0].name : 'Não informada'}</p>
            <p>Idiomas: {country.languages.length > 0 ? country.languages.map((lang) => lang.name).join(', ') : 'Não informado'}</p>
        </main>
    )
}

export default CountryDetails