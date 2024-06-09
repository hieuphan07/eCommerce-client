import React from 'react';

import classes from './Thead.module.css'

const Thead = () => {
  return (
    <tr className={classes.thead}>
      <th>IMAGE</th>
      <th>PRODUCT</th>
      <th>PRICE</th>
      <th>QUANTITY</th>
      <th>TOTAL</th>
      <th>REMOVE</th>
    </tr>
  )
}

export default Thead