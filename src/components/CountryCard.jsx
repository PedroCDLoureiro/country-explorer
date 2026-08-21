function CountryCard({ country }) {
    return (
        <div className="country-card">
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
        </div>
    )
}

export default CountryCard