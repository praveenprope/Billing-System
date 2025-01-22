import { useState } from 'react';
import { saveToLocalStorage } from '../utils/localStorageUtils'; // Correct import
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import 'animate.css';

const CreateAccount = ({ onAccountCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [shopName, setShopName] = useState('');

  const handleCreateAccount = () => {
    const accountData = { name, email, password, shopName };
    saveToLocalStorage('users', accountData); // Save the account data to localStorage
    onAccountCreated(accountData); // Set the user in the app
    // Redirect to Billing System after account creation
    window.location.href = '/billing';
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const isPasswordValid = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white flex items-center justify-center">
      <div className="w-full max-w-sm border border-gray-700 rounded-lg p-8 bg-gray-800 shadow-xl animate__animated animate__zoomIn animate__delay-1s">
        <h2 className="text-4xl font-extrabold text-center text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Create Account
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Shop Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Shop Name</label>
            <input
              type="text"
              placeholder="Enter your shop name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Password Field with Eye Button */}
          <div className="mb-6 flex items-center">
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              type="button"
              onClick={handleTogglePasswordVisibility}
              className="ml-2 mt-7 bg-gray-700 text-white p-2 rounded-md"
            >
              {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          {/* Password Validation Message */}
          <div className="mb-4">
            {!isPasswordValid(password) && password.length > 0 && (
              <p className="text-red-500 text-xs">
                Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.
              </p>
            )}
          </div>

          {/* Create Account Button */}
          <button
            onClick={handleCreateAccount}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
            disabled={!isPasswordValid(password)}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;