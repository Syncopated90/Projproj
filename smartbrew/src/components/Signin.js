import React, { useState } from "react";
import "../css/App.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <div>
        <h1 className="sign-to-your-account">Welcome back, please login to start brewing</h1>
        {/* Signup funktionen */}
        {/*<p>
          Don't have an account yet?{" "}
          <Link to="/signup" className="underline">
            Sign up.
          </Link>
  </p>*/}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-labels">
          <label className="login-labels-text">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="borderp3"
            type="email"
            placeholder="Email"
          ></input>
        </div>
        <div className="login-labels">
          <label className="login-labels-text">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="borderp3"
            type="password"
            placeholder="Password"
          ></input>
        </div>
        <div>
          <button className="button-28">Log in</button>
        </div>
        
      </form>
    </div>
  );
};

export default Signin;
