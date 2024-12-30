import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => (
  <nav className="bg-gray-900 text-white p-4 shadow-lg">
    <div className="max-w-screen-xl mx-auto flex justify-between items-center">
      <div className="text-2xl font-bold">My Store</div>

      {/* Navbar Links */}
      <div className="space-x-6 hidden sm:flex">
        {/* <Link to="/" className="hover:text-indigo-500 transition duration-300">Home</Link> */}
        <Link to="/billing" className="hover:text-indigo-500 transition duration-300">Billing</Link>
        <Link to="/bill-history" className="hover:text-indigo-500 transition duration-300">Bill History</Link>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300 hidden sm:block"
      >
        Logout
      </button>

      {/* Mobile Menu (Hamburger) */}
      <div className="sm:hidden">
        <button className="text-white" onClick={() => { /* Add mobile menu toggle logic here */ }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
