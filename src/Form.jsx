import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Form() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';

  try {
    const res = await axios.post(url, formData);
    console.log("Server response:", res.data); //  Debug line

    if (isLogin) {
      if (res.data.success) {
        navigate(`/welcome/${res.data.name}`);
      } else {
        alert(res.data.message); // Invalid Credentials
      }
    } else {
      if (res.data.success) {
        alert(res.data.message); // Registration success
        setIsLogin(true); //  auto-switch to login form
      } else {
        alert(res.data.message); // Already exists
      }
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div className='container'>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
        )}
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
     
      <button onClick={toggleForm}>
        {isLogin ? 'Go to Register' : 'Go to Login'}
      </button>
    </div>
  );
}

export default Form;
