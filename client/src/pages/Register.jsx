import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    room_id: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);

      navigate('/dashboard');
    } catch (error) {
      console.error(error);

      alert('Register failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816] px-4">
      <div className="w-full max-w-md bg-[#0b1220] border border-cyan-900 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">
          Create Account
        </h1>

        <p className="text-gray-400 mb-8">Register your smart outlet account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="
              w-full
              bg-[#050816]
              border
              border-cyan-900
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-cyan-400
            "
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="
              w-full
              bg-[#050816]
              border
              border-cyan-900
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-cyan-400
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="
              w-full
              bg-[#050816]
              border
              border-cyan-900
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-cyan-400
            "
          />

          <input
            type="number"
            name="room_id"
            placeholder="Room ID"
            onChange={handleChange}
            className="
              w-full
              bg-[#050816]
              border
              border-cyan-900
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-cyan-400
            "
          />

          <button
            type="submit"
            className="
              w-full
              bg-cyan-500
              hover:bg-cyan-600
              transition
              rounded-xl
              py-3
              font-semibold
              text-black
            "
          >
            Register
          </button>
        </form>

        <p className="text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
