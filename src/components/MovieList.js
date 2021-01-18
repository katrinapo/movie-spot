import React from 'react';

const MovieList = (props) => {
    const NomineesComponent = props.nomineesComponent;

    return (
        <>
        {props.movies.map((movie, index) => 
        <div className="tc bg-white dib br3 pa2 ma2 grow bw2 shadow-5 image-container">
            <img src={movie.Poster} alt="movie"></img>
            <div onClick={()=> props.handleNomineesClick(movie)} className="overlay">
                <NomineesComponent />
                <p>{movie.Title},{movie.Year}</p>
            </div>
        </div>)}
        </>
    )
}

export default MovieList;