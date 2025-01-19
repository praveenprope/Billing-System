import React from 'react';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-12 bg-cover bg-center perspective">
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-6xl font-bold mb-6 transform hover:rotate-3 hover:scale-105 transition duration-500">
          Welcome to the Billing System
        </h1>
        <p className="text-lg opacity-90 mb-10 transform hover:translate-x-2 hover:scale-110 transition duration-500">
          Manage your bills and customers with ease. Sign in or create an account to get started.
        </p>
      </div>
      <div className="flex gap-8">
        <a
          href="/login"
          className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-lg shadow-2xl transition duration-500 transform hover:scale-110 hover:shadow-glow animate-float"
        >
          <FaSignInAlt className="text-xl group-hover:rotate-12 transition duration-500" />
          <span className="group-hover:text-gray-800">Login</span>
        </a>
        <a
          href="/create-account"
          className="group flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg transition duration-500 transform hover:scale-110"
        >
          <FaUserPlus className="text-xl transition duration-500" />
          <span>Create Account</span>
        </a>
      </div>
    </div>
  );
};

export default Home;
