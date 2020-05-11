import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import Layouts from "../Layouts/TableLayout";
import TotalSection from "../TotalSection";

import {
  addItem,
  deleteItem,
  editItem,
} from "../../actions";


let lineItemId = 0;
const WAIT_INTERVAL = 300;

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedId: 1, onChanged: false }
  }

  /*
   ::event handler::
   handleChange()
     => getting calculated amount val through InvoiceForm state
     => change name = amount input value for form submission ;
     => update lineItems state for total/ subtotal calculation;
   createNewLineItem()
     => create new line item by pushing new object to lineItems state
   deleteItem()
     => delete object from lineItems state
     => reset input values to zero
   selectedLineItem()
     => get selected input id and assign class to it
*/
  handleChange(id, e) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const amount = this.renderAmount(`Qty${id}`, `price${id}`);
      this.props.change(`amount${id}`, amount);
      this.props.editItem({ id, amount })
    }, WAIT_INTERVAL);
  }

  createNewLineItem = () => {
    lineItemId++
    this.props.addItem({ id: lineItemId, amount: 0 });
  }

  deleteItem = (id) => {
    this.props.deleteItem(id);
    [`amount${id}`, `price${id}`, `Qty${id}`].forEach((item) => {
      this.props.change(item, 0);
    })
  }

  selectedLineItem = (id) => {
    this.setState({ selectedId: id });
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  /*
  ::number Calculator::
  renderAmount() : Render calculated value
  calAmount(): times two numbers
*/
  renderAmount = (qty, price) => {
    let amount = 0
    if (this.props.inputs) {
      if (this.props.inputs.values) {
        const qtyVal = this.props.inputs.values[qty] || 0;
        const priceVal = this.props.inputs.values[price] || 0;
        amount = this.calAmount(qtyVal, priceVal);
      }
    }
    return amount.toFixed(2);
  }

  calAmount = (num1, num2) => {
    const amount = num1 * num2
    return amount
  }

  // render input element style
  renderInput = ({ input, type, meta }) => {
    let className = "three wide column";

    if (type === "text") className = "seven wide column"
    if (type === "hidden") className = "hidden"
    return (
      <div className={className}>
        <div className="ui fluid big input">
          <input
            {...input}
            type={type}
          />
        </div>
      </div>
    );
  }

  // iterate lineItem states to render list Item
  itemList = () => {
    if (!this.props.lineItems) {
      return null
    } else {
      return (
        this.props.lineItems.map(({ id }) => {
          const selectedClass = this.state.selectedId === id ? "inverted blue" : null
          return (
            <div className={`ui secondary segment ${selectedClass}`} key={id} onClick={() => this.selectedLineItem(id)}>
              <div className="ui secondary">
                <div className="ui grid " >
                  <Field name={`Name${id}`} type="text" component={this.renderInput} />
                  <Field name={`Qty${id}`} id={id} type="number" component={this.renderInput} onChange={(e) => this.handleChange(id, e)} />
                  <Field name={`price${id}`} type="number" component={this.renderInput} onChange={(e) => this.handleChange(id, e)} />
                  <div className="three wide column">
                    <div className="ui two column grid">
                      <Field name={`amount${id}`} type="hidden" component={this.renderInput} />
                      <div className="column"><h3>{this.renderAmount(`Qty${id}`, `price${id}`)}</h3></div >
                      <div className="column"><i className="trash icon" onClick={() => this.deleteItem(id)} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )
    }
  }


  render() {
    return (
      <form className="ui segments" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Layouts itemContent={["Item", "Qty", "Price", "Total"]} />
        {this.itemList()}

        <div className="ui center aligned segment" >
          <button className="ui labeled icon button secondary" onClick={
            (e) => {
              e.preventDefault();
              e.stopPropagation();
              this.createNewLineItem();
            }
          }>
            <i className="plus circle icon"></i>
            Add an Item
        </button>
        </div>

        <TotalSection />
        <div className="ui right aligned segment">
          <button className="ui right blue labeled icon button ">
            <i className="right arrow icon" />
            Save and Continue
              </button>
        </div>
      </form>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    inputs: state.form.InvoiceForm,
    lineItems: Object.values(state.lineItem),
  }
}


const InvoiceFormWrapper = reduxForm(
  {
    form: 'InvoiceForm'
  },

)(InvoiceForm)


export default connect(mapStateToProps, { addItem, deleteItem, editItem })(InvoiceFormWrapper)
