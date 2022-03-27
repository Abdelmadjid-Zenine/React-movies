
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';

const UserList = () => {
    const [listData, setListData] = useState([])
    useEffect(() => {
    let moviesId = window.localStorage.movies ? window.localStorage.movies.split(",") : []
    for(let i = 0; i < moviesId.length; i++)
    {
        axios.get(`https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=8825ca77dd7ca9c3baef9769c3f3f74f&language=en-US`)

        .then((res) => setListData((listData) => [...listData,res.data]))  
    }}, [])
    
    
    
    
    
    console.log(listData);
    return (
        <div className="user-list-page">
            <Header />
            <h2>Coup de coeur <span></span> </h2>
            <div className="result">
                {
                    
                    (listData.length )?
                    (listData.map((movie) => <Card movie={movie} key={movie.id}/>))
                    :(
                        <h2>Aucun coup de coeur pour le moment</h2>
                    )
                }
            </div>
        </div>
    );

}
export default UserList;