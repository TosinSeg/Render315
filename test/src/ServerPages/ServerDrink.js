import React from 'react'

const ServerDrink = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const str = createItem();
    props.onSubmit(e, str);
  }

  return (
    <div>
      <div id="OrderButtonMenu">
        <div id="Drink">
          <label htmlFor="drinks" class="dropdown-choices-label">Drink:</label>
          <select name="drinks" id="drinks" class="dropdown-choices">
            <option value="no_drink">--Select An Option--</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
      </div>
      <div id="OrderList">
      </div>
      <form id="BottomRow" onSubmit={handleSubmit}>
        <button type="submit" id="AddToOrder">Add to Order</button>
      </form>
    </div>
  )
}

function createItem() {
  let order = "Drink*" + document.getElementById("drinks").value + "|";
  // alert(order);
  return order;
}
export default ServerDrink