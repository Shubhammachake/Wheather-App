import axios from "axios";
import { useState } from "react";
import sunnyImage from "./sunnyImage.jpg";
import humidity from "./humidity.png";

let style = {
  main: {
    width: "80%",
    height: "600px",

    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage: `url(${sunnyImage})`,
    backgroundSize: "cover",
  },
  upper: {
    marginTop: "10px",
  },
  middle: {
    marginTop: "120px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "300px",
  },
  lower: {
    display: "flex",
    justifyContent: "space-around",

    width: "800px",
    marginTop: "100px",
    height: "70px",
    alignItems: "center",
  },
  inp: {
    height: "37px",
    width: "300px",
    borderRadius: "15px",
    border: "3px solid blue",
    textAlign: "center",
  },
};

function App(props) {
  const [Data, setData] = useState({
    city: "",
    cont: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFetchData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${Data.city}&appid=dd7883fe865e3b8c03563135766403b1`;

    axios
      .get(url)
      .then((res) => {
        const tempInCelsius = (res.data.main.temp - 273.15).toFixed(2);
        const TempMin = (res.data.main.temp_min - 273.15).toFixed(2);
        const TempMax = (res.data.main.temp_max - 273.15).toFixed(2);
        console.log(res.data);
        setData((pre) => ({
          ...pre,
          cont: [
            {
              name: res.data.name,
              temp: tempInCelsius,
              weather: res.data.weather[0].description,
              humidity: res.data.main.humidity,
              pressure: res.data.main.pressure,
              windSpeed: res.data.wind.speed,
              TempMin: TempMin,
              TempMax: TempMax,
            },
          ],
        }));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="main" style={style.main}>
      <div className="upper" style={style.upper}>
        <input
          onChange={(e) => handleChange(e)}
          name="city"
          className="inp"
          style={style.inp}
          placeholder="Enter City Name"
        />
        <button onClick={handleFetchData}>Search City</button>
      </div>

      {Data.cont.map((item, index) => (
        <>
          <div key={index} className="middle" style={style.middle}>
            <h2> City: {item.name}</h2>

            <h2> Temperature: {item.temp}°C</h2>
            <p>{item.weather}</p>
            <p>{item.weather[0].icon}</p>
          </div>
          <div className="lower" style={style.lower}>
            <img src={`${humidity}`} alt="error" />
            <p>Humidity: {item.humidity}%</p>

            <p>Pressure: {item.pressure}(hPa)</p>

            <p> Wind Speed: {item.windSpeed} m/s</p>
            <p>Min Temp :{item.TempMin}°C</p>
            <p>Max Temp :{item.TempMax}°C</p>
          </div>
        </>
      ))}
    </div>
  );
}

export default App;
