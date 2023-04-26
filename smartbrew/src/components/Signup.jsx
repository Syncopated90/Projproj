import React from 'react'
import '../css/App.css';
import {Link} from 'react-router-dom';

const Signup = () => {
  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 className='sign-to-your-account'>Sign up for an account</h1>
        <p>Already have an account yet? <Link to='/' className='underline'>Sign in.</Link></p>
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
        <button class='button-1'>Sign up</button>
      </form>
    </div>
  )
}

{/*border border-blue bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white*/}
export default Signup