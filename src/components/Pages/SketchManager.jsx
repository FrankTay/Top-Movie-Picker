import { useState, useEffect, useContext } from 'react'
import { ReactP5Wrapper } from "react-p5-wrapper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'

import '../../App.css'
import MovieInfo from './MovieInfo.jsx';
import Sketch from "../../assets/js/Sketch";
import SideNav from '../Navbar/SideNav';
import * as helper from "../../assets/js/helpers";
import AllMovieData from "../../testing/movie-data";
import { WatchedList } from '../../contexts/Contexts';



function SketchManager() {
 
    let [spinCount, setSpinCount] = useState(0);
    let [landedNum, setLandedNum] = useState("");
    let [spinState, setSpinState] = useState(false);
    let [IMDBmovieData, setMovieData] = useState({})
    let [TMDBmovieData, setTMDBMovieData] = useState({})
    let [streamProviders, setStreamProviders] = useState({})
    let [imgPath, setImgPath] = useState("");
    const watchedList = useContext(WatchedList)
    const hamburgerIcon = <FontAwesomeIcon icon={faBars} />
    const closeIcon = <FontAwesomeIcon icon={faTimes} />

    let rootImgPath = "https://image.tmdb.org/t/p/w1280"
    let fadeClass = (!spinState) ? "fade-in-bg" : "fade-out";

    const onSpinStart = (numExpected) => {
    //TODO: prevent spin again until complete
    // setImgPath("")

    setLandedNum(numExpected)
    setSpinState(true)
    //TODO: Replace with fetch func
    let {id:IMDBId, title, year, rank, image, crew, imDbRating} = AllMovieData.items[numExpected-1]
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
        setImgPath(rootImgPath+bdPath)
        const detailsFromTMDBURL = `https://api.themoviedb.org/3/movie/${TMDBId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`;

      console.log(data.movie_results[0])
        // get general movie info from query of TMDB id
      return helper.fetchData(detailsFromTMDBURL)
      })
      .then(data => {
        setTMDBMovieData(prev => ({...prev,data}))
        const watchProvidersEndpoint = `https://api.themoviedb.org/3/movie/${data.id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        console.log(data)
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

    return (
        <>
          <div 
           className={`backdrop ${fadeClass}`}
          // style={!spinState ?{ background: `url(${imgPath}) no-repeat`, backgroundSize: "contain"}: null}
          style={!spinState ?{ background: `url(${imgPath})`}: null}
          >
          </div>
          
            <main className="App-container">

                <ReactP5Wrapper  
                    sketch={Sketch}
                    onSpinStart={onSpinStart}
                    onSpinComplete={onSpinComplete}
                    watchedList={watchedList}
                />
                
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
