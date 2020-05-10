import React from "react";
import CreateInvoice from "./Invoices/CreateInvoice"

import "./generalStyle.css"

class App extends React.Component {

  render() {
    return (
      <div className="ui container" >
        <div className="ui raised very padded text container segment">
          <CreateInvoice />
        </div>
      </div >
    )
  }
}

export default App;