import React, { useState } from 'react';
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { getUser } from '../redux/userS';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // login
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }); 
        dispatch(getUser(res?.data?.user));
        if(res.data.success){
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    } else {
      // signup
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, { name, username, email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }); 
        if(res.data.success){
          setIsLogin(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    }
  }


  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <img className='mx-auto mb-8' width="150px" src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png" alt="twitter-logo" />
        <h2 className="text-3xl font-bold text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border border-gray-300 p-2 rounded w-full" />
              </div>
              <div className="mb-4">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="border border-gray-300 p-2 rounded w-full" />
              </div>
            </>
          )}
          <div className="mb-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border border-gray-300 p-2 rounded w-full" />
          </div>
          <div className="mb-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border border-gray-300 p-2 rounded w-full" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <span className="text-blue-500 cursor-pointer ml-1" onClick={loginSignupHandler}>{isLogin ? "Sign Up" : "Login"}</span>
        </p>
      </div>
    </div>
  );
}

export default Login;