import React from 'react'

const ServerCheese = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const str = createItem();
    props.onSubmit(e, str);
  }

  return (
    <div>
      <div id="OrderButtonMenu">
        <div id="Sauce">
          <label htmlFor="sauces">Sauce:</label>
          <select name="sauces" id="sauces">
            <option value="Red Sauce" selected>Red Sauce</option>
            <option value="White Sauce">White Sauce</option>
            <option value="Zesty Red Sauce">Zesty Red Sauce</option>
          </select>
        </div>
        <div id="AddOn_Drink">
          <label htmlFor="addon_drinks">Drink:</label>
          <select name="addon_drinks" id="addon_drinks">
            <option value="no_drink">--Select An Option--</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div id="Crust">
          <label htmlFor="crusts">Crust:</label>
          <select name="crusts" id="crusts">
            <option value="Regular Crust" selected>Regular</option>
            <option value="Cauliflower Crust">Cauliflower</option>
          </select>
        </div>

      </div>
      <div id="OrderList">
      </div>
      <form id="BottomRow" onSubmit={handleSubmit}>
        <button type="submit">Add to Order</button>
      </form>
    </div>
  )
}

function createItem() {
  let order = "Cheese*" + document.getElementById("sauces").value + "*" + document.getElementById("crusts").value + "*" + document.getElementById("addon_drinks").value + "|";
  // alert(order);
  return order;
}

export default ServerCheese