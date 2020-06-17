import React, { Component } from 'react'
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'
import logo from '../../../assets/logo.svg'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export class NavigationBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isTop: false,
		}
		this.onScroll = this.onScroll.bind(this);
	}
	componentDidMount() {
		document.addEventListener('scroll', () => {
			const isTop = window.scrollY > 100
			if (isTop !== this.state.isTop) {
				this.onScroll(isTop)
			}
		})
	}
	onScroll(isTop) {
		this.setState({ isTop })
	}

	onClickScollTop = () => {
		window.scrollTo({
			top:0,
		})
	}

	render() {
		return (
			<Navbar expand="lg" className={`justify-content-between align-items-center ${this.state.isTop ? "nav-fixed-top" : "nav-fixed-null"}`}>
				<div className="container-2 p-0" >
					<Navbar.Collapse id="basic-navbar-nav">
						<Navbar.Brand>
							<Link to="/" onClick={() => this.onClickScollTop}>
								<img src={logo} alt="logo" style={{
									maxWidth: this.state.isTop ? "120px" : "150px",
									width: "100%",
								}} />
							</Link>
						</Navbar.Brand>
						<Nav className="mx-auto">

							{this.props.store.map((item,i) => {
								return (
										<li className="nav-item">
											<a key={i} href={item.link} className="nav-link">
												<H5 color={this.state.isTop ? "#fff" : "#232323"}>{item.name}</H5>
											</a>
										</li>
									)
							}
							)}

							<li className="nav-item">
								<a href="#virtual-tour" className="nav-link">
									<H5 color={this.state.isTop ? "#fff" : "#232323"}>Tur Virtual</H5>
								</a>
							</li>

							<MyNavDropdown color={this.state.isTop ? "#fff" : "#232323"} title="Visi" id="basic-nav-dropdown">
								<NavDropdown.Item href="/tentang-kami">Visi</NavDropdown.Item>
								<NavDropdown.Item href="/expertise">Expertise</NavDropdown.Item>
							</MyNavDropdown>


						</Nav>
						<Nav style={{margin: "-5px 0 0 0", padding: "0"}}>
							<a className="nav-link" href="/#contact-us">
								<ButtonS
									bg={this.state.isTop ? "#fff" : "#12284C"}
									padding={this.state.isTop ? "7px 30px" : "8px 30px"}
									color={this.state.isTop ? "#CC9980" : "#fff"}
								>
									Hubungi Kami
							</ButtonS>
							</a>
						</Nav>
					</Navbar.Collapse>
				</div>
			</Navbar>
		)
	}
}


export class MobileNavigationBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showing: false,
			isTop: false,
		};
		this.onScroll = this.onScroll.bind(this);
	}

	componentDidMount() {
		document.addEventListener('scroll', () => {
			const isTop = window.scrollY > 100
			if (isTop !== this.state.isTop) {
				this.onScroll(isTop)
			}
		})
	}
	onScroll(isTop) {
		this.setState({ isTop })
	}
	onClickHideAndScroll(){
		this.setState((prevState)=>({showing: !prevState.showing}))
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
	}

	render() {
		const { showing } = this.state
		const { store } = this.props
		return (
			<Navbar className={this.state.isTop ? "nav-fixed-top" : "nav-fixed-null"}>
				<div className="container-fluid">
					<Button className="position-absolute bg-transparent border-0" onClick={() => this.setState({ showing: !showing })}><i style={{ color: "#CC9980", fontSize: 22 }} className="fas fa-bars"></i></Button>
					<Navbar.Brand className="mx-auto">
						<Link to="/">
							<img src={logo} alt="logo" style={{
								maxWidth: this.state.isTop ? "90px" : "140px",
								transition: ".3s all",
								width: "100%",
							}} />
						</Link>
					</Navbar.Brand>
					<SideNav style={{ width: (showing ? "100%" : "0") }} id="mySidenav">
						<Link to="/" onClick={()=>this.onClickHideAndScroll}>
							<img src={logo} alt="logo" style={{
								maxWidth: "142px",
								width: "100%",
								marginLeft: "15px",
							}} />
						</Link>
						<hr />
						<SideNavCloseBtn onClick={() => this.setState({ showing: !showing })}>&times;</SideNavCloseBtn>
						{store && store.map((item, i) => {
							return (
								<SideNavLink
									onClick={() => this.setState({ showing: !showing })} key={i}
								>
									<a key={i} href={item.link}><h3>{item.name}</h3></a>
									{/* <Link
										id={`nav-${item.name.replace(/\s/g, "-").toLowerCase()}`}
										to={{
											pathname: item.link.length === 1 ? `${item.link}section/#${ItemName}` : item.link,
										}}
									>
										<h3>{item.name}</h3>
									</Link> */}
								</SideNavLink>
							)
						})}
					</SideNav>
				</div>
			</Navbar>
		)
	}
}

const H5 = styled.h5`
font-family: Gilroy Bold !important;
font-weight: normal;
font-size: 11px;
margin-bottom: 0px;
color: ${props => props.color}
`;

const MyNavDropdown = styled(NavDropdown)`
	& > a {
		font-family: Gilroy Bold !important;
		font-weight: normal !important;
		font-size: 11px !important;
		margin-bottom: 0px !important;
		color: ${props => props.color} !important;
		text-transform: uppercase;
		line-height: 28px;
  		letter-spacing: 2px;
	}
`;

const SideNav = styled.div`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 35;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 15px;
`;

const SideNavLink = styled.li`
  padding: 8px 8px 8px 32px;
  margin-bottom: 22px;
  text-decoration: none;
  display: block;
  transition: 0.3s;
  '&:hover':{
    color: #f1f1f1;
  }
`;

const SideNavCloseBtn = styled.a`
  position: absolute;
  top: 2%;
  right: 5%;
  font-size: 40px;
  margin-left: 50px;
`;

const ButtonS = styled.button`
  background: ${props => props.bg};
  font-family: Verlag Bold !important;
  padding: ${props => props.padding};
  text-transform: uppercase;
  font-style: normal;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 12px;
  line-height: 18px;
  color: ${props => props.color};
`;