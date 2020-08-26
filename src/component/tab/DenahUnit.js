import React, { Component } from 'react'
import styled from 'styled-components'
import { Tabs, Tab, Row, Col } from 'react-bootstrap'

import TabGallery from '../slider/TabGallery'
import {TabSpesifikasi} from './TabSpesifikasi'
import TabSimulasi from './TabSimulasi'

import dots from './assets/dots.svg'
import './assets/style.css'
import Skeleton from '../base/skeleton'
// import TabThreeSixty from './TabThreeSixty'

class DenahUnit extends Component {
	constructor(props) {
		super(props)

		this.state = {
			cicilan: 0,
			kredit: 0,
			bunga: 0,
			isLoading: true,
			localStore: [],
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.store.length !== prevState.localStore.length) {
			return {
				localStore: nextProps.store,
				isLoading: false
			}
		}
		return null
	}

	render() {
		if (this.state.isLoading){
			return(
				<div style={{paddingTop: "150px"}} id={this.props.id} ref={this.props.denahUnitRef}>
					<div className="container-2">
						<h5>Tipe Unit</h5>
						<h1 style={{width: "323px"}}>Hunian Fleksibel Untuk Generasi 'Zaman Now'</h1>
					</div>
					<Tabs
						style={{ marginTop: 40 }}
						id="table"
					>
						<Tab
							style={{ padding: "43px 60px", backgroundColor: "#e9e9e9", minHeight:"680px" }}
							eventKey="loading"
							title="Loading..."
						>
							<div id="spec">
								<Tabs
									defaultActiveKey="loading1">
									<Tab
										eventKey="loading1"
										title="SPESIFIKASI">
										<Row
											id="#data"
											style={{ marginTop: 127 }}>
											<Col sm={6}>
												<div style={{marginBottom:"50px"}}>
													<H1> Loading... </H1>
													<H5 style={{ fontSize: 16 }}> loading... </H5>
												</div>
												<Row>
													<Col>
														<ul style={{
															width: "100%",
															margin: "0",
															padding: "0",
															columnCount:2
														}}>
															
															<Li> loading... </Li>
														</ul>
													</Col>
												</Row>
											</Col>
											<Col xs={3}>
												<Skeleton width="100%" height="340px"></Skeleton>
											</Col>
											<Col xs={3}>
												<div style={{position: "absolute", bottom: "0"}}>
													<Skeleton width="100%" height="150px"></Skeleton>
												</div>
											</Col>
										</Row>
									</Tab>
								</Tabs>
							</div>
						</Tab>
					</Tabs>
				</div>
			)
		}
		return (
			<>
				<div style={{ paddingTop: 150 }} id={this.props.id} ref={this.props.denahUnitRef}>
					<div className="container-2">
						<h5>Tipe Unit</h5>
						<h1 style={{width: "323px"}}>Hunian Fleksibel Untuk Generasi 'Zaman Now'</h1>
					</div>
					<Tabs
						style={{ marginTop: 40 }}
						defaultActiveKey={this.state.localStore[0].unit_name.toLowerCase().replace(/\s/g, "-")}
						id="table"
					>
						{this.state.localStore.length && this.state.localStore.map((item, i) => (
							<Tab
								style={{ padding: "43px 60px", backgroundColor: "#e9e9e9", minHeight:"680px" }}
								key={item.id}
								eventKey={item.unit_name.toLowerCase().replace(/\s/g, "-")}
								title={item.unit_name}>
								<div id="spec">
									<Tabs
										defaultActiveKey={Object.keys(this.state.localStore[i])[5]}>
										<Tab
											eventKey={Object.keys(this.state.localStore[i])[5]}
											title="SPESIFIKASI">
											<TabSpesifikasi 
												unitName={item.unit_name}
												items={item.specs}
												list={item.room_list}
											/>
										</Tab>
										<Tab
											eventKey={Object.keys(this.state.localStore[i])[6]}
											title="PREVIEW UNIT">
											<TabGallery images={item.gallery} />
										</Tab>
										{/* <Tab
											eventKey={Object.keys(this.state.localStore[i])[2]}
											title="360 VIEW"
										>
											<TabThreeSixty frame={item.embed_links} />
										</Tab> */}
										<Tab
											eventKey={Object.keys(this.state.localStore[i])[3]}
											title="SIMULASI KPA">
											<TabSimulasi 
												hargaUnit={item.unit_price}
											/>
										</Tab>
									</Tabs>
								</div>
							</Tab>
						))}
					</Tabs>
				</div>
			</>
		)
	}
}

const Li = styled.li`
    padding:0;
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
`;
const H1 = styled.h1`
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    color: #C3C7D1;
    margin-bottom:10px;
`;
const H5 = styled.h5`
    font-family: Proxima Nova !important;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
    color: #000000;
`;
export default DenahUnit
