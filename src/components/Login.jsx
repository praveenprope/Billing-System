import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

// Utility function to get users from localStorage
const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = getFromLocalStorage('users'); // Fetch all users from localStorage
    const user = users.find((user) => user.email === email); // Find the user by email

    if (user && user.password === password) {
      onLogin(user); // Pass the user object to the parent component (App)
      navigate('/billing'); // Navigate to Billing System after successful login
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white flex items-center justify-center">
      <div className="w-full max-w-md border border-gray-700 rounded-lg p-8 bg-gray-800 shadow-xl animate__animated animate__zoomIn animate__delay-1s">
        <h2 className="text-4xl font-extrabold text-center text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Login
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg">
              <AiOutlineMail className="text-white p-3" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="w-full flex items-center bg-gray-800 border border-gray-700 rounded-lg">
              <AiOutlineLock className="text-white p-3" />
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                autoComplete="current-password"
              />
            </div>
            <button
              type="button"
              onClick={handleTogglePasswordVisibility}
              className="ml-2 bg-gray-700 text-white p-2 rounded-md"
            >
              {passwordVisible ? (
                <AiFillEyeInvisible className="text-2xl" />
              ) : (
                <AiFillEye className="text-2xl" />
              )}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
