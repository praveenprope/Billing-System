import { useState, useEffect } from "react";

const BillHistory = () => {
  const [bills, setBills] = useState([]);
  const [shopName, setShopName] = useState(""); // Store shop name
  const [expandedBillIndex, setExpandedBillIndex] = useState(null);

  useEffect(() => {
    // Fetch users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Find the user by email
    const accountData = users.find((user) => user.email === "p@gmail.com");

    if (accountData) {
      setBills(accountData.bills || []); // Set bills if present
      setShopName(accountData.shopName || ""); // Set the shop name from the logged-in user
    } else {
      console.error("No user found with email p@gmail.com.");
    }
  }, []);

  const toggleCartDetails = (index) => {
    setExpandedBillIndex(expandedBillIndex === index ? null : index); // Toggle dropdown visibility
  };

  const deleteBill = (index) => {
    const updatedBills = bills.filter((_, i) => i !== index); // Remove the selected bill
    setBills(updatedBills);

    // Update the localStorage data
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const accountIndex = users.findIndex((user) => user.email === "p@gmail.com");
    if (accountIndex !== -1) {
      users[accountIndex].bills = updatedBills;
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-8 px-4">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Bill History</h1>

        {/* Display Shop Name */}
        <div className="mb-6 text-center">
          <h2 className="text-xl">Welcome to {shopName || "Your Shop"}</h2>
        </div>

        {bills.length > 0 ? (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left">Customer Name</th>
                  <th className="px-6 py-3 text-left">Customer Number</th>
                  <th className="px-6 py-3 text-left">Total Amount</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Items</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="px-6 py-3">{bill.customerName}</td>
                    <td className="px-6 py-3">{bill.customerNumber}</td>
                    <td className="px-6 py-3">₹{bill.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-3">{bill.date}</td>
                    <td className="px-6 py-3">
                      <ul className="list-disc pl-5">
                        {bill.cartItems.map((item, i) => (
                          <li key={i}>
                            {item.product} - {item.quantityWithUnit} - ₹
                            {item.totalPrice.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-3 flex gap-2">
                      <button
                        onClick={() => toggleCartDetails(index)}
                        className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                      >
                        {expandedBillIndex === index ? "Hide Cart" : "Show Cart"}
                      </button>
                      <button
                        onClick={() => deleteBill(index)}
                        className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Dropdown for showing cart data */}
            {expandedBillIndex !== null && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Cart Details</h3>
                <table className="min-w-full bg-gray-700 text-white">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left">Product</th>
                      <th className="px-6 py-3 text-left">Quantity</th>
                      <th className="px-6 py-3 text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills[expandedBillIndex].cartItems.map((item, i) => (
                      <tr key={i} className="border-b border-gray-600">
                        <td className="px-6 py-3">{item.product}</td>
                        <td className="px-6 py-3">{item.quantityWithUnit}</td>
                        <td className="px-6 py-3">₹{item.totalPrice.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-400 mt-6">No bills found.</p>
        )}
      </div>
    </div>
  );
};

export default BillHistory;
