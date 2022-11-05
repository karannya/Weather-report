
import React, { useEffect, useState } from "react";
import axios from "axios";

function Weather({ inputdata }) {
    const [data, setData] = useState([]);
    const api_Key = process.env.REACT_APP_API_KEY;
    const api_Url = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${inputdata.Key}?apikey=${api_Key}`
    console.log(inputdata.Key)
    
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(api_Url)
                return (setData(response.data),
                console.log(response.data))
            } catch (err) {
                console.log('Error occured when fetching data');
            }
        }
        getData();
    }, [api_Url, inputdata.Key]);


    const timeC = data?.DailyForecasts && (new Date(data.DailyForecasts[0].Date)).toISOString().split('T')[1].split(':')[0]
    const isDay = timeC > 6 && timeC < 20

    return (
        <div> {(
            <h3 className='city'>
                {inputdata.EnglishName} <sup className='country'>{inputdata.Country.ID}</sup>
            </h3>)}
            <h3 className="weather-details">max {Math.ceil((5 / 9) * ((data?.DailyForecasts && data.DailyForecasts[0].Temperature.Maximum.Value) - 32))}&deg;C
                min {Math.ceil((5 / 9) * ((data?.DailyForecasts && data.DailyForecasts[0].Temperature.Minimum.Value) - 32))}&deg;C</h3>
                {/* {timeC} */}
               {(isDay===true)
                ? <>
                    {console.log('day')}
                    <img className="img"
                        src={data?.DailyForecasts && `./images/${data.DailyForecasts[0].Day.Icon}.png`} alt="Weather img" />
                    <h3 className="IconPhrase">{data?.DailyForecasts && data.DailyForecasts[0].Day.IconPhrase}</h3>
                </>
                :
                <>
                    {console.log('night')}
                    <img className="img"
                        src={data?.DailyForecasts && `./images/${data.DailyForecasts[0].Night.Icon}.png`} alt="Weather img" />

                    <h3 className="IconPhrase">{data?.DailyForecasts && data.DailyForecasts[0].Night.IconPhrase}</h3>
                </>
            }

        </div>
    )

}

export default Weather