import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../auth/UserContext'; 

function Main({IMDBmovieData,spinState,imgPath}) {
    // console.log(spinState);
    // const [imgPath, setImgPath] = useState(null);
    const user = useContext(UserContext)
    let fadeClass = (!spinState) ? "Movie-info fade-in" : "Movie-info";
    
    return (
        <div 
            className={`${fadeClass}`} 
            style={{ background: `url(${imgPath}) no-repeat`, backgroundSize: "contain"}}//, backgroundRepeat: "no-repeat"}}
        >
            <a 
                href={`https://www.imdb.com/title/${IMDBmovieData.IMDBId}`} 
                target='_blank' 
                style={{ textDecoration: `none`,}}
            > 
                <h1 className='text-5xl'>{IMDBmovieData.title}</h1> 
            </a>
            <h2>{IMDBmovieData.year}</h2>
            <h2>IMDB Rank: {IMDBmovieData.rank}</h2>
            
            
        </div>
    )
}

export default Main