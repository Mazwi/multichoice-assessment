export function errorCallback(message){
    console.log("Error:", message);
}

export function moviesResponse(data){
    return { type: "setMovies", payload: data };
}

export function getMovies() {
    return dispatch => //{dispatch(moviesResponse({value: 'test'}))};
    {
        fetch("http://demo9595712.mockable.io/getTopFiveMovies", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(response.status === 200){
                response.json().then((data) => {
                    dispatch(moviesResponse(data));
                });
            }      
            else if(response.status === 400){ 
                errorCallback("Application Error, please try again or contact the admin");  
            }        
            else if(response.status === 401){ 
                errorCallback("Your Login Session has expired, please logout and login again");  
            }           
            else if(response.status === 404){ 
                errorCallback("Http Get Resource Not Found (http://demo9595712.mockable.io/getTopFiveMovies)");  
            }
            else if(response.status === 500){ 
                errorCallback("Server returned an error, please try again or contact the admin");  
            }
            else { 
                errorCallback("Unknown Problem, please try again or contact the admin: " + response.message);  
            }
        }).catch(function(error) { 
            errorCallback("Possibly Network, refresh the browser and try again!");  
        });
    }
}