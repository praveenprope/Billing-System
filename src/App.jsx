import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import BillingSystem from "./components/BillingSystem";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BillHistory from "./components/BillHistory"; // Import BillHistory component

const App = () => {
  const [user, setUser] = useState(null);
  const [shopName, setShopName] = useState(""); // State to hold shopName
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Check if there's a logged-in user in localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser); // Set the user from localStorage if available
    }

    // Retrieve shopName from localStorage and set it in the state
    const storedShopName = localStorage.getItem("shopName");
    if (storedShopName) {
      setShopName(storedShopName); // Set shopName if found
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData); // Set the logged-in user
    localStorage.setItem('loggedInUser', JSON.stringify(userData)); // Save user data in localStorage
  };

  const handleAccountCreated = (userData) => {
    setUser(userData); // Set the new account user
    localStorage.setItem('loggedInUser', JSON.stringify(userData)); // Save new user in localStorage
  };

  const handleLogout = () => {
    setUser(null); // Clear the user state
    localStorage.removeItem('loggedInUser'); // Remove the user from localStorage
    navigate("/"); // Redirect to Home page after logout
  };

  return (
    <>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Login route */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Create Account route */}
        <Route
          path="/create-account"
          element={<CreateAccount onAccountCreated={handleAccountCreated} />}
        />

        {/* Billing route */}
        <Route
          path="/billing"
          element={
            <>
              <Navbar onLogout={handleLogout} /> {/* Pass handleLogout to Navbar */}
              <BillingSystem user={user} shopName={shopName} /> {/* Pass shopName to BillingSystem */}
              <Footer />
            </>
          }
        />

        {/* Bill History route */}
        <Route
          path="/bill-history"
          element={
            <>
              <Navbar onLogout={handleLogout} /> {/* Show Navbar on this page */}
              <BillHistory user={user} shopName={shopName} /> {/* Pass user and shopName to BillHistory */}
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;
