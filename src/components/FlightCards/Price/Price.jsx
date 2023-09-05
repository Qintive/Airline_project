import React from 'react'

const Price = (props) => {
  return (
    <div>
      Цена перелета: {props.flight.price.total.amount} {props.flight.price.total.currencyCode}
    </div>
    
  )
}

export default Price
