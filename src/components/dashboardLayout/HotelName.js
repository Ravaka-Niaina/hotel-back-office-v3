import styles from './HotelName.module.css';

export default function HotelName () {
  return <span className={styles.hotelName}>
  Hotel géré: {localStorage.getItem('hotelName')}
  </span>
}