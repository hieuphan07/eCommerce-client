import React from 'react'

import classes from './MainContentBanner.module.css'

const MainContentBanner = () => {
  return (
    <div className={classes.banner}>
      <input type='text' placeholder='Enter Search Here!' />
      <select>
        <option>Default sorting</option>
      </select>
    </div>
  )
}

export default MainContentBanner