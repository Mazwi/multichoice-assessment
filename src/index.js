import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import thunk from 'redux-thunk';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import moviesReducer from './reducers/movies-reducer';
import selectMovieReducer from './reducers/select-movie-reducer';
import selectOrderReducer from './reducers/select-order-reducer';
import viewReducer from './reducers/view-reducer';

const allReducers = combineReducers({
    movies: moviesReducer,
    selectedMovie: selectMovieReducer,
    sortOrder: selectOrderReducer,
    view: viewReducer
})

const allStoreEnhancers = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(allReducers,
{
    movies: [],
    selectedMovie: {},
    sortOrder: 'default',
    view: 'list'
}, 
allStoreEnhancers);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
