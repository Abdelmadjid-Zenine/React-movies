import React, { useEffect, useState } from 'react';

const Card = ({movie}) => {
    const [isRemoved, setIsRemoved] = useState(false)
    const [coupCoeur, setCoupCoeur] = useState([])
    const dateFormater = (date) => {
        let [yy, mm, dd] = date.split("-");
        return [dd, mm, yy].join("-");
    }
    
    useEffect(() => {
        setCoupCoeur(window.localStorage.movies.split(","))
    }, [isRemoved])

    const genreFinder = () => {
        let genreArray = []
        for(let i = 0; i < movie.genre_ids.length; i++){
            switch(movie.genre_ids[i]){
                case 28:
                    genreArray.push('Action')
                    break
                case 12:
                    genreArray.push('Aventure')
                    break 
                case 16:
                    genreArray.push('Action')
                    break     
            }
            return genreArray.map((genre) => <li key={genre}>{genre}</li> )
        }
    }
    const addStorage = () => {
        let storedData =  window.localStorage.movies ? window.localStorage.movies.split(",") : []
        if(!storedData.includes(movie.id.toString()))
            storedData.push(movie.id)
        window.localStorage.movies = storedData
    } 
    const deleteStorage = () => {
        let storedData = window.localStorage.movies.split(",")
        
        const movieIndex = storedData.indexOf(movie.id.toString())
        console.log(movieIndex);
        if(movieIndex > -1)  
            storedData.splice(movieIndex, 1)
        console.log(storedData);
       
        window.localStorage.movies = [...storedData]
    }
    
        if (!isRemoved){
            return (
                <div className="card">
                <img src={movie.poster_path ? 
                    "https://image.tmdb.org/t/p/w500" + movie.poster_path:"./img/poster.jpg"} alt="" />
                <h2>{movie.title}</h2>
                {movie.release_date ? (
                    <h5>Sorti le :{dateFormater(movie.release_date)}</h5>
                ):""}
                <h4>{movie.vote_average}/10 <span>⭐</span></h4>
                <ul>
                    {movie.genre_ids ? genreFinder():movie.genres.map((genre, index) => 
                    <li key={index}>{genre.name}</li>
                 )}
                </ul>
                {movie.overview ? <h3>Synopsis</h3> :""}
                <p>{movie.overview}</p>
                {
                    movie.genre_ids ? (
                     <div className="btn" onClick={() => addStorage()}>
                         Ajouter aux coups de coeur
                     </div>)
                     : (
                         <div className="btn" onClick={() => {
                             
                             deleteStorage()
                             setIsRemoved(true)
                             
                         }}>Supprimer de la liste</div>
                     )
                }
            </div>
            )
        }
        else{
            if(coupCoeur.length < 0) {
                <h2>Aucun coup de coeur pour le moment</h2>
            }
            return (
                
                <div></div>
            );
        }
        
      

};

export default Card;