import React, { Component } from 'react'
import './assets/css/style.css'
import Slider from 'react-slick'
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const settings = {
    dots: false,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

class VirtualApartement extends Component {
    constructor(props){
        super(props)
        this.state={
            indexActive:0
        }
        this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
    }
    next() {
		this.slider.slickNext()
	}
	previous() {
		this.slider.slickPrev()
    }
    componentDidMount(){
        if (window.location.href === 'https://themajbekasi.com/#virtual-tour') {    
            let el = document.getElementById('virtual-tour');
            el.scrollIntoView();
        }
    }
    render(){
        return(
            <div className="bg-grey my-10 py-10" id="virtual-tour">
                <div className="container">
                    <div>
                        <h1 className="my-5 text-center">Tur Virtual Apartemen</h1>
                    </div>
                    <Slider 
                        {...settings} 
                        ref={c => (this.slider = c)}
                        afterChange={(index) => this.setState({ indexActive: index })}
                    >
                        {this.props.data.map((data, i) => {
                            return(
                                <div>
                                    <iframe key={i} width="100%" height="480px" src={data.link} ></iframe>
                                </div>
                            )
                        })}
                    </Slider>
                    <div className="mt-10">
                        {this.props.data.map((item, i) => {
                            if(i === this.state.indexActive){
                                return (
                                    <Row className="justify-content-center">
                                        <Col sm={1} className="text-center on-mobile-hide">
                                            <Buttons onClick={this.previous}><i className="fa fa-chevron-left"></i></Buttons>
                                        </Col>
                                        <Col sm={4} className="text-center">
                                            <p style={{ fontSize: "14px", lineHeight: "16px", textTransform: "uppercase", color: "#000000", marginBottom: "30px", fontWeight: "bold" }}>
                                                {item.name}
                                            </p>
                                            <p style={{ fontSize: "14px", lineHeight: "16px", color: "#000000" }}> {i + 1} | {this.props.data.length} </p>
                                        </Col>
                                        <Col sm={1} className="text-center on-mobile-hide">
                                            <Buttons onClick={this.next}><i className="fa fa-chevron-right"></i></Buttons>
                                        </Col>
                                    </Row>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
const Buttons = styled.button(
	props=>({
		display: "inline-block",
		transition: ".3s all",
		width: "40px",
		height: "40px",
		background: "none",
		color: "#000000",
		textDecoration: "none",
		borderRadius: "50%",
		'&:hover': {
			background: "#cc9980",
			color: "#fff"
		},
		'&:focus': {
			outline:"none",
		},
		
	})
)

export default VirtualApartement

VirtualApartement.defaultProps = {
    data:[
            {
                name:"Lobby R 02",
                // link:"https://poly.google.com/view/3I5SHJ3nUJ0/embed?chrome=min",
                link:"https://ixm9s6vov2be0r7wfzh3cw-on.drv.tw/Lobby/index.htm"
            },
            {
                name:"Pool",
                link:"https://poly.google.com/view/eqDVNcBA-tr/embed?chrome=min"
            },
            {
                name:"Studio A & B",
                link:"https://my.matterport.com/show/?m=QkKWVhwxX8V&brand=0"
            },
            {
                name:"Studio 2 Bedroom",
                link:"https://my.matterport.com/show/?m=8Hq58emEwf6"
            }
        ]
}