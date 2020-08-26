import React, { Component } from "react";
import Slider from "react-slick";
import { BaseUrl } from "../../services/axios";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

export default class TabGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {

    const NextArrow = (props) => {
      const { className, style, onClick } = props;
      const Arrows = styled.div({
        display: "inline-block",
        width:"28px",
        height:"28px",
        background:"rgba(255, 255, 255, 0.2)",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "50%",
        boxShadow: "0px 20px 60px rgba(138, 149, 158, 0.2)",
        top:"110px        ",
        left:"7%",
        '&:hover': {
          background:"#ffffff",
          color: "#000"
        },
        '&:before': {
          padding: "5px",
          borderRight: "2px solid",
          borderBottom: "2px solid",
          borderRadius: "0",
          content: `'' !important`,
          display: "block",
          top: "30%",
          right: "35%",
          position: "absolute",
          '-moz-transform': "rotate(310deg)",
          '-o-transform': "rotate(310deg)",
          '-webkit-transform': "rotate(310deg)",
          transform: "rotate(310deg)",
          color:"inherit"
        }
      });
      return (
        <Arrows
          className={className}
          style={{ 
            ...style,
          }}
          onClick={onClick}
        />
      );
    }
    
    const PrevArrow = (props) => {
      const { className, style, onClick } = props;
      const Arrows = styled.div({
        display: "inline-block",
        width:"28px",
        height:"28px",
        background:"rgba(255, 255, 255, 0.2)",
        color: "#ffffff",
        textDecoration: "none",
        zIndex:"1",
        borderRadius:"50%",
        top:"110px",
        left:"0%",
        boxShadow: "0px 20px 60px rgba(138, 149, 158, 0.2)",
        '&:hover': {
          background:"#ffffff",
          color: "#000"
        },
        '&:before': {
          padding: "5px",
          borderRight: "2px solid",
          borderBottom: "2px solid",
          borderRadius: "0px",
          content: `'' !important`,
          display: "block",
          position: "absolute",
          top:"30%",
          left:"35%",
          '-moz-transform': "rotate(135deg)",
          '-o-transform': "rotate(135deg)",
          '-webkit-transform': "rotate(135deg)",
          transform: "rotate(135deg)",
          color:"inherit"
        }
      });
      return (
        <Arrows
          className={className}
          style={{ 
            ...style,
          }}
          onClick={onClick}
        />
      );
    }

    const Background = styled.div(
      props => (
        {
          width:"603px",
          height:"410px",
          backgroundImage:`url(${props.source})`,
          backgroundPosition:"center",
          backgroundSize:"cover",
          backgroundRepeat:"no-repeat",
        }
      ));
    
    return (
      <div style={{marginTop:"75px"}}>
        <Slider
        arrows={false}
          asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}
        >
          {this.props.images.map((item, i) =>(
            <div key={i}>
              <Row>
                <Col md="8" >
                  {/* <img style={{width:"inherit"}} src={BaseUrl + '/storage/' + item.gambar} alt={item.nama} /> */}
                  <Background source={BaseUrl + '/storage/' + item.gambar.replace(/\\/g,"/")} /> 
                </Col>
                <Col>
                  <p style={{
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "16px",
                    lineHeight: "21px",
                    color: "#12284C",
                    marginTop:"90px",
                    maxWidth:"340px"
                  }}>{item.deskripsi}</p>
                </Col>
              </Row>
            </div>
          ))}
          
        </Slider>
        <div style={{
          maxWidth:"500px",
          maxHeight:"300px",
          // position:"absolute",
          marginLeft:"50%",
          marginTop:"-25%",
        }}>
          <Slider
            asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={3}
            swipeToSlide={true}
            focusOnSelect={true}
            arrows={false}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {this.props.images.map((item, i) =>(
              <div key={i}>
                <img style={{width:"150px"}} src={BaseUrl + '/storage/' + item.gambar_mobile} alt={item.nama} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}