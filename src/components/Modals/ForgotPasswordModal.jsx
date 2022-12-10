import { useState, useRef } from 'react'
import { auth } from '../../firebase-config'; 
// import { auth } from "firebase/auth";
import { forgotPassword } from "../../auth/authFunctions" ;

export default function ForgotPasswordModal({closeFPModal}) {
  const emailRef = useRef()
  const [loading, setLoading] = useState(false);
  const [responseNotif, setResponseNotif] = useState({ success:"", error:""})

  const sendResetEmail = async(e) => {
    e.preventDefault();
    const emailInput = emailRef.current.value.trim();
    if (!emailInput){
      setResponseNotif({ success:"", error:"Please input a valid email address"});
      return
    }

    setLoading(true)
   
    if (emailInput) forgotPassword(auth, emailInput).then((res) => {
      emailRef.current.value = "";   
      setResponseNotif({ success:`Reset password email sent to ${emailInput}. Please check your spam folder just in case.`, error:""});  
    })
    .catch((error) => {
      const errMsg = { success:"", error:`User "${emailInput}" not found`};
      setResponseNotif(errMsg);
      
    })
    setLoading(false)
    return

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
              Forgot Password
            </h3>
            
            <button
              className="p-1 ml-auto border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={closeFPModal}
            >
              {/* <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none"> */}
                &times;
              {/* </span> */}
            </button>
          </div>
          {/*body*/}

          <form 
            className="bg-white rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={sendResetEmail}
          >
            <div className="mb-4 max-w-md">
              <p className="block text-gray-700 text-sm font-bold mb-2 text-center" >
                Tell us the email address associated with your account, and we’ll send you an email with a link to reset your password.
              </p>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ref={emailRef} id="username" type="email" placeholder="Email"/>
              
            </div>
            
            <div className="flex justify-center">
              <button className="flex items-center justify-between bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 my-3 rounded focus:outline-none focus:shadow-outline text-white" type="submit">
                {loading &&
                  <span className='inline-block'><div className="w-5 h-5 mr-2 rounded-full animate-spin
                  border-2 border-solid border-white-500 border-t-transparent"></div></span>
                
                }
                <div>Reset Password</div>
              </button>
       
            </div>
            <p className="email-message text-red-500 text-md italic text-center">{responseNotif.error}</p>
            <p className="email-message text-green-500 text-md italic text-center mx-auto max-w-sm">{responseNotif.success}</p>
          </form>
          
          {/*footer*/} 
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={closeFPModal}
            >
              Close
            </button>
            
            
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}
