import { useState, useContext, useEffect } from 'react'
import { UserContext, MovieListContext, WatchedList } from '../../contexts/Contexts'; 
import LoadingSpinner from '../Other/LoadingSpinner';
import { addToWatchedList, removeFromWatchedList } from '../../auth/authFunctions';

export default function List() {
  const userState = useContext(UserContext)
  const user = userState.user
  const watchedList = useContext(WatchedList)
  const movieListData = useContext(MovieListContext)
  const [checkStates, setCheckStates] = useState(Array(movieListData.length).fill(false).map((item, index) =>
  watchedList.includes(movieListData[index].id) ? true : false
  )); 


  const checkBoxAction = (e, elIndex) => {
    const updatedCheckedState = checkStates.map((item, index) =>
      index === elIndex ? !item : item
    );

    setCheckStates(updatedCheckedState);
   
    const toggleStatus = e.target.checked;
    const movieIndex = Number(e.target.dataset.index);
    const movieId = movieListData[movieIndex].id
    if (toggleStatus){
      addToWatchedList(user.displayName, user.email, movieId)
    }
    else {
      removeFromWatchedList(user.displayName, user.email, movieId)
    }
    
  }
  
  const movieEntries = movieListData.map((movie,i) => 
    <tr key={movie.id} className="border-t first:border-t-0 flex p-1 md:p-3 hover:bg-gray-100 md:table-row flex-col w-full flex-wrap">
      <td className="p-1 md:p-3">
       {!user ? <LoadingSpinner /> :
          <input onChange={(e) => checkBoxAction(e,i)} data-index={i} checked={checkStates[i]} type="checkbox"/> 
          }
      </td>

      <td >
      {!movie.image}
        <img className="w-1/2" src={movie.image}/>
      </td>
      <td className="p-1 md:p-3">
        <p>{movie.rank}</p>
      </td>
      <td className="p-1 md:p-3 ">
        <a href={`https://www.imdb.com/title/${movie.id}`} target='_blank' >
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
    

//     const unsubscribe = auth.onAuthStateChanged(userData => {
//       if (userData) {
//         setLocalUserData(userData)
//         getWatchedList(userData.displayName)
//         .then((list) => {
//           if (list){
//             setWatchedList(list)
//             // setCheckStates(movieListData.map(elem => {
//             //   if (list.includes(elem.id)) return true
//             //     return false
//             // }))
//           }
//         })
//       }
//     })

//     return () => {
// //       unsubscribe();
//     };
  // });
}, [watchedList]);

// console.log(movieListData)

  return (
    <>
      <div className='list-container'>
        <div className=" flex justify-center">
          <div className="bg-white shadow-lg hover:shadow-xl w-8/12 rounded-md overflow-hidden">
            <table className="table flex table-auto w-full leading-normal">
              <thead className="uppercase text-gray-600 text-xs font-semibold w-full bg--200 border-b-4 border-green-500">
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
    </>
  )
}
