import { useState, useEffect } from "react";
import { generatePDF } from "../utils/generatePDF"; // Import the generatePDF utility

const BillHistory = () => {
  const [bills, setBills] = useState([]);
  const [shopName, setShopName] = useState("");
  const [expandedBillIndex, setExpandedBillIndex] = useState(null);

  // Fetch bills for the logged-in user
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUserEmail = "p@gmail.com"; // Replace with the logged-in user's email
    const accountData = users.find((user) => user.email === loggedInUserEmail);

    if (accountData) {
      setBills(accountData.bills || []);
      setShopName(accountData.shopName || "");
    } else {
      console.error("No user found with email p@gmail.com.");
    }
  }, []);

  // Toggle cart details visibility
  const toggleCartDetails = (index) => {
    setExpandedBillIndex(expandedBillIndex === index ? null : index);
  };

  // Delete a bill
  const deleteBill = (index) => {
    const updatedBills = bills.filter((_, i) => i !== index);
    setBills(updatedBills);

    // Update localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUserEmail = "p@gmail.com"; // Replace with the logged-in user's email
    const accountIndex = users.findIndex((user) => user.email === loggedInUserEmail);
    if (accountIndex !== -1) {
      users[accountIndex].bills = updatedBills;
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  // Generate PDF for a specific bill
  const handleGeneratePDF = (bill) => {
    if (!bill.cartItems || bill.cartItems.length === 0) {
      alert("No items in the cart to generate a PDF.");
      return;
    }

    // Ensure all required fields are present
    const isValid = bill.cartItems.every(
      (item) =>
        item.product &&
        (item.pricePerKg || item.pricePerQuantity) &&
        item.quantityWithUnit &&
        item.totalPrice
    );

    if (!isValid) {
      alert("Invalid cart items. Please check the data.");
      return;
    }

    generatePDF(bill.cartItems, bill.totalAmount, shopName);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-8 px-4">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Bill History</h1>

        {/* Shop Name */}
        <div className="mb-6 text-center">
          <h2 className="text-xl">Welcome to {shopName || "Your Shop"}</h2>
        </div>

        {/* Bills Table */}
        {bills.length > 0 ? (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left">Customer Name</th>
                  <th className="px-6 py-3 text-left">Customer Number</th>
                  <th className="px-6 py-3 text-left">Total Amount</th>
                  <th className="px-6 py-3 text-left">Date</th>
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
                      <button
                        onClick={() => handleGeneratePDF(bill)}
                        className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                      >
                        Create PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Cart Details Dropdown */}
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