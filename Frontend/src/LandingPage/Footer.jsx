import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <>
        <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.footer_col}>
          <h4>company</h4>
          <ul>
            <li>
              <a href="#">about us</a>
            </li>
            <li>
              <a href="#">our services</a>
            </li>
            <li>
              <a href="#">privacy policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </div>
        <div className={styles.footer_col}>
          <h4>get help</h4>
          <ul>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Buying Guide</a>
            </li>
            <li>
              <a href="#">Calculate Mortage</a>
            </li>
          </ul>
        </div>
        <div className={styles.footer_col}>
          <h4>Explore Properties</h4>
          <ul>
            <li>
              <a href="#">Residential</a>
            </li>
            <li>
              <a href="#">Commercial</a>
            </li>
            <li>
              <a href="#">Luxury</a>
            </li>
            <li>
              <a href="#">Rentals</a>
            </li>
          </ul>
        </div>
        <div className={styles.footer_col}>
          <h4>follow us</h4>
          <div className={styles.social_links}>
            <a href="#">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#">
              <i className="fab fa-twitter" />
            </a>
            <a href="#">
              <i className="fab fa-instagram" />
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
    </>
  )
}

export default Footer