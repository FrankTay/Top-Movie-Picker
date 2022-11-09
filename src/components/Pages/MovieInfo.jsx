import { useState, useEffect, useContext } from 'react'
import { UserContext, WatchedList, MovieListContext } from '../../contexts/Contexts'; 
import { addToWatchedList, removeFromWatchedList, getWatchedList } from '../../auth/authFunctions';
import { auth } from '../../firebase-config'; 
import '../../App.css'

const TMDBImagePrefixURL = "https://image.tmdb.org/t/p/original"
const JWlink  = `https://www.justwatch.com`

function MovieInfo({IMDBmovieData, TMDBmovieData, streamProviders, spinState}) {
    // console.log(spinState);
    // const [imgPath, setImgPath] = useState(null);
    const crew = IMDBmovieData.crew.split(",")
    const user = useContext(UserContext)
    const watchedList = useContext(WatchedList)
    const movieListData = useContext(MovieListContext)
    const [checkedState, setCheckedState] = useState(watchedList.includes(IMDBmovieData.IMDBId))

    const fadeClass = (!spinState) ? "fade-in" : "";
    const flatrate = streamProviders?.flatrate;
    const ads = streamProviders?.ads
    const free = streamProviders?.free

    const streamingSites =  [flatrate, ads, free].flat().filter(x => x != undefined)
    const iconSize = (streamingSites.length <= 4) ? 20 : 16

    const streamIcons = streamingSites.map((elem) => 
        <li key={elem.provider_id} className="m-2">
            <div  >
               <img className={`object-cover h-${iconSize} rounded`} src={TMDBImagePrefixURL+elem.logo_path}/>
            </div>
        </li>
    )
    
    const checkBoxAction = async (e) => {

        const toggleStatus = e.target.checked;
        // console.log(auth?.currentUser?.displayName)
        // console.log(`user is box currently checked ${user.displayName}, ${user.email}`)
        if (toggleStatus){
            setCheckedState(true)
            addToWatchedList(auth?.currentUser?.displayName, user.email, IMDBmovieData.IMDBId)
        }
        else {
            setCheckedState(false)
            removeFromWatchedList(auth?.currentUser?.displayName, user.email, IMDBmovieData.IMDBId)
        }
    }
//TODO: necessary effect?
    useEffect(()=> {

    }, [user])

    return (
        
        <div className={`${fadeClass} Movie-info`}>
            <div className='title  flex justify-center'>
                <a 
                    href={`https://www.imdb.com/title/${IMDBmovieData.IMDBId}`} 
                    target={`_blank`}
                > 
                    <h1 className='text-5xl underline'>{IMDBmovieData.title}</h1> 
                </a>
            </div>
            <div className="movie-details my-5 flex justify-between align-center">
                <section>
                    <p>{IMDBmovieData.year}</p>
                    <p>Rank: {IMDBmovieData.rank}</p>
                    <div className="cast">
                        <h2>Starring</h2>
                        <p> {crew[1]}</p>
                        <p> {crew[2]}</p>
                    </div>
                    <div className="crew">
                        <h2>Directed by</h2>
                        <p> {crew[0].replace(" (dir.)", "")}</p>
                    </div>
                    <div className="watched-status">
                        <h2>Already watched?</h2>
                        {!user.user ? <p>Sign in to track this film</p> : 
                        <input className="border-gray-300 rounded h-5 w-5" type={"checkbox"} onChange={(e) => checkBoxAction(e)} checked={checkedState}/> 
                        }
                    </div>
                    

                </section>
                <section>
                    <div >
                        <img className="h-80 border-2 rounded" src={TMDBImagePrefixURL + TMDBmovieData.poster_path}/>
                    </div>
                </section>

            </div>
            <section className="watch-options-section">
                {streamIcons.length ? <h2>Streaming at</h2>: ""}
                <ul className='flex justify-center flex-wrap'>
                    {streamIcons.length ? streamIcons : <li> No stream options available for US region</li>}
                </ul>
                {streamProviders ? <h2><a className='underline' target="_blank" href={streamProviders.link}> Find more viewing options here</a></h2> :
                <h2>No digital viewing options for US region </h2>
                }
                <div className='my-2 h-36 flex justify-center align-center ' >
                    <h2>Viewing options provided by 
                        <a className='my-2 h-36 flex justify-center align-center' href={JWlink}>   
                            <img className="h-4" src='./src/assets/img/JustWatch-logo.webp'/>
                        </a>
                    </h2>
                </div>
            </section>
                
            
        </div>
    )
}

export default MovieInfo