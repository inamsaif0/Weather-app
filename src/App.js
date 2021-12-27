import { useState } from 'react';
import './App.css';


const api = {
  key: "5b4fa1637f1b79b7b23373c9a38da410",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query, setquery] = useState('');
  const [weather, setweather] = useState({});
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=matric&APPID=${api.key}`)
        .then(res => res.json())
        .then(results => {
          console.log(results);
          setweather(results);
          setquery('');
        }
        )
    }
  }
  const datebuilder = (d) => {
    let months = ["january", "Faburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
  return (

    <div className='app'>
      <main>
        <div className='search-box'>
          <input
            type="text"
            className='search-bar'
            placeholder='Search...'
            onChange={e => setquery(e.target.value)}
            value={query}
            onKeyPress={search}
          >
          </input>
          {(typeof weather.main != "undefined")?(
            <div>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{datebuilder(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.main.temp)}°C
            </div>
            <div className='weather'>
              Sunny
            </div>

          </div>
          </div>
          ):('')};
        </div>
      </main>
    </div>

  );
}

export default App;
