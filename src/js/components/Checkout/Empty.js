import React from 'react'

export default class Empty extends React.Component {

  render() {

    return(
      <tr className="empty">
        <td colSpan="5">
          <p>Your cart is empty.</p>
        </td>
      </tr>
    );
  }
}
