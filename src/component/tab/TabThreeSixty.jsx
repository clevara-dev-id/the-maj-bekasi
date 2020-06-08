import React, { Component } from 'react'

class TabThreeSixty extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div style={{marginTop:75}}>
                <iframe width="100%" height="480px" src={this.props.frame.embed_links} frameBorder="0"></iframe>
            </div>
        )
    }
}
export default TabThreeSixty