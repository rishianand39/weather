import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faLocationDot, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

import styles from "./input.module.css"
import SuggestCard from "../SuggestCard/SuggestCard"
const Input = ({onChange}) => {
  return (
    <>
    {/* search box here */}
    <div className={styles.input__container}>
      <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
      <input onChange={onChange} type="text" placeholder='search city'/>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
    </div>

    {/*search suggestion here */}
    {/* <div className={styles.suggestions__container}>
        <SuggestCard />
        <SuggestCard />
        <SuggestCard />
      </div> */}
    </>
  )
}

export default Input