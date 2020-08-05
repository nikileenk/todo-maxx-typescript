import React, { Component } from 'react';

interface Props{
    stat:string,
   
}

class Test extends Component <Props> {

    state ={
        key:this.props.stat
    }

    componentDidMount() {
    
    }

    componentDidUpdate(prevProps:any){
     if(prevProps.stat !== this.props.stat){
            this.setState({key:this.props.stat})
        }
      
    }
    

    render() {
        return (
            <div>
                <h3>Testing - {this.state.key}</h3>
            </div>
        )
    }
}

export default Test
