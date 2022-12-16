import { useState, useContext, useEffect } from 'react'
import { UserContext, MovieListContext, WatchedList } from '../../contexts/Contexts';
import LoginModal from '../Modals/LoginModal';

import LoadingSpinner from '../Other/LoadingSpinner';
import { modifyWatchedList, getWatchedList} from '../../auth/authFunctions';
import { auth } from '../../firebase-config'; 
import '../../App.css'


export default function List() {
  const userState = useContext(UserContext)
  const user = userState.user
  const watchedListState = useContext(WatchedList)
  const watchedList = watchedListState.watchedList
  const setWatchedList = watchedListState.setWatchedList
  const movieListData = useContext(MovieListContext)
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [checkStates, setCheckStates] = useState(Array(movieListData.length).fill(false).map((item, index) =>
    watchedList.includes(movieListData[index].id) ? true : false
  )); 

  const closeLoginModal = () => {
    setShowLoginModal(false);
  }


  const checkBoxAction = (e, elIndex) => {
    const updatedCheckedState = checkStates.map((item, index) =>
      index === elIndex ? !item : item
    );

    setCheckStates(updatedCheckedState);
   
    const toggleStatus = e.target.checked;
    const movieIndex = Number(e.target.dataset.index);
    const movieId = movieListData[movieIndex].id
    const currentUser = auth?.currentUser?.displayName;
    const currentEmail = auth?.currentUser?.email
    const action = toggleStatus ? "ADD" : "REMOVE";

    modifyWatchedList(currentUser, currentEmail, movieId, action)
    .then(() => {
      const latestList = getWatchedList(currentUser)
        .then(list => {
          setWatchedList(list) 
      })
    })
  }
  
  const movieEntries = movieListData.map((movie,i) => 
    <tr key={movie.id} className="border-t first:border-t-0 flex p-1 md:p-3 hover:bg-gray-100 md:table-row flex-col w-full flex-wrap">
      <td className="p-1 md:p-3">
 
        {user === "pending" ? <LoadingSpinner /> : 
          //!user ?  <div className="tooltip left"> <input className="w-6 h-6" disabled={true} type="checkbox"/></div> :

          !user ?  <div className="cb-container"> <input id={`cb${i}`} className="cb w-6 h-6 ml-6" disabled onClick={() => setShowLoginModal(true)} type="checkbox" /><label onClick={() => setShowLoginModal(true)} className='cb-label tooltip' htmlFor={`cb${i}`} >Log in to track</label></div> :
          <input className="w-6 h-6 ml-6" onChange={(e) => checkBoxAction(e,i)} data-index={i} checked={checkStates[i]} type="checkbox"/> 
        } 
        
        <span className='cell-screen-list-watched-text ml-3 text-sm'>Watched?</span>
      </td>
      <td className='list-img'>
      {/* {!movie.image} */}
        <img className="w-16" src={movie.image}/>
      </td>
      <td className="p-1 md:p-3">
        <p className="text-center">{movie.rank}</p>
      </td>
      <td className="p-1 md:p-3 ">
        <a className="text-center" href={`https://www.imdb.com/title/${movie.id}`} target='_blank' >
          <div>{movie.fullTitle}</div>
        </a>
      </td>
      <td className="text-right p-1 md:p-3">
      
      </td>
    </tr>
  )

  useEffect(() => {

    setCheckStates(Array(movieListData.length).fill(false).map((item, index) =>
    watchedList.includes(movieListData[index].id) ? true : false
    ));
    
  }, [watchedList]);


  return (
    <>
      <div className='list-container m-3'>
        <div className=" flex justify-center">
          <div className="bg-white shadow-lg hover:shadow-xl w-8/12 rounded-md">
            <table className="table flex table-auto w-full leading-normal">
              <thead className="uppercase text-gray-600 text-xs font-semibold w-full bg--200 border-b-4 border-maroon-500">
                <tr className="hidden w-full md:table-row text-base">
                  <th className="text-left p-3">
                    <p>Watched?</p>
                  </th>
                  <th className="text-left">
                    <p className="invisible">Poster</p>
                  </th>
                  <th className="text-center pr-5">
                    <p>Rank</p>
                  </th>
                  <th className=" p-3">
                    <p>Title</p>
                  </th>           
                </tr>
              </thead>
              <tbody className="flex-1 text-gray-700 sm:flex-none">
                { movieEntries}
              </tbody>
            </table>
          </div>
        </div>
        <div className="border-2">
        </div>
      </div> 
      {showLoginModal ? <LoginModal closeLoginModal={closeLoginModal}/> : null}
    </>
  )
}
