import React, { Component } from "react";
import Slider from "react-slick";
import {BaseUrl} from '../../../services/axios'
import styled from "styled-components"

import exampleImg from '../../assets/tentangkami-image/2.png'

import '../assets/style.css'

export class MobileReviewUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeReview: [],
      nav1: null,
      nav2: null,
      indexActive: 0,
      name: "",
      show:3,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
    if(this.state.storeReview.length > 3){
      this.setState({show:4})
    }else{
      this.setState({show:3})
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.storeReview !== state.storeReview) {
      return {
        storeReview: props.storeReview,
      }
    }

    return null
  }

  render() {
    return (
      <>
        <Caps2 margin="37px 0px">Preview Unit</Caps2>
        <Slider
          asNavFor={this.state.nav2}
          className="center"
          arrows={false}
          centerMode={true}
          centerPadding="1px"
          dots={false}
          fade={true}
          lazyLoad={true}
          slidesToShow={1}
          slidesToScroll={1}
          ref={slider => (this.slider1 = slider)}
        >
            {this.state.storeReview && this.state.storeReview.map((d, i) => (
                <div key={i} >
                    <img className="img-fluid" src={`${BaseUrl}/storage/${d.gambar}`} alt="review 1" />
                </div>
            ))}
            <div>
              <iframe width="100%" height="240px" src={this.props.frame.embed_links} frameBorder="0"></iframe>
            </div>
        </Slider>

        <div id="reviewUnitMobile" style={{width: "100%", marginTop: "21px"}}>
            <Slider
              asNavFor={this.state.nav1}
              beforeChange={(e) => this.setState({indexActive: e})}
              dots={false}
              focusOnSelect={true}
              slidesToShow={this.state.show}
              centerMode={true}
              centerPadding="10px"
              swipeToSlide={true}
              arrows={false}
              ref={slider => (this.slider2 = slider)}
              lazyLoad={true}
              autoplay={true}
              autoplaySpeed={2000}
              pauseOnHover={true}
              >
                {this.state.storeReview && this.state.storeReview.map((d, i) => {
                  return (
                    <div key={i}>
                        <img src={`${BaseUrl}/storage/${d.gambar_mobile}`} className="mx-auto p-3" alt="Preview 2" style={{width: '100%'}} />
                    </div>
                  )
                })}
                <div>
                  <img src={exampleImg} alt="preview" className="mx-auto p-3" style={{width: '100%'}} />
                </div>
            </Slider>
        </div>
      </>
    );
  }
}

const Caps2 = styled.h6(
  props => ({
      fontStyle: "normal",
      fontWeight: "bold",
      lineHeight: "13px",
      textAlign: "center",
      fontSize:"11px",
      textTransform:"uppercase",
      margin: props.margin,
  })
)

export default MobileReviewUnit
