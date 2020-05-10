import React from "react";

const TableLayout = ({ itemContent }) => {
  const printRow = () => {
    return (
      itemContent.map((item, index) => {
        const className = index === 0 ? "seven wide column" : "three wide column";
        return <div className={className} key={item}>{item}</div>
      })
    )
  }

  return (
    <div className="ui grid padded">
      {printRow()}
    </div>
  )
}

export default TableLayout;