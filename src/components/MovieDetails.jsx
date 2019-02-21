import React, { Component } from 'react';

class MovieDetails extends Component{

    render(){
        return(
            <div>
                <img style={{height: 250, marginBottom: 10}} alt={this.props.title} src={this.props.imageUrl} />
                <div style={{display: 'inline-block', verticalAlign: "top", width: 600, margin: 20, textAlign: "left"}}>
                    <h2>{this.props.title}</h2>
                    <h4>{this.props.releaseDate}</h4>
                    <p>{this.props.synopsis}</p>
                </div>
            </div>)
    }
}

export default MovieDetails;