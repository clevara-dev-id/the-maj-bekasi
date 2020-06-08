import React, { Component } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { BaseUrl } from '../../../services/axios'

import '../assets/css/mobileStyles.css'
import placeholder from '../assets/header-mobile-placeholder.png';

import { SliderPlaceholder } from '../../base/loader/ImagePlaceholder'


export class MobileGallery extends Component {
	constructor(props) {
		super(props)

		this.state = {
			localStore: [],
			indexActive: 0,
			cPadding: 0,
			isLoading: true,
		}
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		if (window.innerWidth < 375) {
			this.setState({ cPadding: "15% 0px 0px" })
		} else if (window.innerWidth < 425) {
			this.setState({ cPadding: "35% 0px 0px" })
		} else {
			this.setState({ cPadding: "40% 0px 0px" })
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.store.length !== prevState.localStore.length) {
			return {
				localStore: nextProps.store,
				isLoading: false,
			}
		}
	}



	render() {
		if (this.state.isLoading) {
			return (
				<Container id={this.props.id} ref={this.props.galeriRef} className="container" margin="0px" padding="44px 0px">
					<Caps1 margin="0 0px 27px 0px">Galeri</Caps1>
					<div id="mobileItemGallery" style={{ width: "228.21px", height: "228.21px", backgroundColor: "#ccc", margin: "0px 0px 0px 30px" }}></div>
				</Container>
			)
		}
		return (
			<Container id={this.props.id} ref={this.props.galeriRef} className="container">
				<Caps1 margin="0 0px 27px 0px">Galeri</Caps1>
				<div id="mobileItemGallery" >
					<Slider
						dots={false}
						afterChange={(indexActive) => this.setState({ indexActive })}
						infinite={true}
						// centerMode={true}
						// centerPadding={this.state.cPadding}
						slidesToShow={1}
						speed={1000}
						arrows={false}
						customPaging={(i) => (
							<div id="dots" />
						)}
					>
						{/* {Data && Data.map((item, i) => ( */}
						{this.state.localStore.length && this.state.localStore.map((item, i) => (
							<div key={i}>
								<Background className="img-fluid" source={`${BaseUrl}/storage/${item.gambar.replace(/\\/g, "/")}`} />
							</div>
						))}
					</Slider>
				</div>

				<Content margin="51.79px 0 0 0">
					{this.state.localStore.length && this.state.localStore.map((item, i) => {
						if (i === this.state.indexActive) {
							return (
								<>
									<P>
										{item.nama}
										{item.unit ? " - " + item.unit.unit_name : " "}
									</P>
									<p style={{ fontSize: "14px", lineHeight: "16px", color: "#FFFFFF", textAlign: "center", letterSpacing: "3px" }}> {i + 1} | {this.state.localStore.length} </p>
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
		// height: "500px",
		paddingTop: "44px",
		paddingBottom: "44px",
	})
)

const Background = styled.div`
    height: 280px;
    width:100%;
    background: url(${props => props.source});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
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
  margin: ${props => props.margin};
  padding: ${props => props.padding};
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