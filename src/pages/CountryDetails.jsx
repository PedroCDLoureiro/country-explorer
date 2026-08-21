import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'

import '../assets/css/CountryDetails.css'

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
        <main className="country-details">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Voltar
            </button>

            <section className="country-details-content">
                <div className="country-details-flag">
                    {country.flag?.url_svg ? (
                        <img
                            src={country.flag.url_svg}
                            alt={country.flag.description || `Bandeira de ${country.names.common}`}
                        />
                    ) : (
                        <div className="country-card-no-flag">
                            Bandeira não disponível
                        </div>
                    )}
                </div>
                <div className="country-details-info">
                    <h1>{country.names.common}</h1>
                    <p>
                        <strong>
                        {country.capitals.length > 1 ? 'Capitais' : 'Capital'}:{' '}
                        </strong>
                        {country.capitals.length > 0
                            ? country.capitals.map((capital) => capital.name).join(', ')
                            : 'Não informada'}
                    </p>
                    <p><strong>Continentes: </strong>{country.continents.length > 0 ? country.continents.join(', ') : 'Não informado'}</p>
                    <p><strong>Região: </strong>{country.region}</p>
                    <p><strong>Subregião: </strong>{country.subregion}</p>
                    <p><strong>População: </strong>{country.population.toLocaleString('pt-BR')}</p>
                    <p><strong>Área: </strong>{country.area.kilometers.toLocaleString('pt-BR')} km²</p>
                    <p><strong>Moeda: </strong>{country.currencies.length > 0 ? country.currencies[0].name : 'Não informada'}</p>
                    <p><strong>Idiomas: </strong>{country.languages.length > 0 ? country.languages.map((lang) => lang.name).join(', ') : 'Não informado'}</p>
                </div>
            </section>
        </main>
    )
}

export default CountryDetails