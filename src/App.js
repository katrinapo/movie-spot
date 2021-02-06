import React, {useState, useEffect} from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNominees from './components/AddNominees';
import RemoveNominees from './components/RemoveNominees';
import Footer from './components/Footer';
import tachyons from 'tachyons';
import './App.css';

import ReactNotification from 'react-notifications-component';
import {store} from "react-notifications-component";
import "animate.css";
import 'react-notifications-component/dist/theme.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [searchValue, setSearchValue] = useState('')


  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=fbc3911`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search)  {
      setMovies(responseJson.Search);  
    }  
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  {/*useEffect(() => {
    const movieNominations = JSON.parse(
      localStorage.getItem('theShoppies-movie-app-nominations'));
  
      setNominees(movieNominations);
  }, [nominees]);*/}

  {/*const saveToLocalStorage = (items) => {
    localStorage.setItem('theShoppies-movie-app-nominations', JSON.stringify(items));
  }*/}

  const handleDuplicateAdd = () => {
    store.addNotification({
      title: "You have already nominated this movie.",
      message: "Selections must be unique!",
      type: "danger",
      insert: "top",
      container: "top-right",
      dismiss: {
        duration: 7000,
        delay: 800

      }
    });
  }

  const handleFiveNominations = () => {
    store.addNotification({
      title:"Nomination list is full!",
      message: "You have five nominations in your list.",
      type: "success",
      container: "top-right",
      isMobile: "true",
      insert: "top",
      dismiss: {
        duration: 2000
      }
    });}
  
  const nominateMovie = (movie) => {
    let nomineesList = [...nominees, movie]
    const userHashMap = {}
      nomineesList = nomineesList.filter((item, _) => {
        let alreadyExists = userHashMap.hasOwnProperty(item.imdbID)
        if (alreadyExists) {
          handleDuplicateAdd();
        }
        return alreadyExists ? false : userHashMap[item.imdbID] = 1;
      } ) 
  
    if (nomineesList.length <= 5) {
      setNominees([...new Set(nomineesList)]);
      {/*saveToLocalStorage(nomineesList);*/}
    }
    if(nomineesList.length === 5) {
      handleFiveNominations();
    } 
  };

  const removeNomination = (movie) => {
    const nomineeList = nominees.filter(
      (nominee) => nominee.imdbID !== movie.imdbID
      );
  
    setNominees(nomineeList);
    {/*saveToLocalStorage(nomineeList);*/}
  }

  return (
    <div>
      <div>
        <MovieListHeading heading="The Movie Spot" headingDescription="All the info on your favourite films!" subheading="Brought to you by Quaratine 2021"/>
      </div>
      <div className="tc">
      <p className="pa4">Shortlist up to five of your favourite movies below!</p>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      <ReactNotification />
      </div>
      <div className="pa4">
        <MovieList movies={movies} handleNomineesClick={nominateMovie} nomineesComponent={AddNominees}/>
      </div>

      <div>
        <h2 className="tc bangersFont i fw1 f2 pb3">Favourites:</h2>
      </div>
      <div className="pa4">
        <MovieList movies={nominees} handleNomineesClick={removeNomination} nomineesComponent={RemoveNominees}/>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;