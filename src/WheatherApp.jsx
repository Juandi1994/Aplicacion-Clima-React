import { useState } from "react"

export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'b7de71cea882f125ac71fc1daf959f8d'
    const difKelvin = 273.15


    const [ciudad, setCiuadd] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiuadd(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefautl()
        if (ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
            const data = await response.json()
            setDataClima(data)
        } catch (error) {
            console.error('Ocurrio el siguiente problema: ', error)
        }
    }


    return (
        <div className="container">

            <h1>Aplicacion Del Clima</h1>

            <form onSubmit={handleSubmit}>

                <input type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad} />

                <button type="submit">Buscar</button>

            </form>
            {
                dataClima && (
                    <div>

                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)} Grados Celcius </p>
                        <p>Condicion Metereologica: {dataClima.weather[0].description}</p>
                    </div>
                )
            }

        </div>
    )
}
