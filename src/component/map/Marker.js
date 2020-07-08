import React, { Component } from 'react'
import {BaseUrl} from '../../services/axios'

export default class Marker extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="text-center" style={{width:"30px", height:"30px", textAlign:"center", borderRadius:"50%", backgroundColor:"#fff"}}>
        <img width="30" src={this.props.icon} alt={this.props.name} />
      </div>
    )
  }
}