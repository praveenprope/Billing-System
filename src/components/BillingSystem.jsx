import { useState } from "react";

// Initialize localStorage with a default user
const initializeLocalStorage = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const defaultUser = {
    email: "p@gmail.com",
    shopName: "Your Shop",
    bills: [],
  };

  // Check if the user already exists
  if (!users.find((user) => user.email === "p@gmail.com")) {
    users.push(defaultUser);
    localStorage.setItem("users", JSON.stringify(users));
  }
};

// Call this function when the app loads
initializeLocalStorage();

const BillingSystem = ({ shopName }) => {
  const [product, setProduct] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [pricePerQuantity, setPricePerQuantity] = useState("");
  const [quantityWithUnit, setQuantityWithUnit] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  // Add items to the cart
  const addToCart = () => {
    if (!product || (!pricePerKg && !pricePerQuantity) || !quantityWithUnit) {
      alert("Please enter valid product details.");
      return;
    }

    let totalPrice = 0;
    if (pricePerKg) {
      // Calculate total price based on price per kg
      if (quantityWithUnit.toLowerCase().includes("kg")) {
        const quantity = parseFloat(quantityWithUnit) || 0;
        totalPrice = parseFloat(pricePerKg) * quantity;
      } else if (quantityWithUnit.toLowerCase().includes("g")) {
        const quantity = parseFloat(quantityWithUnit) / 1000 || 0;
        totalPrice = parseFloat(pricePerKg) * quantity;
      } else {
        alert("Please enter quantity in Kg or G for price per Kg.");
        return;
      }
    } else if (pricePerQuantity) {
      // Calculate total price based on price per quantity
      const quantity = parseFloat(quantityWithUnit) || 0;
      totalPrice = parseFloat(pricePerQuantity) * quantity;
    } else {
      alert("Please enter either Price per Kg or Price per Quantity.");
      return;
    }

    const newItem = {
      product,
      pricePerKg: pricePerKg ? parseFloat(pricePerKg) : 0, // Ensure it's a number
      pricePerQuantity: pricePerQuantity ? parseFloat(pricePerQuantity) : 0, // Ensure it's a number
      quantityWithUnit,
      totalPrice, // Ensure it's a number
    };

    setCartItems((prevItems) => [...prevItems, newItem]);
    setTotalAmount((prevTotal) => prevTotal + totalPrice);

    // Clear input fields
    setProduct("");
    setPricePerKg("");
    setPricePerQuantity("");
    setQuantityWithUnit("");
  };

  // Delete an item from the cart
  const deleteCartItem = (index) => {
    const newCartItems = [...cartItems];
    const itemToRemove = newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    setTotalAmount((prevTotal) => prevTotal - itemToRemove[0].totalPrice);
  };

  // Save the bill to localStorage
  const saveBill = () => {
    if (!customerName || !customerNumber || cartItems.length === 0) {
      alert("Please fill out all fields and add items to the cart.");
      return;
    }

    const bill = {
      customerName,
      customerNumber,
      cartItems,
      totalAmount,
      date: new Date().toLocaleString(),
    };

    // Fetch users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUserEmail = "p@gmail.com"; // Replace with the logged-in user's email
    const userIndex = users.findIndex((user) => user.email === loggedInUserEmail);

    if (userIndex !== -1) {
      // User exists, update their bills
      const user = users[userIndex];
      user.bills = user.bills || []; // Ensure bills array exists
      user.bills.push(bill); // Add the new bill
      users[userIndex] = user; // Update the user data
    } else {
      // User does not exist, create a new user
      const newUser = {
        email: loggedInUserEmail,
        shopName: "Your Shop",
        bills: [bill],
      };
      users.push(newUser);
    }

    // Save updated users back to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Bill saved successfully:", bill); // Debugging
    alert("Bill saved successfully!");

    // Clear cart and reset state
    setCartItems([]);
    setTotalAmount(0);
    setCustomerName("");
    setCustomerNumber("");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          {shopName ? `Welcome to ${shopName}` : "General Store Billing System"}
        </h1>

        {/* Customer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="customerName" className="block text-lg font-medium mb-2">
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="customerNumber" className="block text-lg font-medium mb-2">
              Customer Number
            </label>
            <input
              type="text"
              id="customerNumber"
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
              placeholder="Enter customer number"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Product Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="productName" className="block text-lg font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Enter product name"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="productPricePerKg" className="block text-lg font-medium mb-2">
              Price per Kg
            </label>
            <input
              type="number"
              id="productPricePerKg"
              value={pricePerKg}
              onChange={(e) => {
                setPricePerKg(e.target.value);
                setPricePerQuantity(""); // Clear price per quantity if price per kg is entered
              }}
              placeholder="Enter price per Kg"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="productPricePerQuantity" className="block text-lg font-medium mb-2">
              Price per Quantity
            </label>
            <input
              type="number"
              id="productPricePerQuantity"
              value={pricePerQuantity}
              onChange={(e) => {
                setPricePerQuantity(e.target.value);
                setPricePerKg(""); // Clear price per kg if price per quantity is entered
              }}
              placeholder="Enter price per quantity"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="productQuantity" className="block text-lg font-medium mb-2">
              Quantity (Kg or G)
            </label>
            <input
              type="text"
              id="productQuantity"
              value={quantityWithUnit}
              onChange={(e) => setQuantityWithUnit(e.target.value)}
              placeholder="Enter quantity (Kg or G)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mb-6">
          <button
            onClick={addToCart}
            className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add to Cart
          </button>
        </div>

        {/* Cart Items */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Cart</h2>
          <ul>
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-700 p-3 mb-2 rounded-lg"
              >
                <span>{item.product} - {item.quantityWithUnit}</span>
                <span>₹{item.totalPrice.toFixed(2)}</span>
                <button
                  onClick={() => deleteCartItem(index)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Total Amount and Save Bill Button */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Total Amount: ₹{totalAmount.toFixed(2)}</h3>
          <button
            onClick={saveBill}
            className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingSystem;