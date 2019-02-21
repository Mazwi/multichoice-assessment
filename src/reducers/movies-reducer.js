export default function moviesReducers(state = [], action){
    if(action.type === "setMovies") return action.payload;
    return state;
}