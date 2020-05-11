import React from "react";
import { connect } from "react-redux";
import InvoiceForm from "./form";
import { createInvoice } from "../../actions";


class CreateInvoice extends React.Component {
  onSubmit = (formValues) => {
    this.props.createInvoice(formValues);
  }
  renderConfirmMsg = () => {
    if (this.props.invoice.length === 0) {
      return null
    } else {
      return (
        <div className="ui bottom attached warning message">
          <i className="save icon"></i>
          This invoice is saved.
        </div>
      )
    }
  }
  render() {
    return (
      <div>
        <div className="ui grid">
          <div className="two column row">
            <div className="eight wide column">
              <h2 className="ui header column">Create Invoice</h2>
            </div>
          </div>
        </div>
        <InvoiceForm onSubmit={this.onSubmit} />
        {this.renderConfirmMsg()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { invoice: Object.values(state.invoice) }
}

export default connect(mapStateToProps, { createInvoice })(CreateInvoice);