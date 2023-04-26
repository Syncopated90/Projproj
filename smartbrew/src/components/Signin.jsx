import React from 'react'
import '../css/App.css';
import {Link} from 'react-router-dom';

const Signin = () => {
  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 className='sign-to-your-account'>Sign in to your account</h1>
        <p>Don't have an account yet? <Link to='/signup' className='underline'>Sign up.</Link></p>
      </div>
      <form>
        <div className='login-labels'>
          <label className='login-labels-text'>Email Address</label>
          <input className='borderp3' type='email'></input>
        </div>
        <div className='login-labels'>
          <label className='login-labels-text'>Password</label>
          <input className='borderp3' type='password'></input>
        </div>
        <button class='button-1'>Sign In</button>
      </form>
    </div>
  )
}

export default Signin