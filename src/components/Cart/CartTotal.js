import React from 'react'
import { useSelector } from 'react-redux'

import classes from './CartTotal.module.css'

const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "VND",
});

const CartTotal = () => {
  const total = useSelector(state => state.total)

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h3>CART TOTAL</h3>
        <div className={classes.subTotal}>
          <span>SUBTOTAL</span>
          <span>{formatter.format(total)}</span>
        </div>
        <div className={classes.total}>
          <span>TOTAL</span>
          <span>{formatter.format(total)}</span>
        </div>
        <input type='text' placeholder='Enter your coupon' />
        <button>
          <i className='fa fa-gift' /> Apply coupon
        </button>
      </div>
    </div>
  )
}

export default CartTotal