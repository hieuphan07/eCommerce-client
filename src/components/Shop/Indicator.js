import React from 'react'

import classes from './Indicator.module.css'

const Indicator = () => {
  return (
    <>
      <div className={classes['indicator-container']}>
        <div className={classes.indicator}>
          <button><i className='fa fa-angle-double-left' /></button>
          <span>1</span>
          <button><i className='fa fa-angle-double-right' /></button>
        </div>
      </div>
      <div className={classes['indicator-info']}>
        <span>Showing 1-9 of 9 results</span>
      </div>
    </>
  )
}

export default Indicator