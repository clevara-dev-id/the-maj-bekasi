import React, { Component } from 'react'
import { Form, Col } from 'react-bootstrap'

export default class MobileContactForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            storeUnit: ['Saya Ingin','Membeli Unit','Mendapatkan Info Lebih','Melihat Price List','Mengunduh E-Brosur'],
            gelar: null,
            nama: null,
            unit: null,
            telepon: null,
            email: null,
            catatan: null
        }
    }
    
    render() {
        return (
            // add this to validation
            // 
            <Form id="contactUs" onSubmit={this.props.onSubmit} validated={this.props.validated}>
                <Form.Row>
                    <Form.Group className="selectField" as={Col} xs="4" id="gelarField">
                        <Form.Control 
                            size="lg"
                            as="select"
                            value={this.state.gelar || ''}
                            ref={this.props.gelarRef} 
                            onChange={(e) => this.setState({gelar: e.target.value})}>
                            <option disabled={this.state.gelar? 'disabled': null}>Gelar</option>
                        {this.props.storeGelar && this.props.storeGelar.map((d, i) => (
                            <option key={i+1} value={d.nama}>{d.nama}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs="8" id="namaField">
                        <Form.Control
                            size="lg"
                            ref={this.props.namaRef}
                            type='text'
                            placeholder="Nama Lengkap Anda" 
                            value={this.state.nama  || ''} 
                            onChange={(e) => this.setState({nama:e.target.value})} 
                            required
                            pattern="[a-zA-Z ]+"
                            // isInvalid={this.state.nama === null? false: this.state.nama.length? false: true}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                            Harap Masukkan Nama
                        </Form.Control.Feedback> */}
                    </Form.Group>
                </Form.Row>
                <Form.Group className="position-relative selectField" id="unitField">
                    <Form.Control
                        as="select" 
                        ref={this.props.unitRef} 
                        onChange={(e) => this.setState({unit: e.target.value})}  
                        value={this.state.unit || ''} 
                        required
                        // isInvalid={this.state.unit === null? false: this.state.unit.length? false: true}
                    >
                        <option disabled={this.state.unit? 'disabled': null}>Saya Ingin</option>
                        {this.state.storeUnit && this.state.storeUnit.map((d, i) => (
                            <option key={i+1} value={d} disabled={d === "Saya Ingin"}>{d}</option>
                        ))}
                    </Form.Control>
                    {/* <Form.Control.Feedback type="invalid">
                        Harap Pilih Salah Satu
                    </Form.Control.Feedback> */}
                </Form.Group>
                    <Form.Group id="teleponField">
                        <Form.Control 
                            size="lg"
                            ref={this.props.teleponRef}
                            type="tel"
                            inputMode="tel"
                            pattern="[0-9]{10,}"
                            placeholder="Nomor Telepon Anda" 
                            value={this.state.telepon || ''} 
                            onChange={(e) => this.setState({telepon: e.target.value})}
                            required
                            // isInvalid={this.state.telepon === null? false: this.state.telepon.length? false: true}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                            Harap Masukkan Nomor Telpon. <br/> Format: (0-9)
                        </Form.Control.Feedback> */}
                    </Form.Group>
                    <Form.Group id="emailField">
                        <Form.Control 
                            size="lg"
                            ref={this.props.emailRef}
                            type="email" 
                            placeholder="Alamat Email Anda" 
                            value={this.state.email || ''}
                            onChange={(e) => this.setState({email: e.target.value})}
                            required
                            // isInvalid={this.state.email === null? false: this.state.email.length? false: true}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                            Harap Masukkan Alamat E-mail
                        </Form.Control.Feedback> */}
                    </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} sm="12" id="catatanField">
                        <Form.Control
                            size="lg"
                            ref={this.props.catatanRef}
                            as="textarea" 
                            placeholder="Catatan" 
                            rows="3"
                            value={this.state.catatan || ''}
                            onChange={(e) => this.setState({catatan: e.target.value})} 
                        />
                    </Form.Group>
                    {this.props.children}
                </Form.Row>
            </Form>
        )
    }
}
