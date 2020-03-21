import React, { Component } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { BaseUrl } from '../../../services/axios'

import '../assets/css/mobileStyles.css'
import placeholder from '../assets/header-mobile-placeholder.png';

import {SliderPlaceholder} from '../../base/loader/ImagePlaceholder'


export class MobileGallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
        store: [],
        indexActive: 0,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.store !== prevState.store) {
        return {
            store: nextProps.store
        }
    }

    return null
  }



  render() {
    // if (!this.state.store.length) {
    //   return (
    //     <Container margin="68.93px 0 123px 0px" padding="16px 0 23px 0">
    //       <Caps1 margin="0 0 22px 0">Gallery</Caps1>
    //       <SliderPlaceholder color="#CC9980" src={placeholder} width="100%" height="228px" opacity=".6" />
    //     </Container>
    //   )
    // }

    return(
        <Container className="container" margin="0px" padding="44px 0px 44px 42px">
            <Caps1 margin="0 0px 27px 0px">Gallery</Caps1>
            <div id="mobileItemGallery">
                <Slider
                    dots={false}
                    beforeChange={(indexActive) => this.setState({indexActive})}
                    infinite={true}
                    centerMode={true}
                    centerPadding="35% 0px 0px"
                    slidesToShow={1}
                    speed={1000}
                    arrows={false}
                    customPaging={(i) => (
                      <div id="dots" />
                    )}
                >
                    {/* {Data && Data.map((item, i) => ( */}
                    {this.state.store.length && this.state.store.map((item, i) => (
                        <div>
                            {/* <img 
                                src={BaseUrl + '/storage/' + item.gambar}
                                alt={item.nama + '-' + item.unit.unit_name} 
                                style={{
                                  width: "228.21px",
                                  height: "228.21px",
                                  margin: "0 8px"
                                }}
                            /> */}
                            <Background source={BaseUrl + '/storage/' + item.gambar} />
                        </div>
                    ))}
                </Slider>
            </div>

            <Content margin="55.79px 0 0 0">
              {this.state.store.length && this.state.store.map((item, i) => {
                if (i === this.state.indexActive) {
                    return (
                        <>
                            <P>{item.nama} - {item.unit.unit_name}</P>
                            <p style={{fontSize: "14px", lineHeight: "16px", color: "#FFFFFF", textAlign:"center", letterSpacing:"3px"}}> {i+1} | {this.state.store.length} </p>
                        </>
                    )
                }
                })}
            </Content>
        </Container>
    )
  }
}

const Container = styled.div(
  props => ({
    backgroundColor: "#12284C",
    maxHeight:"500px",
    padding: props.padding,
    margin: props.margin,
  })
)

const Background = styled.div`
  width: 228.21px;
  height: 228.21px;
  margin: 0 8px;
  background: url(${props=>props.source});
`;

const Content = styled.div(
  props => ({
    margin: props.margin,
    padding: props.padding,
  })
)

const Caps1 = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 33px;
  text-align: center;
  text-transform: capitalize;
  color: #FFFFFF;
  margin: ${props=>props.margin};
  padding: ${props=>props.padding};
`;

const P = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
  color: #FFFFFF;
  margin-bottom:31px;
`;
  
export default MobileGallery