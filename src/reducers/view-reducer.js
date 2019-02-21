export default function viewReducers(state = '', action){
    if(action.type === "switchView") return action.payload;
    return state;
}