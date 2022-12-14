import { useRef, useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Graph from "../../components/Graph/Graph";
import styles from "./home.module.css";
let key = "7ee8191af8a55b7c086266e3567a76ca";

const Home = () => {
  const ref = useRef();
  const [splitnumber, setSplitnumber] = useState(10);
  const [weekdata, setWeekdata] = useState(null);
  const [currentdata, setCurrentdata] = useState(null);
  const [graphdata, setGraphdata] = useState([]);
  const [hourly, setHourly] = useState(null);
  const [latlong, setLatlon] = useState({
    lat: "",
    lon: "",
  });

  // FETCH LAT & LON WITH CITY NAME 
  function getWeatherData(event) {
    async function fetchByCity() {
      try {
        let res1 = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${event.target.value}&cnt=7&appid=${key}&units=metric`
        );
        let data1 = await res1.json();
        setLatlon({
          lat: data1.city.coord.lat,
          lon: data1.city.coord.lon,
        });
        latlong.lat !== "" && fetchByCoord();
      } catch (error) {
        console.log(error);
      }
    }
    fetchByCity();
  }

  // FETCH DATA WITH LAT & LON
  async function fetchByCoord() {
    try {
      let res2 = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latlong.lat}&lon=${latlong.lon}&appid=${key}&units=metric`
      );
      let data2 = await res2.json();
      setWeekdata(data2.daily);
      setCurrentdata(data2.daily[0]);
      setHourly(data2.hourly);
      let hoursdata = data2?.hourly?.slice(0, 10);
      setGraphdata(hoursdata);
    } catch (error) {
      console.log("err:", error);
    }
  }


  // DATE INTO HUMAN READABLE FORMAT
  function humanReadableTime(data) {
    const milliseconds = data * 1000;
    const dateObject = new Date(milliseconds);
    const readble = dateObject.toLocaleString();
    return readble.split(",")[1];
  }



  // GEOLOCATION
  function getlocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          setLatlon({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        function error(error_message) {
          console.error(`An error has occured while retrieving
        location ${error_message}`);
        }
      );
    } else {
      alert("your browser does not support geolocation");
    }
  }

  const link = `http://openweathermap.org/img/wn/${currentdata?.weather[0].icon}.png`;



  // HANDLING CARD CLICK
  const handleCardClick = (data) => {
    setCurrentdata(data);
    let hourlydata = hourly.slice(splitnumber, splitnumber + 10);
    setSplitnumber((pre) => {
      if (pre >= 40) {
        pre = 0;
      }
      return pre + 10;
    });
    setGraphdata(hourlydata);
  };



  useEffect(() => {
    getlocation();
  }, []);

  useEffect(() => {
    fetchByCoord();
  }, [latlong]);


  
  return (
    <div className={styles.container}>
      {/* searchbox*/}
      <Input refs={ref} onChange={getWeatherData} />

      {/* 7 days cards */}
      {weekdata && (
        <div className={styles.cards}>
          {weekdata.slice(0, 7)?.map((data) => {
            return (
              <Card
                key={data.dt}
                {...data}
                onClick={() => handleCardClick(data)}
              />
            );
          })}
        </div>
      )}

      {/* current day  */}
      {currentdata && (
        <div className={styles.current__day__desc}>
          <div className={styles.current__tem}>
            {Math.floor(currentdata?.temp.day)}?? C{" "}
            <img src={link} alt="" className={styles.icon} />
          </div>

          <div className={styles.graph}>
            <Graph graphdata={graphdata} />
          </div>
          <div>
            <div className={styles.pressure}>
              <div>Pressure</div>
              <div>{currentdata?.pressure} hpa</div>
            </div>
            <div className={styles.humidity}>
              <div>Humidity</div>
              <div>{currentdata?.humidity}%</div>
            </div>
          </div>
          <div className={styles.mountain__like__container}>
            <div className={styles.sunrise__sunset}>
              <div>
                <div>Sunrise</div>
                <div>{humanReadableTime(currentdata?.sunrise)} AM</div>
              </div>
              <div>
                <div>Sunset</div>
                <div>{humanReadableTime(currentdata?.sunset)} PM</div>
              </div>
            </div>
            <div className={styles.sunrise__graph}>
              <img
                src="https://user-images.githubusercontent.com/97423069/192140807-bcf08b6f-3d17-4971-a087-51db4ca4e338.png"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
