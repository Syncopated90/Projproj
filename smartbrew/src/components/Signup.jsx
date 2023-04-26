import React from 'react'
import '../css/App.css';
import {Link} from 'react-router-dom';

const Signup = () => {
  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 className='sign-to-your-account'>Sign in to your account</h1>
        <p>Already have an account yet? <Link to='/' className='underline'>Sign in.</Link></p>
      </div>
      <form>
        <div>
          <label>Email Address</label>
          <input type='email'></input>
        </div>
        <div>
          <label>Password</label>
          <input type='password'></input>
        </div>
        <button>Sign up</button>
      </form>
    </div>
  )
}

export default Signup