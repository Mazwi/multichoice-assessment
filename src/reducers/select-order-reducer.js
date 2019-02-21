export default function selectOrderReducers(state = '', action){
    if(action.type === "selectOrder") return action.payload;
    return state;
}