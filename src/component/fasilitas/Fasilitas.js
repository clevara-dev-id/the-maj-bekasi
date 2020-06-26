import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from "styled-components";
import Img1 from '../../assets/fasilitas/zenGarden.svg'
import Img2 from '../../assets/fasilitas/2.svg'
import Img3 from '../../assets/fasilitas/3.svg'
import Img4 from '../../assets/fasilitas/4.svg'
import Img5 from '../../assets/fasilitas/5.svg'
import Img6 from '../../assets/fasilitas/6.svg'
import Img7 from '../../assets/fasilitas/7.svg'
import Img8 from '../../assets/fasilitas/8.svg'
import Img9 from '../../assets/fasilitas/9.svg'
import Img10 from '../../assets/fasilitas/10.svg'
import Img11 from '../../assets/fasilitas/11.svg'
import Img12 from '../../assets/fasilitas/12.svg'
import Img14 from '../../assets/fasilitas/14.svg'
import Img13 from '../../assets/fasilitas/13.svg'
import Img15 from '../../assets/fasilitas/15.svg'


const Data = [
		{ id: 1, img: Img1, caption: 'Zen Garden' },
		{ id: 2, img: Img2, caption: 'Ridesharing Shelter' },
		{ id: 3, img: Img3, caption: 'Co-working Space' },
		{ id: 4, img: Img4, caption: 'Parcel Lockers' },
		{ id: 5, img: Img5, caption: 'Storage Room' },
		{ id: 6, img: Img6, caption: 'Game Room' },
		{ id: 7, img: Img7, caption: 'Olympic-size Swimming Pool' },
		{ id: 8, img: Img8, caption: 'One-stop Logistic Centers' },
		{ id: 9, img: Img9, caption: 'Sky Lounge' },
		{ id: 10, img: Img10, caption: 'O2O Kiosks' },
		{ id: 11, img: Img11, caption: 'Gym' },
		{ id: 12, img: Img12, caption: 'Smart Access' },
		{ id: 13, img: Img13, caption: 'Outdoor Communal Space' },
		{ id: 14, img: Img14, caption: 'Jogging Track' },
		{ id: 15, img: Img15, caption: 'Security' }


]

class Fasilitas extends Component {
	render() {
		return (
			<div id={this.props.id} ref={this.props.fasilitasRef} style={{
					paddingTop:"136px",
			}}>
				<div className="container-2 p-0">

					<h5>fasilitas</h5>
					<h1 style={{width: "40%"}}>Untuk Work-Life Balance Yang Lebih Baik</h1>
					<Row className="mx-0" style={{marginTop:"50px"}}>
							{Data.slice(0,5).map((d, i) => {
								return (
									<Col key={i} xs className="mx-1">
										<Row>
											<Content xs={4}>
												<Icon src={d.img} alt={d.caption.replace(" ", "-")} />
											</Content>
											<Caption xs>{d.caption}</Caption>
										</Row>
									</Col>
								)
							})}
					</Row>
					<Row className="mx-0" style={{marginTop:"50px"}}>
							{Data.slice(5,10).map((d, i) => {
								return (
									<Col key={i} xs className="mx-1">
										<Row>
											<Content xs={4}>
												<Icon src={d.img} alt={d.caption.replace(" ", "-")} />
											</Content>
											<Caption xs>{d.caption}</Caption>
										</Row>
									</Col>
								)
							})}
					</Row>
					<Row className="mx-0" style={{marginTop:"50px"}}>
							{Data.slice(10,15).map((d, i) => {
								return (
									<Col key={i} xs className="mx-1">
										<Row>
											<Content xs={4}>
												<Icon src={d.img} alt={d.caption.replace(" ", "-")} />
											</Content>
											<Caption xs>{d.caption}</Caption>
										</Row>
									</Col>
								)
							})}
					</Row>
				</div>
			</div>
		)
	}
}

const Content = styled(Col)`
	padding:0;
	max-width:40px;
`;
const Icon = styled.img`
	width:40px;
	height:40px;
`;
const Caption = styled(Col)`
	margin: auto 15px;
	padding:0px;
	font-family: Proxima Nova;
	font-style: normal;
	font-weight: bold;
	font-size: 11px;
	line-height: 13px;
	text-transform: uppercase;
`;
// const Span = styled.span`
// 	color: '#232323', 
// 	text-transform: 'uppercase',
// 	font-size: "11px",
// 	font-weight:"bold",
// 	line-height: "13px",
// 	margin:auto;
// `;

export default Fasilitas


// <Col md="2/3" className="p-0" style={{margin:"34px 0px"}} key={d.id}>
// 		<Row className="mx-0">
// 			<Col sm="3" style={{paddingTop:"15px", paddingBottom:"15px", paddingLeft:"0"}}>
// 				<img src={d.img} style={{width: '40px'}} alt={d.caption.replace(" ", "-")} />
// 			</Col>
// 			<Col style={{margin:"auto 5px", paddingRight:"0px"}}>
// 				<span style={span}>{d.caption}</span>
// 			</Col>
// 		</Row>
// </Col>