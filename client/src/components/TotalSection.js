import React from "react";
import { useSelector } from 'react-redux'


const TotalSection = () => {
  const lineItems = Object.values(useSelector(state => state.lineItem));

  let subTotal = 0;
  let total = 0;
  let taxPrice = 0

  if (lineItems) {
    subTotal = lineItems.reduce((total, item) => {
      return total + Number(item.amount)
    }, 0).toFixed(2);

    taxPrice = (subTotal * 0.05).toFixed(2);

    total = (subTotal * 1.05).toFixed(2);
  }

  return (
    <div className="ui segment">
      <div className="ui grid ">
        <div className="three column row">
          <div className="right floated column padded">
            <div className="ui two column grid">
              <div className="column title">
                <div className="ui">
                  <h4 className="ui right aligned header">
                    Subtotal
                  </h4>
                </div>
              </div>

              <div className="column">
                <div className="ui">
                  <h4 className="ui left aligned header">
                    ${subTotal}
                  </h4>
                </div>
              </div>
            </div>
            <div className="ui two column grid">
              <div className="column">
                <div className="ui">
                  <h4 className="ui right aligned header">
                    Tax (5%)
                  </h4>
                </div>
              </div>
              <div className="column">
                <div className="ui">
                  <h4 className="ui left aligned header">
                    ${taxPrice}
                  </h4>
                </div>

              </div>
            </div>
            <div className="ui two column grid centered">
              <div className="column">
                <div className="ui">
                  <h4 className="ui right aligned header">
                    Total
                  </h4>
                </div>
              </div>
              <div className="column">
                <div className="ui">
                  <h4 className="ui left aligned header">
                    ${total}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default TotalSection;