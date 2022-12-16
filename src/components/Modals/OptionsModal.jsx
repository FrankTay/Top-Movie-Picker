import { useContext } from 'react'
import ToggleSwitch from "./OptionsComponents/ToggleSwitch"
import {RemoveWatchedFromWheelContext} from "../../contexts/Contexts"

export default function OptionsModal({closeOptionsModal,setShowOptionsModal}) {

    const removeWatchedFromWheelState = useContext(RemoveWatchedFromWheelContext);
    const {removeWatchedFromWheel, setRemoveWatchedFromWheel} = removeWatchedFromWheelState;
  return (
    <>
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl ">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200  rounded-t">
            <h3 className="text-3xl font-semibold">
              User options
            </h3>
            
            <button
              className="p-1 ml-auto border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={closeOptionsModal}
            >
              {/* <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none"> */}
                &times;
              {/* </span> */}
            </button>
          </div>
          {/*body*/}

          <div 
            className="bg-white rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4 max-w-md">
              <p className="block text-gray-700 text-sm font-bold mb-2 " >
                    Remove watched films from wheel
              </p>
              <div className="flex justify-start">
                <ToggleSwitch
                    removeWatchedFromWheel={removeWatchedFromWheel}
                    setRemoveWatchedFromWheel={setRemoveWatchedFromWheel}
                />
              </div>
            
              
            </div>
            
           
          </div>
          
          {/*footer*/} 
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={closeOptionsModal}
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
