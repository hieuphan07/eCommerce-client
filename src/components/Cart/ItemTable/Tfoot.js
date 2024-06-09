import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Tfoot.module.css'

const Tfoot = () => {
  const cartItems = useSelector(state => state.cartItems);

  const navigate = useNavigate();

  const goToShop = (e) => {
    e.preventDefault();
    navigate('/shop');
  }
  
  const goToCheckout = (e) => {
    e.preventDefault();
    navigate('/cart/checkout');
  }


  return (
    <tr className={classes.tfoot}>
      <th
        colSpan='3'
        align='left'>
        <span onClick={goToShop}>
          <i className='fa fa-long-arrow-left' /> Continue shopping
        </span>
      </th>
      <th
        colSpan='3'
        align='right'>
        {cartItems.length !== 0 && <span onClick={goToCheckout}>
          Proceed to checkout <i className='fa fa-long-arrow-right' />
        </span>}
      </th>
    </tr>
  )
}

export default Tfoot