import React, { Component } from 'react';
// import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';

import { BaseUrl } from '../../../services/axios';
import { SliderPlaceholder } from '../../base/loader/ImagePlaceholder';
import placeholder from '../assets/header-mobile-placeholder.png';
import '../assets/css/mobileStyles.css';
import Slider from 'react-slick';

export class HeadSlider extends Component {
	constructor(props) {
		super(props)

		this.state = {
			localStore: [],
			isLoading: true,
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.store.length !== prevState.localStore.length) {
			return {
				localStore: nextProps.store,
				isLoading: false,
				indexActive: 0,
			}
		}
		return null
	}

	render() {
		if (this.state.isLoading) {
			return (
				<>
					<div id="mobile-head-slider">
						<div className="mb-3">
							<Loading width="100%" height="20px" />
						</div>
						<Loading width="100%" height="280px" />
						<div className="my-5">
							<Loading width="100%" height="40px" />
						</div>
					</div>
				</>
			)
		}
		return (
			<div id="mobile-head-slider">
				<div className="mb-3">
					<h1>
						Investasi Pasti Dengan Harga Yang Kompetitif
					</h1>
				</div>
				<Slider
					afterChange={(index) => this.setState({ indexActive: index })}
					dots={false}
					arrows={false}
					autoplay={true}
					autoplaySpeed={3000}
				>
					{this.state.localStore && this.state.localStore.map((item, i) => {
						return (
							<img className="w-100" src={`${BaseUrl}/storage/${item.image.replace(/\\/g, "/")}`} alt="1" key={i}/>
						)
					})}
				</Slider>
				{/* {this.state.localStore && this.state.localStore.map((item, i) => {
					if(i===this.state.indexActive){
						return(
							
						)
					}
				})} */}
				<a href="/#contact-us"><Button className="my-5">JADWALKAN TUR</Button></a>
			</div>
		)
	}
}
const Background = styled.div`
    height: 280px;
    width:100%;
    background: url(${props => props.source});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `;

const Button = styled.button(
	props => ({
		width:"100%",
		height:"40px",
		textAlign:"center",
		fontFamily: "Verlag",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: "13px",
		lineHeight: "18px",
		letterSpacing: "2px",
		textTransform: "uppercase",
		color:"white",
		backgroundColor:"#CC9980"

	})
)

const Loading = styled.div(
	props => ({
		height: props.height, 
		width: props.width, 
		backgroundColor: "#ccc"
	})
)
export default HeadSlider