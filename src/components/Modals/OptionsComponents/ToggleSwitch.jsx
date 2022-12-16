import React from 'react'

export default function ToggleSwitch({removeWatchedFromWheel, setRemoveWatchedFromWheel}) {

    
  return (
    <>
        <div className="flex items-center justify-center w-full mb-12">
        
            <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                <div className="relative">
                <input onChange={() => setRemoveWatchedFromWheel(prev => !prev)} type="checkbox" id="toggleB" checked={removeWatchedFromWheel} className="option-toggle sr-only"/>
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                </div>
                
            </label>

        </div>
    </>
  )
}
