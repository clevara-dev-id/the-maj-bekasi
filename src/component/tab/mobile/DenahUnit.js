import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import Slider from "react-slick"
import styled from 'styled-components'
import $ from 'jquery'

import Base from './Base'
import MobileReviewUnit from './ReviewUnit'
import MobileSimulasi from './Simulasi'
import { BaseUrl } from '../../../services/axios'

import dots from '../assets/dots.svg'
import TabThreeSixty from '../TabThreeSixty'


export class DenahUnit extends Base {
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
            }
        }
        return null
    }

    componentDidMount() {
        setTimeout(() => {
            $(`#studio-a`).css({"display": "block"})
        }, 3000)
    }

    render() {
        if(this.state.isLoading){
            return(
                <>
                <div id={this.props.id} ref={this.props.denahUnitRef} className="container" style={{paddingLeft:"26px", paddingRight:"26px", marginBottom:"30px", marginTop:"110px"}}>
                    <h5>Tipe Unit</h5>
                    <h1>Hunian Fleksibel Untuk Generasi ‘Zaman Now’</h1>
                </div>
                <div id="mobile-denahunit" className="container" style={{ backgroundColor: "#e9e9e9", paddingTop:"23px" }}>
                    <div style={{width:"100%", height:"350px"}}></div>
                </div>
                </>
            )
        }
        return (
            <>
                <div id={this.props.id} ref={this.props.denahUnitRef} className="container" style={{paddingLeft:"26px", paddingRight:"26px", marginBottom:"30px", marginTop:"110px"}}>
                    <h5>Tipe Unit</h5>
                    <h1>Hunian Fleksibel Untuk Generasi ‘Zaman Now’</h1>
                </div>
                <div id="mobile-denahunit" className="container" style={{ backgroundColor: "#e9e9e9", paddingTop:"23px" }}>
                    <Caps2 margin="26px 0 0 0">Pilih Unit</Caps2>
                    <Form.Group className="position-relative selectField" style={{width:"max-content", margin:"0px auto"}} controlId="unitField">
                    <Form.Control
                        style={Select}
                        as="select"
                        onChange={(e) => this._handleSelect(e)}
                        default
                        className="fs-22"
                    >
                        {this.state.localStore.length && this.state.localStore.map((data, i) => (
                            <Options
                                key={i}
                                id={!i ? "defaultSelect" : null}
                                className="tablinks"
                                value={data.unit_name.toLowerCase().replace(/\s/g, "-")}
                                defaultValue="studio-a"
                            >
                                {data.unit_name}
                            </Options>
                        ))}
                    </Form.Control>
                    </Form.Group>

                    {this.state.localStore.length && this.state.localStore.map((d, i) => (
                        <div key={d.id} style={{ margin: "0 auto", display:"none" }} id={d.unit_name.toLowerCase().replace(/\s/g, "-")} className="unitContent">
                            <Luas>{d.specs.luas} M<sup>2</sup></Luas>
                            <div>
                                <Slider
                                    dots={true}
                                    slidesToShow={1}
                                    swipeToSlide={true}
                                    lazyLoad={true}
                                    autoplay={true}
                                    arrows={false}
                                    autoplaySpeed={5000}
                                    speed={1000}
                                    pauseOnHover={true}
                                >
                                    <div>
                                        <img
                                            src={BaseUrl + '/storage/' + d.specs.denah_ruang.replace(/\\/g, "/")}
                                            style={{
                                                margin: "auto",
                                                height: "228px",
                                                transform: "rotate(90deg)"
                                            }}
                                            alt="denah ruang"
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src={BaseUrl + '/storage/' + d.specs.denah_bangunan.replace(/\\/g, "/")}
                                            style={{
                                                margin: "auto",
                                                width: "228px",
                                            }}
                                            alt="denah bangunan"
                                        />
                                    </div>
                                </Slider>
                            </div>
                            <div id="mobile-spec" title="SPESIFIKASI" style={{ padding: 20 }}>
                                <Caps2 margin="37px 0px">spesifikasi</Caps2>
                                <div>
                                    <ul style={{
                                        height: "120px",
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        flexWrap: "wrap",
                                        margin: "0",
                                        padding: "0",
                                        boxSizing: "border-box"
                                    }}>
                                        {d.room_list.map((data,index) => (
                                            <Li key={index}>{data.name}</Li>
                                        ))}
                                    </ul>
                                </div>

                                <div title="PREVIEW" style={{ margin: "77px 0" }}>
                                    <MobileReviewUnit storeReview={d.gallery} frame={d.embed_links} />
                                </div>
                                <div title="360 VIEW">
                                    {/* <TabThreeSixty frame={d.embed_links} /> */}
                                </div>
                                <div title="SIMULASI" style={{ margin: "77px 0" }}>
                                    <MobileSimulasi namaUnit={d.unit_name} hargaUnit={d.unit_price} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }
}

// style
const Luas = styled.p(
    props => ({
        fontFamily: "Frank Ruhl Libre",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "13px",
        textAlign: "center",
        color: "#000000",
        margin: props.margin,
        padding: props.padding
    })
)

const Caps2 = styled.h6(
    props => ({
        textAlign: "center",
        fontSize:"11px",
        textTransform:"uppercase",
        margin: props.margin,
    })
)

const Select = {
    backgroundColor: "transparent",
    width: "100%",
    height: "auto",
    border: "0",
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "9px auto 11px auto"
}
const Li = styled.li`
    padding:0;
    max-width:124px;
    margin-bottom:10px;
    list-style-type:none;
    &:before{
        content: url(${dots});
        padding-right:4px;
        display:inline-block
    }
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    line-height: 13px;
    text-transform: uppercase;
    color: #2D2D2D;
    display: flex;
`;
const Options = styled.option`
    font-seight: bold;
    line-height: 28px;
    color: #000000;
`;
export default DenahUnit
