import React from 'react';
import video from '../tapes.mp4';

const MovieListHeading = (props) => {
    return(
        <div>
            <header>
                <h1 className="bangersFont">{props.heading}</h1>
                <h1 className="bangersFont">{props.headingDescription}</h1>
                <h1 className="bangersFont">{props.subheading}</h1>
                <video className="header" width="220" src={video} loop autoPlay='now' muted></video>
            </header>
        </div>
    );
};

export default MovieListHeading;