import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useUser } from '../context/UserContext';
import toast from 'react-hot-toast';

const Login = () => {
  const {user,setUser}=useUser()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location=useLocation()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/login', {
        email,
        password
      });
      if (response.data.success) {
        
        setUser(response?.data?.user)
      } else {
        console.error('Login failed:', response.data.message);
        // alert('Invalid credentials');
        toast.error("Invalid Credentials")
      }
    } catch (error) {
      console.error('Login error:', error);
      //alert('An error occurred during login.');
      toast.error("Something went wrong !!")
    }
  };
  useEffect(()=>{
    if(user)
    {
      navigate(location?.state ?? "/")
    }
  },[user])
  return (

   <section className="w-screen bg-gray-50 ">
   <div className="flex w-screen h-[calc(100vh-5rem)] flex-col items-center justify-center p-2 md:px-6 md:py-8 mx-auto lg:py-0">
   <div className="flex flex-col h-max mt-10 rounded-md shadow-xl items-center sm:max-w-md w-full mx-auto border justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto w-full md:max-w-md">
        <img
          alt="CodingMindSet"
          src="/codingMindSet.png"
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto w-full">
        <form onSubmit={handleLogin} className="space-y-6 ">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#164c60] sm:text-sm sm:leading-6 max-w-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-[#164c60] hover:text-[#164c60]/70">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#164c60] sm:text-sm sm:leading-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#164c60] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#164c60]/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="/register" className="font-semibold leading-6 text-[#164c60] hover:text-[#164c60]/70">
            Create an account
          </a>
        </p>
      </div>
    </div>
   </div>
 </section>
  );
};

export default Login;
