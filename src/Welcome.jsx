import React from 'react'
import './App.css';
import { useParams } from 'react-router-dom';

function Welcome() {
  const { name } = useParams();

  return (
    <div className="welcome-container">
      <h2>Welcome, {name} </h2>
      <p>You have successfully logged in.</p>
    </div>
  );
}

export default Welcome;

 

