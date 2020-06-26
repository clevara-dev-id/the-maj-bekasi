import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Slider from 'react-slick'
import Marker from '../Marker'
import { Col } from 'react-bootstrap'

import marketplace from '../assets/marketplace.svg'
import hospital from '../assets/hospital.svg'
import goverment from '../assets/goverment.svg'
import education from '../assets/education.svg'
import busway from '../assets/busway.svg'
import station from '../assets/station.svg'
import tolls from '../assets/tolls.svg'
import gor from '../assets/gor.svg'
import styled from 'styled-components'


export default class Maps extends Component {
	constructor(props) {
		super(props)
		this.state = {
			center: {
				lat: -6.23986,
				lng: 106.99640
			},
			zoom: 13,
			isLoading:true,
			localStore:[],
		}
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
	}
	next() {
		this.slider.slickNext();
	}
	previous() {
		this.slider.slickPrev();
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.store.length !== prevState.localStore.length) {
			return {
				localStore: nextProps.store,
				isLoading: false,
			}
		}
		return null
	}
	render() {
		const { store } = this.props

		const settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
		};
		const setIcon = (icon) => {
			switch (icon) {
				case 'marketplace':
					return marketplace;
				case 'education':
					return education;
				case 'goverment':
					return goverment;
				case 'hospital':
					return hospital;
				case 'busway':
					return busway;
				case 'station':
					return station;
				case 'tolls':
					return tolls;
				case 'gor':
					return gor;
				default:
					return marketplace
			}
		}
		return (
			<div id={this.props.id} ref={this.props.lokasiRef} className="container-2" style={{ marginTop: 55, marginBottom: 80 }}>
				<div style={{ marginBottom: "30px", marginTop: "110px" }}>
					<h5>Lokasi</h5>
					<h1>Kenyamanan Dan Kemudahan Menantimu Di 'Planet' Bekasi</h1>
				</div>
				<Slider ref={c => (this.slider = c)} {...settings}>
					{this.state.localStore.map((item, i) => {
						return (
							<div key={i}>

								<div style={{ height: 200 }}>
									<GoogleMapReact
										bootstrapURLKeys={{ key: "AIzaSyAGbxpkHCHp3iNiwRWSTb_PmKo5H1qd62c" }}
										defaultCenter={this.state.center}
										defaultZoom={this.state.zoom}
									>
										{item.marker.map((mark, m) => {
											return (
												<Marker
													key={mark.id}
													lat={mark.latitude}
													lng={mark.longitude}
													text={mark.name}
													icon={setIcon(mark.icon)}
												/>
											);
										})}
									</GoogleMapReact>
									<Col className="d-flex mx-auto justify-content-center" style={{ maxWidth: 250, marginTop: 30 }}>
										<button style={{ backgroundColor: "transparent", color: "#000" }} onClick={this.next} ><i className="fas fa-caret-left fa-2x"></i></button>
										<p style={{ fontSize: 13, textAlign: "center", textTransform: "uppercase", margin: "10px" }}>{item.name}</p>
										<button style={{ backgroundColor: "transparent", color: "#000" }} onClick={this.previous} ><i className="fas fa-caret-right fa-2x"></i></button>
									</Col>
									<div style={{ marginBottom: "13px" }}>
										{item.marker.slice(0, 5).map((est, e) => {
											return (
												<Col className="d-flex my-3 p-0 pl-3" key={e} >
													<img style={{ width: "15px", height: "15px", margin: "auto 10px auto 0px" }} src={setIcon(est.icon)} alt="location icon" />
													<Caps2 style={{ padding: "5px 0px", margin: 0 }}>
														<b className="text-uppercase" style={{ color: "#cc9980" }}>± {est.estimasi} </b> Ke {est.name}
													</Caps2>
												</Col>
											)
										})}
									</div>
								</div>
							</div>
						)
					})}
				</Slider>
			</div>
		)
	}
}
const Caps2 = styled.h6`
  font-family: 'Proxima Nova Book' !important;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;
  text-transform: capitalize;
`;