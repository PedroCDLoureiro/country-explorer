import {Link} from 'react-router'

function CountryCard({ country }) {
    return (
        <div className="country-card">
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
            <div className="country-card-content">
                <h2>{country.names.common}</h2>
                {country.capitals.length === 0 && (
                    <p>Capital: Não informada</p>
                )}

                {country.capitals.length === 1 && (
                    <p>Capital: {country.capitals[0].name}</p>
                )}

                {country.capitals.length > 1 && (
                    <p>
                        Capitais: {country.capitals
                            .map((capital) => capital.name)
                            .join(', ')}
                    </p>
                )}
                <p>Região: {country.region}</p>
                <p>População: {country.population.toLocaleString()}</p>
                <Link
                    className="details-button"
                    to={`/country/${country.uuid}`}
                >
                    Ver detalhes
                </Link>
            </div>
        </div>
    )
}

export default CountryCard