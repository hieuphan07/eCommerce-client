import classes from './Footer.module.css'

import DUMMY_FOOTER from '../../dummyData/dummyFooter.json'


const Footer = ({ footerData }) => {
  return (
    <footer className={classes.footer}>
      <ul>

        {/* Main title */}
        {Object.keys(DUMMY_FOOTER).map(key => <li key={key}>
          <h4>{key}</h4>
          <ul>

            {/* Children content */}
            {DUMMY_FOOTER[key].map(curr => <li key={curr.id}>
              {curr.title}
            </li>)}

          </ul>
        </li>)}

      </ul>
    </footer>
  )
}

export default Footer;