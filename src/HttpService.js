var HttpService = {
    apiUrl: require('Config').serverUrl + "/api/",
    post: function(controller, token, data, callback, errorCallback){
        fetch(this.apiUrl + controller, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if(response.status === 200){
                    callback(response);
            }       
            else if(response.status === 400){ 
                response.json().then((data) => {
                    errorCallback(data.ModelState[""].toString());
                }).catch((error) => {
                    errorCallback(error);
                }); 
            }       
            else if(response.status === 401){ 
                errorCallback("Your Login Session has expired, please logout and login again");  
            }           
            else if(response.status === 404){ 
                errorCallback("Http Post Resource Not Found (" + require('Config').serverUrl + "/api/" + controller + ")");  
            }
            else if(response.status === 500){ 
                response.json().then((data) => {
                    errorCallback(data.ExceptionMessage);
                }).catch((error) => {
                    errorCallback(error);
                }); 
            }
            else { 
                errorCallback("Unknown Problem, please try again or contact the admin: " + response.message);  
            }
        }).catch(function(error) { 
            errorCallback("Possibly Network, refresh the browser and try again!");  
        });
    },
    getAll: function(controller, token, callback, errorCallback){
        fetch(this.apiUrl + controller, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            }
        }).then((response) => {
            if(response.status === 200){
                response.json().then((data) => {
                    callback(data);
                });
            }      
            else if(response.status === 400){ 
                errorCallback("Application Error, please try again or contact the admin");  
            }        
            else if(response.status === 401){ 
                errorCallback("Your Login Session has expired, please logout and login again");  
            }           
            else if(response.status === 404){ 
                errorCallback("Http Get Resource Not Found (" + require('Config').serverUrl + "/api/" + controller + ")");  
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
    },
    getById: function(controller, token, id, callback, errorCallback){
        fetch(this.apiUrl + controller + "?id=" + id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            }
        }).then((response) => {
            if(response.status === 200){
                response.json().then((data) => {
                    callback(data);
                });
            }   
            else if(response.status === 400){ 
                errorCallback("Application Error, please try again or contact the admin");  
            }           
            else if(response.status === 401){ 
                errorCallback("Your Login Session has expired, please logout and login again");  
            }           
            else if(response.status === 404){ 
                errorCallback("Http Get Resource Not Found (" + require('Config').serverUrl + "/api/" + controller + ")");  
            }
            else if(response.status === 500){ 
                errorCallback("Server returned an error, please try again or contact the admin");  
            }
            else { 
                errorCallback("Unknown Problem, please try again or contact the admin: " + response.message);  
            }
        }).catch(function(error) { 
            errorCallback("Error: Possibly Network, refresh the browser and try again!");  
        });
    },    
    login: function(username, password, callback, errorCallback) {
        var payload = 'username=' + username + '&password=' + password + '&grant_type=password';

        fetch(require('Config').serverUrl + '/token', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
            body: payload
        })
        .then((response) => response.json())
        .then((responseJson) => {      
        if(responseJson.error === undefined){
            callback(responseJson);
        }
        else{
            callback(responseJson);
        }
        }).catch(function(error) {
            errorCallback("Possibly Network, refresh the browser and try again!");  
        });   
    }, 
    getYouTubeVideos: function(callback, errorCallback){
        fetch(
            "https://www.googleapis.com/youtube/v3/playlistItems?"
            + 'key=AIzaSyB60pQb1P3w7SRqMu2Ggb9rPnEWR6Him44'
            //+ '&playlistId=UUkphOlHuqYP7-VGTMagiKUg' //Uploads (All Videos)
            + '&playlistId=PLumlibOr3lxToT7_a10iDh8ZqfzynAfkM' //My Preachings
            + '&part=snippet'
            + '&order=date'
            + '&maxResults=2')
            .then((response) => {
                if(response.status === 200){
                    response.json().then((data) => {
                        callback(data);
                    });
                }   
                else if(response.status === 400){ 
                    errorCallback("Application Error, please try again or contact the admin");  
                }           
                else if(response.status === 401){ 
                    errorCallback("Your Login Session has expired, please logout and login again");  
                }           
                else if(response.status === 404){ 
                    errorCallback("Http Get Resource Not Found ('https://www.googleapis.com/youtube/v3/playlistItems')");  
                }
                else if(response.status === 500){ 
                    errorCallback("Server returned an error, please try again or contact the admin");  
                }
                else { 
                    errorCallback("Unknown Problem, please try again or contact the admin: " + response.message);  
                }
        }).catch(function(error) { 
            errorCallback("Error: Possibly Network, refresh the browser and try again!");  
        });
    },
}

export default HttpService;