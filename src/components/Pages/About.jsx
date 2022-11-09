import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/fontawesome-free-brands'
export default function About() {

  const github = <FontAwesomeIcon icon={faGithub} />

  return (
    <div className=" flex justify-center my-3">

      <div className="bg-white shadow-lg hover:shadow-xl w-8/12 rounded-md overflow-hidden">

        <div className="p-6 shadow-lg rounded-lg bg-gray-100 text-gray-700">
          <h2 className="font-semibold text-3xl mb-5">Welcome</h2>
          <p>

            Want to watch <a className='underline' href='https://www.imdb.com/chart/top/?ref_=nv_mv_250'>one of the greatest movies of all time</a>, but can't decide where to start?
            Let the wheel choose for you. Sign up to keep track of all the films you've already watched.
          </p>
          <hr className="my-6 border-gray-300" />
          <p>
            Please check out my other projects @ TODO: insert github link here. 
          </p>
          <button
            type="button"
            className="inline-block px-6 py-2.5 mt-4 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
          <a href='#'>Source code</a>
          </button>
        </div>
      </div>
    </div>
  )
}
