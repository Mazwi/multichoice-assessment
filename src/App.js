import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import _ from 'lodash';
import { connect } from 'react-redux';

import { getMovies } from './actions/movies-actions';
import { changeSelectedOrder } from './actions/select-order-actions';
import { changeSelectedMovie } from './actions/select-movie-actions';
import { switchMovieView } from './actions/view-actions';

import MoviePoster from './components/MoviePoster';
import SortBy from './components/SortBy';
import MovieDetails from './components/MovieDetails';

class App extends Component {  
      
  componentDidMount(){
    this.props.onGetMovies();
  }
  
  onChangeSortOrder(sortBy){
    this.props.onChangeSortOrder(sortBy)
  }

  onSelectMovie(event, view, movie){
    this.props.onSwitchMovieView(view);
    this.props.onSelectMovie(movie);
  }

  render() {
    const movies = this.props.movies.components;
    const selectedMovie = this.props.selectedMovie;
    const ORDER_SELECT_TYPE = "order-select";
    const MOVIE_LIST_TYPE = "movie-list";
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Top 5 Movies</h1>
        </header>
        <p className="App-intro">
        </p>
        {(!movies) ? <h3>loading....</h3> :
          (this.props.view === "list") ?
          <div><SortBy orderSelectItems={movies.find((x) => x.type === ORDER_SELECT_TYPE).items} changeSortOrderHandler={(sortBy) => this.onChangeSortOrder(sortBy)} /> 
            {_.sortBy(movies.find((x) => x.type === MOVIE_LIST_TYPE).items, [this.props.sortOrder]).map((movie, i) =>
              <MoviePoster
                key={i}
                imageUrl={movie.imageUrl} 
                title={movie.title}
                releaseDate={movie.releaseDate}
                selectMovieHandler={(e) => this.onSelectMovie(e, "details", movie)} />)
            }
          </div>
          : <div><button onClick={(e) => this.onSelectMovie(e, "list", {})}>{"<< Back to List"}</button><br /> 
            <MovieDetails
              imageUrl={selectedMovie.imageUrl}
              title={selectedMovie.title}
              releaseDate={selectedMovie.releaseDate}
              synopsis={selectedMovie.synopsis}
            /></div>         
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return state;
}

const mapActionsToProps = {
  onGetMovies: getMovies,
  onSelectMovie: changeSelectedMovie,
  onSwitchMovieView: switchMovieView,
  onChangeSortOrder: changeSelectedOrder
}

export default connect(mapStateToProps, mapActionsToProps)(App);
