export default function selectMovieReducers(state = {}, action){
    if(action.type === "selectMovie") return action.payload;
    return state;
}