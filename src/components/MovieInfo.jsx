import { useState, useEffect } from 'react'

function MovieInfo({IMDBmovieData,spinState,imgPath}) {
    // console.log(spinState);
    // const [imgPath, setImgPath] = useState(null);

    let fadeClass = (!spinState) ? "Movie-info fade-in" : "Movie-info";
    
    return (
        <div 
            className={`${fadeClass}`} 
            style={{ background: `url(${imgPath}) no-repeat`}}
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

export default MovieInfo