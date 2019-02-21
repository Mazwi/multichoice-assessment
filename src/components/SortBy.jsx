import React, { Component } from 'react';

class SortBy extends Component{

    render(){
        return(
            <div style={{textAlign: "right", paddingRight: '20%', marginBottom: 15}}>Sort Movies By: 
                {this.props.orderSelectItems.map((item, i) => {
                    return(<span style={{marginLeft: 10}} key={i}><a href="#" onClick={() => this.props.changeSortOrderHandler(item.valueToOrderBy)}>{item.label}</a> |</span>)                    
                })}
            </div>)
    }
}

export default SortBy;