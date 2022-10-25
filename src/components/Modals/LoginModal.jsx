import { useState, useRef } from 'react'
import { auth } from '../../firebase-config'; 
import { loginUser } from "../../auth/authFunctions" ;

export default function LoginModal({closeLoginModal}) { 
  const emailRef = useRef()
  const passwordRef = useRef()
  const [loading, setLoading] = useState(false);
  const [errorNotifs, setErrorNotifs] = useState({ userName:"",
                                         email:"",  
                                         password:"", })

  const loginUserFunc = async (e) => {
    e.preventDefault();
    setLoading(true)
    let attemptLogin = await loginUser(auth, emailRef.current.value.trim(), passwordRef.current.value)
      .then(response => {
        // closeLoginModal();
        // console.log(response?.email)
        switch (response) {
          case "auth/invalid-email":
            console.log("bad email")
            setErrorNotifs(prev => ({ userName:"", email: "Incorrect Email", password:""}))
            setLoading(false)

            break;
          case "auth/wrong-password":
            console.log("bad password")
            setErrorNotifs(prev => ({ userName:"", email: "", password: "Incorrect Password"}))
            setLoading(false)

            break
          default:
            setLoading(false)
            closeLoginModal();

        }
        


        // result.email
      })
      
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
                    Log In
                  </h3>
                  
                  <button
                    className="p-1 ml-auto border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeLoginModal}
                  >
                    <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <form 
                  className="bg-white rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={loginUserFunc}
                >
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                      Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ref={emailRef} id="username" type="text" placeholder="Email"/>
                    <p className="email-message text-red-500 text-xs italic">{errorNotifs.email}</p>

                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" ref={passwordRef} id="password" type="password" placeholder="" />
                    <p className="password-message text-red-500 text-xs italic">{errorNotifs.password}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="flex items-center justify-between bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white" type="submit">
                      {loading &&
                        <span className='inline-block'><div className="w-5 h-5 mr-2 rounded-full animate-spin
                        border-2 border-solid border-white-500 border-t-transparent"></div></span>
                      
                      }
                      <div>Sign in</div>
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                      Forgot Password?
                    </a>
                  </div>
                </form>
                
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeLoginModal}
                  >
                    Close
                  </button>
                  
                  
                </div>
              </div>
            </div>
          </div>
          <div  onClick={ () => console.log("overlay clicked")} className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>

  );
}
