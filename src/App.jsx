import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import MovieInfo from './components/Movieinfo.jsx';
import Sketch from "./assets/js/Sketch";
import * as helper from "./assets/js/helpers";
import { ReactP5Wrapper } from "react-p5-wrapper";
import AllMovieData from "./testing/movie-data";
import Modal from './components/Modal';
import NavBar from './components/NavBar'; 

function App() {

  let [spinCount, setSpinCount] = useState(0);
  let [landedNum, setLandedNum] = useState("");
  let [spinState, setSpinState] = useState(false);
  let [IMDBmovieData, setMovieData] = useState({})
  let [imgPath, setImgPath] = useState("");
  let [genres, setGenres] = useState("");
  let [testVal, setTestVal] = useState({});

  let rootImgPath = "https://image.tmdb.org/t/p/w780"
  
  const onSpinStart = (numExpected) => {
    setLandedNum(numExpected)
    setSpinState(true)
    let {id:IMDBId, title, year, rank, image, crew, imDbRating} = AllMovieData.items[numExpected-1]
    setMovieData(prev => ({ ...prev, IMDBId, title, year, rank, image, crew, imDbRating}))
    const endpoints = { 
      detailsFromIMDBIdQueryURL: `https://api.themoviedb.org/3/find/${IMDBId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&external_source=imdb_id`,
      // detailsFromTMDB: `https://api.themoviedb.org/3/movie/${TMDBId}?api_key=62a86f710896a3a012c01ff88125c8e8&language=en-US`,
    }
    //get general movie info from query based on IMDB id
    helper.fetchData(endpoints.detailsFromIMDBIdQueryURL)
      .then(data => {
        const {backdrop_path:bdPath, id:TMDBId} = data.movie_results[0];
        setImgPath(rootImgPath+bdPath)
        const detailsFromTMDBURL = `https://api.themoviedb.org/3/movie/${TMDBId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`;

      console.log(data.movie_results[0])
        // get general movie info from query of TMDB id
      return helper.fetchData(detailsFromTMDBURL)
      })
      .then(data => {
        console.log(data)
      });

      //TODO:
// get genre, mpaa rating, languages
// starting + pics?
// Streaming options

  };

  const onSpinComplete = () => {
    setSpinCount(prev => prev + 1)
    setSpinState(false)
  }

  useEffect(() => {
    return () => {
      console.log("movie data UPDATED!!!")
        
    };

}, []);

  return (
    <>
      <NavBar />
      <div className="App-container"> 
        <ReactP5Wrapper  
            sketch={Sketch}
            onSpinStart={onSpinStart}
            onSpinComplete={onSpinComplete}
        />
        <div className='results'>
          {(!spinState && spinCount > 0) ? <MovieInfo 
            IMDBmovieData={IMDBmovieData}
            spinState={spinState}
            imgPath={imgPath}
            

          /> : null}
        </div>
      </div>
    </>
  )
}

export default App
