import { useState, useEffect, useRef } from 'react'
import './App.css'
import spinWheelIcon from "./spinning-wheel.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import * as helper from "./assets/js/helpers";
import SideNav from './components/Navbar/SideNav';
import { auth } from './firebase-config'; 
import { getWatchedList } from './auth/authFunctions';
import { UserContext, MovieListContext, WatchedList, RemoveWatchedFromWheelContext } from './contexts/Contexts';
import SketchManager from './components/Pages/Main/SketchManager';
import List from './components/Pages/List'
import About from './components/Pages/About'
import AllMovieData from "./testing/movie-data";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [user, setUser] = useState("pending");
  const [watchedList, setWatchedList] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [removeWatchedFromWheel, setRemoveWatchedFromWheel] = useState(true);
  const menuCheckbox = useRef()

  const hamburgerIcon = <FontAwesomeIcon icon={faBars} />
  const closeIcon = <FontAwesomeIcon icon={faTimes} />
 //TODO: change to fetch data from server on deploy
 const [IMDBMovieList, setIMDBMovieList] = useState(AllMovieData.items);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

 

  useEffect(() => {
    //listen for changes in logged in user
    const unsubscribe = auth.onAuthStateChanged(authUserState => {
      // console.log(`login change occured. current user is ${authUserState?.displayName} with email ${authUserState?.email}`)
      
      if(authUserState) {
        getWatchedList(authUserState.displayName)
        .then((list) => {
          if (list) {
            setWatchedList(list)
            setUser(authUserState)
          }
        })
      } else {
        setWatchedList([])
            setUser(null)

      }
    })

    return () => {
      unsubscribe();
    };

}, [user]);

  return (
    <Router>
      <UserContext.Provider value={{user,setUser}}>
      <MovieListContext.Provider value={IMDBMovieList}>
      <WatchedList.Provider value={{watchedList, setWatchedList}}>
      <RemoveWatchedFromWheelContext.Provider value={{removeWatchedFromWheel, setRemoveWatchedFromWheel}}>
        {/* LOGO */}
        <Link to={"/"}>
          <div className="logo">
            <img className='h-20' alt="home" src={spinWheelIcon}/>
          </div>
        </Link>

        {/* NAV BAR TOGGLE BUTTON */}
        <input ref={menuCheckbox} onChange={toggleMenu} checked={showMenu} type="checkbox" id="nav-toggle-btn"/>
        <label htmlFor="nav-toggle-btn">
          {(showMenu) ? closeIcon : hamburgerIcon}
        </label>
        {/* ROUTES */}
        <div className='route-container'>
          <Routes>
            <Route exact path="/" element={<SketchManager />}/>
            <Route exact path="/list" element={<List />}/>
            <Route exact path="/about" element={<About />} />              
          </Routes>
        </div>
        {/* NAV BAR */}
        <nav className='nav-content' >
            <SideNav 
              toggleMenu={toggleMenu}
            />
        </nav>
      </RemoveWatchedFromWheelContext.Provider>
      </WatchedList.Provider>
      </MovieListContext.Provider>
      </UserContext.Provider>
    </Router>
  )
}

export default App
