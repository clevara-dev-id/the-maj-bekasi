import React, { Component } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import DropdownCicilan from '../DropdownCicilan'
import DropdownKredit from '../DropdownKredit'
import DropdownBunga from '../DropdownBunga'


export class Simulasi extends Component {
    render() {
        return (
            <D backgroundColor="#12284C" padding="10%">
                <h2 style={{
                    color: '#FFFFFF',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: 22,
                    textAlign: 'center',
                    textTransform: 'uppercase'
                }}>
                    Simulasi KPA Studio A
                </h2>
                <h3 style={{
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fontSize: 17,
                        textAlign: 'center',
                        color: '#CC9980'
                }}>
                    Estimasi Cicilan Bulanan
                </h3>
                <h1 style={{
                    color: '#FFFFFF',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: 34,
                    textAlign: 'center',
                }}>
                    IDR 18.046.057
                </h1>

                <div style={{margin: "67px auto", maxWidth:800}}>
                    <Row>
                        <Col style={{marginBottom:"53px"}} ><p>Harga Unit</p></Col>
                        <Col style={{marginBottom:"53px"}}><p>IDR 263.500.000</p></Col>
                        <Col style={{marginBottom:"53px"}}><p>Cicilan DP</p></Col>
                        <Col style={{marginBottom:"53px"}}>
                            <DropdownCicilan
                                value={this.state.cicilan}
                                // defaultValue={12}
                                onChange={(e) => this.setState({cicilan: e.target.value})}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginBottom:"53px"}}><p>DP 20%</p></Col>
                        <Col style={{marginBottom:"53px"}}><p>IDR 52.700.000</p></Col>
                        <Col style={{marginBottom:"53px"}}><p>Tenor Kredit</p></Col>
                        <Col style={{marginBottom:"53px"}}>
                            <DropdownKredit
                                value={this.state.kredit}
                                // defaultValue={1}
                                onChange={(e) => this.setState({kredit: e.target.value})}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginBottom:"53px"}}><p>Jumlah Pinjaman</p></Col>
                        <Col style={{marginBottom:"53px"}}><p>IDR 210.800.000</p></Col>
                        <Col style={{marginBottom:"53px"}}><p>Bunga</p></Col>
                        <Col style={{marginBottom:"53px"}}>
                            <DropdownBunga
                                value={this.state.bunga}
                                // defaultValue={5}
                                onChange={(e) => this.setState({bunga: e.target.value})}
                            />
                        </Col>
                    </Row>
                </div>
            </D>
        )
    }
}

export default Simulasi


const D = styled.div(
    props => ({
        padding: props.padding,
        margin: props.margin,
        backgroundColor:  props.backgroundColor,
        /* backgroundColor: '#12284C', */
        // boxSizing: 'border-box',
        // border: '1px solid',
        height: "auto"
    })
)
