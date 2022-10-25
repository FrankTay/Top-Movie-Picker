import { useState, useRef } from 'react'
import { auth } from '../../firebase-config'; 
import { signUpUser } from "../../auth/authFunctions" ;


export default function SignUpModal({closeSignUpModal}) {
  const userNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [errorNotifs, setErrorNotifs] = useState({ userName:"",
                                         email:"",  
                                         password:"", })
  const [isRequired, setIsRequired] = useState({ required: false })



  const registerUser = async (e) => {
    e.preventDefault();
    // TODO: check for username already taken
    //TODO:check for email already taken
    

    // check password meets minimum length
    if (passwordRef.current.value.length < 6) {
      console.log('password too short')
      return setErrorNotifs((prev) => ({ ...prev, password: " Password should be at least 6 characters"}))
    }
    // check for same typed passwords
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      console.log('inconsist pass')
      return setErrorNotifs((prev) => ({ ...prev, password: "Passwords do not match"}))
    }

    signUpUser(auth, emailRef.current.value, passwordRef.current.value);
    closeSignUpModal();
  }

  return (
    <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Sign Up
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeSignUpModal}
                  >
                    <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <form 
                onSubmit={registerUser}
                className="bg-white rounded px-8 pt-6 pb-1 mb-4"
                >
                  {/* <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                      Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ref={userNameRef} id="username" {...isRequired} type="text" placeholder="Username"/>
                    <p className="password-message text-red-500 text-xs italic">{errorNotifs.userName}</p>
                  </div> */}
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      Email Address
                    </label>
                    <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ref={emailRef} id="email" {...isRequired} type="email" placeholder="Email" />
                    <p className="email-message text-red-500 text-xs italic">{errorNotifs.email}</p>
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ref={passwordRef} id="password" {...isRequired} type="password" placeholder="" />
                    <p className="password-message text-red-500 text-xs italic">{errorNotifs.password}</p>
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                     Confirm Password
                    </label>
                    <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ref={passwordConfirmRef} id="password-confirm" {...isRequired} type="password" placeholder="" />
                    <p className="confirm-password-message text-red-500 text-xs italic">{errorNotifs.password}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                      Register
                    </button>
                    {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                      Forgot Password?
                    </a> */}
                  </div>
                </form>
                
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={closeSignUpModal}
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          //TODO: figure out click on overlay to close modal
          <div onClick={ () => console.log("overlay clicked")} className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>

  );
}
