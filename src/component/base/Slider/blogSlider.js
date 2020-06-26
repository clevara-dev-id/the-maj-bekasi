import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Slider from 'react-slick'
import { BaseUrl } from '../../../services/axios'
import IconUser from '../../assets/tmp-blog/user.svg'
import IconCalender from '../../assets/tmp-blog/calender.svg'
import GaleriGambarLoading from '../../assets/blogs/blog-placeholder.svg'

export default class BlogSlider extends Component {
    constructor(props){
        super(props)
        this.state = {
            indexActive:0,
            localStore:[],
            isLoading:true,
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
    static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.store.length !== prevState.localStore.length) {
			return {
				localStore: nextProps.store,
				isLoading: false,
			}
		}
	}
    render(){
        if (this.state.isLoading) {
            let GaleriLoading = (args) => { let arry = new Array(); for (let i = 0; i < args; i++) { arry.push({ id: i, gambar: GaleriGambarLoading, nama: "loading" }) }; return arry }
            return (
                <Container>
                    <Breadcrumb>
                        <BreadcrumbLink to="/">Home</BreadcrumbLink> / <Span>Blog</Span>
                    </Breadcrumb>
                    <Row>
                        <Col md={8} xs={12}>
                            <Slider
                                dots={false}
                                arrows={false}
                                infinite={true}
                                speed="500"
                                slidesToShow={1}
                                slidesToScroll={1}
                            >
                                {GaleriLoading(3).map((item, i) => {
                                    return(
                                        <>
                                            <div>
                                                <div style={{width:"100%", height:"450px", backgroundColor:"#ccc"}}></div>
                                            </div>
                                        </>
                                    )
                                })}
                            </Slider>
                        </Col>
                        <Col md={4} xs={12}>
                            <div style={{width:"170px", backgroundColor:"#ccc", height:"25px", borderRadius:"500px"}}></div>
                            <div style={{width:"100%", backgroundColor:"#ccc", height:"100px", margin:"23px 0"}}></div>
                        </Col>
                    </Row>
                </Container>
            )
        }
        return (
            <>
                <Container className="container">
                    <Breadcrumb>
                        <BreadcrumbLink to="/">Home</BreadcrumbLink> / <Span>Blog</Span>
                    </Breadcrumb>
                    <Row>
                        <Col md={8} sm={12}>
                            <Slider
                                dots={false}
                                arrows={false}
                                infinite={true}
                                speed="500"
                                slidesToShow={1}
                                slidesToScroll={1}
                                afterChange={(index) => this.setState({ indexActive: index })}
                                ref={c => (this.slider = c)}
                            >
                                {this.state.localStore.length && this.state.localStore.map((data, i) => {
                                    return (
                                        <div key={i}>
                                            <img style={{ width: "100%", outline: "none", height:"460px" }} src={`${BaseUrl}/storage/${data.image.replace(/\\/g, "/")}`} alt={data.heading + "blog"} />
                                        </div>
                                    )
                                })}
                            </Slider>
                        </Col>
                        <Col md={4} sm={12}>
                            {this.state.localStore.length && this.state.localStore.map((item, i) => {
                                if (i === this.state.indexActive) {
                                    return (
                                        <>
                                            <h5> {item.categories.replace(/\,/g, " | ").replace(/[\["\]]/g, "")} </h5>
                                            <Link to={`/blog/${item.heading.toLowerCase().replace(/\s/g, "-").replace(/[%@#,*>!?"'.]/g, "")}`} ><h1 style={{ maxWidth: "350px", margin: "23px 0px", minHeight:"100px" }}> {item.heading} </h1></Link>
                                            <TruncatedText><p><strong>{item.lokasi}, {item.sumber} - </strong>{truncate(item.preview_text)}</p></TruncatedText>
                                            <Author author={item.author} /> <br/>
                                            <Posted_At posted_at={item.created_at} />
                                            <div className="position-absolute" style={{bottom:"1%"}}>
                                                <Row>
                                                    <Col className="mr-2" md={2} xs={3}><Buttons onClick={this.previous}><i className="fa fa-chevron-left"></i></Buttons></Col>
                                                    <Col className="ml-2" md={2} xs={3}><Buttons onClick={this.next}><i className="fa fa-chevron-right"></i></Buttons></Col>
                                                </Row>
                                            </div>
                                        </>
                                    )
                                }
                            })}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

const Buttons = styled.button(
	props=>({
		display: "inline-block",
		transition: ".3s all",
		width: "40px",
		height: "40px",
		background: "#cc9980",
		color: "#fff",
		textDecoration: "none",
		borderRadius: "50%",
		'&:hover': {
			background: "#cc9980",
			color: "#000"
		},
		'&:focus': {
			outline:"none",
		},
		
	})
)
const Author = (props) => (
    <>
        <img src={IconUser} alt="author" />
        <span
            style={{
                marginLeft: "8px",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#C8C8C8"
            }}>
            {props.author}
        </span>
    </>
)

const Posted_At = props => (
    <>
        <img src={IconCalender} alt="calendar" />
        <span
            style={{
                marginLeft: "8px",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#C8C8C8"
            }}
        >
            {props.posted_at}
        </span>
    </>
)
const truncate = (str) => {
    return str.length > 165 ? str.substring(0, 162) + "..." : str;
}
const Span = styled.span({
    color:"#232323", fontFamily:"Verlag Bold !important", fontSize:"14px"
})
const Breadcrumb = styled.h5({
    color:"#c8c8c8",
    textTransform:"uppercase",
    marginBottom:"76px",
    marginTop:"76px"
})

const BreadcrumbLink = styled(Link)({
    color:"#c8c8c8",
    "&:hover" : {
        color:"#c8c8c8",
        textDecoration: "none",
    }
})

const Container = styled.div({

})
const TruncatedText = styled.p({
    fontSize:"16px !important",
    fontFamily:"Proxima Nova !important",
    fontStyle:"normal !important",
    fontWeight:"bold",
    fontSize:"16px",
    lineHeight:"21px",
    color:"#000000",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": "5",
    "-webkit-box-orient": "vertical",
    "@media only screen and (max-width:375px)":{
        marginBottom:"40px"
    }
})