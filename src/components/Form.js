import React, { useState } from 'react'
import axios from "axios";

import Weather from './Weather';

function Form() {
  const [inputdata, setInputData] = useState('')
  const [cityInfo, setcityInfo] = useState([])

  const api_Key = process.env.REACT_APP_API_KEY;
  const api_Url = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_Key}&q=${cityInfo}`;

  const showData = async() => {
    try {
  const response= await axios.get(api_Url)
      return (setInputData(response.data[0]),  
      setcityInfo('') )
    } catch(error){
      console.log(error)
      }  
  }

  const checkData = (event) => {
    setcityInfo(event.target.value);
  }

  return (
    <>
      <div className='main-div'>
        <div className='card-container'>
          <div className='img-container'>
            {inputdata === undefined
              ? <>
                <h2>Data not found</h2>
                <button className='try-btn' onClick={() => setInputData('')}>try again</button>
              </>
              :
              <>
                <div className='card-header'>
                  <input type='search' value={cityInfo} placeholder='Enter the name of a city'
                    className='inputdatafield'
                    onChange={checkData} />
                  <button type='submit' onClick={showData} className='weather-btn'>Show</button>
                </div>
              </>
            }
            <div className='card-body'>
              {inputdata && <Weather inputdata={inputdata} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Form



