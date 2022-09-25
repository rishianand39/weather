
import styles from "./card.module.css";

const Card = (props) => {
  const milliseconds = props.dt * 1000;
  const dateObject = new Date(milliseconds);
  const day = dateObject.toLocaleString("en-US", { weekday: "long" });

  const link = `http://openweathermap.org/img/wn/${props.weather[0].icon}.png`;
  return (

    // weather details of each day of the week
    <div className={styles.card}>
        <div className={styles.row}>{day}</div>
        <div  className={styles.row}><span> {Math.floor(props?.temp.max)}° </span>&nbsp; {Math.floor(props?.temp.min)}°</div>
        <div  className={styles.row}>
          <img src={link} alt="" />
        </div>
        <div  className={styles.row}>{props.weather[0].main}</div>
    </div>
  )
}

export default Card