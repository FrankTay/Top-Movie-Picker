export const TMDBendpoints = {
    //https://developers.themoviedb.org/3/find/find-by-id
    //TO GET TMDB GENERAL MOVIE DETAILS BASED ON IMDB ID
    IMDBquery: `https://api.themoviedb.org/3/find/`,
    
    //https://developers.themoviedb.org/3/movies/get-movie-details
    //TO GET GENERAL MOVIE DETAILS BASED ON TMDB ID, INCLUDING GENRES,LANGUAGE
    TMDBIdQuery: `https://api.themoviedb.org/3/movie/`,

    //https://developers.themoviedb.org/3/getting-started/images
    //GET 780px IMAGE
    TMDBimage: `https://image.tmdb.org/t/p/w780`

    //GET release dates and rating
    // TMDBreleaseDates: `https://api.themoviedb.org/3/movie/${TMDBmovieID}/release_dates`,

    //GET watch provides(streaming and purchase options per country)
    // TMDBreleaseDates: `https://api.themoviedb.org/3/movie/${TMDBmovieID}/watch/providers`,
}


export const fetchData = async (url) => {
    return fetch(url)
        .then((response) => {
           return response.json()
        })
        .then((data) => { 
            return data
        })
}