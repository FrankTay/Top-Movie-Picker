import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Main from './components/Main.jsx';
import Sketch from "./assets/js/Sketch";
import * as helper from "./assets/js/helpers";
import { ReactP5Wrapper } from "react-p5-wrapper";
import AllMovieData from "./testing/movie-data";
import Modal from './components/Modals/LoginModal';
import NavBar from './components/Navbar/NavBar';
import { db, auth } from './firebase-config'; 
import {createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from './auth/UserContext';
import { signUpUser } from "./auth/authFunctions" ;

function App() {
  let [user, setUser] = useState(null);
  // let []
  let [spinCount, setSpinCount] = useState(0);
  let [landedNum, setLandedNum] = useState("");
  let [spinState, setSpinState] = useState(false);
  let [IMDBmovieData, setMovieData] = useState({})
  let [imgPath, setImgPath] = useState("");
  let [genres, setGenres] = useState("");

  let rootImgPath = "https://image.tmdb.org/t/p/w780"
  
  
  const onSpinStart = (numExpected) => {
    //TODO: prevent spin again until complete
    setImgPath("")

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
    //listen for changes in logged in user
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log(`current user is ${user?.email}`)
      setUser(user)
      
    })

    return () => {
      unsubscribe();
    };

}, [user]);

  return (
    <>
      <UserContext.Provider value={user}>
        <NavBar />
        <div className="App-container"> 
          <ReactP5Wrapper  
              sketch={Sketch}
              onSpinStart={onSpinStart}
              onSpinComplete={onSpinComplete}
          />
          <div className='results'>
            {(!spinState && spinCount > 0) ? <Main 
              IMDBmovieData={IMDBmovieData}
              spinState={spinState}
              imgPath={imgPath}
              

            /> : null}
          </div>
        </div>
      </UserContext.Provider>
    </>
  )
}

export default App
