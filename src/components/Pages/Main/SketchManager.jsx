import { useState, useEffect, useContext } from 'react'
// import { ReactP5Wrapper } from "react-p5-wrapper";

import '../../../App.css'
import MovieInfo from './MovieInfo.jsx';
import NewSketch from './NewSketch';
import * as helper from "../../../assets/js/helpers";
import AllMovieData from "../../../testing/movie-data";
import { WatchedList, MovieListContext, RemoveWatchedFromWheelContext } from '../../../contexts/Contexts';



function SketchManager() {
    const watchedListState = useContext(WatchedList);
    const watchedList = watchedListState.watchedList;
    const setWatchedList = watchedListState.setWatchedList;
    const removeWatchedFromWheelState = useContext(RemoveWatchedFromWheelContext);
    const {removeWatchedFromWheel} = removeWatchedFromWheelState;

    const full250List = useContext(MovieListContext);
    const [spinCount, setSpinCount] = useState(0);
    const [landedNum, setLandedNum] = useState("");
    const [spinState, setSpinState] = useState(false);
    const [IMDBmovieData, setMovieData] = useState({});
    const [TMDBmovieData, setTMDBMovieData] = useState({});
    const [streamProviders, setStreamProviders] = useState({});
    const [backdropImgPath, setBackdropImgPath] = useState("");
    const [watchedRemovedMovieList, setWatchedRemovedMovieList] = useState(full250List.filter((elem,i) => !watchedList.includes(elem.id)));
    const rootImgPath = "https://image.tmdb.org/t/p/original";
    const fadeClass = (!spinState) ? "fade-in-bg" : "fade-out";

    const onSpinStart = (numExpected) => {
      //TODO: prevent spin again until complete
      setLandedNum(numExpected)
      setSpinState(true)
      //TODO: Replace with fetch func to server
      let listToSearch = (removeWatchedFromWheel) ? watchedRemovedMovieList : full250List;
      const {id:IMDBId, title, year, rank, image, crew, imDbRating} = listToSearch[numExpected]//AllMovieData.items[numExpected-1]
      setMovieData(prev => ({ ...prev, IMDBId, title, year, rank, image, crew, imDbRating}))
      
      const endpoints = { 
        detailsFromIMDBIdQueryURL: `https://api.themoviedb.org/3/find/${IMDBId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&external_source=imdb_id`,
        // detailsFromTMDB: `https://api.themoviedb.org/3/movie/${TMDBId}?api_key=62a86f710896a3a012c01ff88125c8e8&language=en-US`,
      }

      //get general movie info from query based on IMDB id
      helper.fetchData(endpoints.detailsFromIMDBIdQueryURL)
        .then(data => {
          //TODO: refactor and remove this line
          const {backdrop_path:bdPath, id:TMDBId} = data.movie_results[0];
          setTMDBMovieData(data.movie_results[0])
          setBackdropImgPath(rootImgPath+bdPath)
          const detailsFromTMDBURL = `https://api.themoviedb.org/3/movie/${TMDBId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`;

        // console.log(data.movie_results[0])
          // get general movie info from query of TMDB id
        return helper.fetchData(detailsFromTMDBURL)
        })
        .then(data => {
          setTMDBMovieData(prev => ({...prev,data}))
          const watchProvidersEndpoint = `https://api.themoviedb.org/3/movie/${data.id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
          // console.log(data)
        return helper.fetchData(watchProvidersEndpoint)
        })
        .then(watchData => {
          // console.log(watchData?.results?.US)
          setStreamProviders(watchData?.results?.US)
        })
        .catch(error => {
          console.log(`there was an error - ${error}`)
        })


        //TODO:
    // get genre, mpaa rating, languages
    // starting + pics?
    // Streaming options

  };

  const onSpinComplete = () => {
    setSpinCount(prev => prev + 1)
    setSpinState(false)
  }

  useEffect(()=>{
    setWatchedRemovedMovieList(full250List.filter((elem,i) => !watchedList.includes(elem.id)));
  },[full250List,watchedList, removeWatchedFromWheel])
// })

    return (
        <>
          <div 
            className={`main-backdrop ${fadeClass}`}
            style={(!spinState && window.innerWidth > 859) ? { backgroundImage: `url(${backdropImgPath})`}: null}
            // style={ {backgroundImage: `url(${backdropImgPath})`}}
          ></div>
          
            <main className="App-container">
                <div className='sketch'>
                  <NewSketch 
                    onSpinStart={onSpinStart}
                    onSpinComplete={onSpinComplete}
                    full250List={full250List}
                    watchedList={watchedList}
                    watchedRemovedMovieList={watchedRemovedMovieList}
                    removeWatchedFromWheel={removeWatchedFromWheel}
                  />
                </div>
                {/* <div className='phone-breakpoint-btn'>
                  
                </div> */}
                <div className='results'>
                  
                  {(!spinState && spinCount > 0) ? <MovieInfo 
                      IMDBmovieData={IMDBmovieData}
                      TMDBmovieData={TMDBmovieData}
                      streamProviders={streamProviders}
                      spinState={spinState}                                        
                  /> : null}
                </div>
                

            </main>
        </>

    )
}

export default SketchManager
