import { useState, useEffect, useContext } from 'react'
import { UserContext, WatchedList } from '../../../contexts/Contexts'; 
import LoginModal from '../../Modals/LoginModal';

import { modifyWatchedList, getWatchedList } from '../../../auth/authFunctions';
import { auth } from '../../../firebase-config'; 
import justWatchLogo from "./JustWatch-logo.webp"

const TMDBImagePrefixURL = "https://image.tmdb.org/t/p/original"
const JWlink  = `https://www.justwatch.com`
const rootImgPath = "https://image.tmdb.org/t/p/original"


function MovieInfo({IMDBmovieData, TMDBmovieData, streamProviders, spinState}) {
    const crew = IMDBmovieData.crew.split(",")
    const userState = useContext(UserContext)
    const user = userState.user
    const [showLoginModal, setShowLoginModal] = useState(false);
    const watchedListState = useContext(WatchedList)
    const watchedList = watchedListState.watchedList;
    const setWatchedList = watchedListState.setWatchedList;
    const [checkedState, setCheckedState] = useState(watchedList.includes(IMDBmovieData.IMDBId))

    const fadeClass = (!spinState) ? "fade-in" : "";
    const flatrate = streamProviders?.flatrate;
    const ads = streamProviders?.ads
    const free = streamProviders?.free

    const streamingSites =  [flatrate, ads, free].flat().filter(x => x != undefined);
    // const iconSize = (streamingSites.length <= 4) ? 20 : 20;
    const iconSize = 8 
    // h-${iconSize}

    const closeLoginModal = () => {
        setShowLoginModal(false);
    }

    const streamIcons = streamingSites.map((elem) => 
        <li key={elem.provider_id} className="m-2">
            <div  >
               <img className={`watch-icon object-cover rounded`} src={TMDBImagePrefixURL+elem.logo_path}/>
            </div>
        </li>
    )
    
    const checkBoxAction = async (e) => {
        const toggleStatus = e.target.checked;
        const currentUser = auth?.currentUser?.displayName;
        const action = toggleStatus ? "ADD" : "REMOVE";
        (toggleStatus) ? setCheckedState(true) : setCheckedState(false)

        modifyWatchedList(currentUser, user.email, IMDBmovieData.IMDBId, action)
            .then(() => {
                const latestList = getWatchedList(currentUser)
                  .then(list => {
                    setWatchedList(list) 
                })
              })
    }

    const scrollToWheel = () => {
        let wheelElem = document.querySelector(".sketch")
        wheelElem.scrollIntoView({behavior:"smooth"});
    }

//TODO: necessary effect?
    useEffect(()=> {

    }, [user])

    return (
        
        
            <div className={`${fadeClass} Movie-info`}>
                <div
                    className='results-backdrop'
                    style={window.innerWidth < 860 ? { backgroundImage: `url(${rootImgPath+TMDBmovieData?.backdrop_path})`}: null}
                    // style={ {backgroundImage: `url(${rootImgPath+TMDBmovieData?.backdrop_path})`}}
                ></div>

                <section className='title-box'>
                    <div className='spin-again-btn-sm-screen buttonAnimation' onClick={scrollToWheel}><p>SPIN AGAIN?</p></div>
                    <div>
                        <a 
                            href={`https://www.imdb.com/title/${IMDBmovieData.IMDBId}`} 
                            target={`_blank`}
                            className='movie-title'  
                        > 
                            <h1 className='movie-title'>{IMDBmovieData.title} </h1>
                            <h3 className='text-3xl'>({IMDBmovieData.year})</h3>
                        </a>
                    </div>
                    <div className='invisible-item'><p></p></div>
                </section>
                <section className="movie-details my-3 flex justify-between align-center ">
                    <div className='w-2/3 mx-8  flex flex-col items-start'>
                        <div className='overview-section'>
                            <h2 className="overview-text">{TMDBmovieData.overview}</h2>
                        </div>                   
                        <p className='my-3 info-desc'>Rank: <span className='Movie-info rank'>{IMDBmovieData.rank}</span></p>
                        <h2 className="info-desc">Starring</h2>
                        <div className="flex gap-x-4 underline mb-3">
                            <h5 className="crew"> {crew[1]}</h5>
                            <h5 className="crew"> {crew[2]}</h5>
                        </div>
                        <h2 className="info-desc">Directed by</h2>
                        <div className="crew mb-4 ">
                            <h5 className="underline"> {crew[0].replace(" (dir.)", "")}</h5>
                        </div>
                        <div className="watched-status my-4">
                            <h2 className='decoration-red-400 underline'>Already watched?</h2>
                            {(user) ?  
                            <input className="border-gray-300 rounded h-8 w-8 mt-2" type={"checkbox"} onChange={(e) => checkBoxAction(e)} checked={checkedState}/> :
                            <h2 onClick={() => setShowLoginModal(true)} className='text-lg cursor-pointer'>Sign in to track this film</h2> 
                            }
                        </div>
                    </div>
                    <div>
                            {/* Poster */}
                        <div className='poster'>
                            <img className="poster-img  w-80 border-2 rounded" src={TMDBImagePrefixURL + TMDBmovieData.poster_path}/>

                            {/* <img className="poster-img object-cover w-80  border-2 rounded" src={TMDBImagePrefixURL + TMDBmovieData.poster_path}/> */}
                        </div>
                        <section className="watch-options">
                            {streamIcons.length ? <h2 className="info-desc">Streaming at</h2>: ""}
                            <ul className='flex justify-center flex-wrap'>
                                {streamIcons.length ? streamIcons : <li> No streaming options available for US region</li>}
                            </ul>
                            {streamProviders ? <h2><a className='underline' target="_blank" href={streamProviders.link}> Find more viewing options here</a></h2> :
                                <h2>No alternate digital viewing options for US region at this time.</h2>
                            }
                            <div className='mt-2 flex flex-row justify-center align-center' >
                                <h2>Viewing options provided by </h2>
                                <a href={JWlink}>   
                                    <img className="h-4 mt-1 ml-3" src={justWatchLogo}/>
                                </a>
                            </div>
                        </section>
                    
                    </div>
                </section>
                {showLoginModal ? <LoginModal closeLoginModal={closeLoginModal}/> : null}
            </div>
        
    )
}

export default MovieInfo