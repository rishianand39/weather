import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCloud} from '@fortawesome/free-solid-svg-icons'

import styles from "./suggestCard.module.css";
const SuggestCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.location__name}>Dehradun, Uttarakhand</div>
      <div className={styles.weather__desc}>
        <div>
          <div>8° C</div>
          <div >Rain</div>
        </div>
        <div>
        <FontAwesomeIcon icon={faCloud} />
        </div>
      </div>
    </div>
  );
};

export default SuggestCard;
