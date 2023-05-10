import React, { useState } from "react";
import "../css/App.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <div>
        <h1 className="sign-to-your-account">Sign up for an account</h1>
        <p>
          Already have an account yet?{" "}
          <Link to="/" className="underline">
            Sign in.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-labels">
          <label className="login-labels-text">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="borderp3"
            type="email"
          ></input>
        </div>
        <div className="login-labels">
          <label className="login-labels-text">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="borderp3"
            type="password"
          ></input>
        </div>
        <button class="button-1">Sign up</button>
      </form>
    </div>
  );
};

{
  /*border border-blue bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white*/
}
export default Signup;
