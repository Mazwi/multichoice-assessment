import React, { Component } from 'react';

class MoviePoster extends Component{

    render(){
        return(
        <div style={{display: 'inline-block', width: 200, margin: 10, cursor: "pointer"}} onClick={this.props.selectMovieHandler}>
            <img style={{height: 200, marginBottom: 10}} alt={this.props.title} src={this.props.imageUrl} /><br />
            <strong>{this.props.title}</strong>
        </div>)
    }
}

export default MoviePoster;