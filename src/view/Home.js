import React, { Component, createRef, lazy } from 'react'
import { getNavbar, getSliders, getUnits, getGallery, getPartnership, getLocation, getAbouts, getBlogs } from '../services/get'
import {storeContact, storeSubscribe} from '../services/post'

import { OnDesktop, OnMobileAndTablet } from '../constants'

// COMPONENT
const DenahUnit = lazy(() => import('../component/tab/DenahUnit'))
const Maps = lazy(() => import('../component/map/Maps'))
const Gallery = lazy(() => import('../component/slider/Gallery'))
const LogoSlider = lazy(() => import('../component/slider/LogoSlider'))
const ContactUs = lazy(() => import('../component/contact-us/ContactUs'))
const TentangKami = lazy(() => import('../component/card/TentangKami'))
const Blogs = lazy(() => import('../component/card/Blogs'))
const MobileHeaderSlider = lazy(() => import('../component/slider/mobile/HeadSlider'))
const MobileFasilitas = lazy(() => import('../component/fasilitas/mobile/Fasilitas'))
const MobileDenahUnit = lazy(() => import('../component/tab/mobile/DenahUnit'))
const MobileGallery = lazy(() => import('../component/slider/mobile/Gallery'))
const MobileAboutSlider = lazy(() => import('../component/slider/mobile/AboutSlider'))
const MobileBlogs = lazy(() => import('../component/card/mobile/Blogs'))
const MobileContactUs = lazy(() => import('../component/contact-us/MobileContactUs'))
const MobileMaps = lazy(() => import('../component/map/mobile/Maps'))
const HeadSlider = lazy(() => import('../component/slider/HeadSlider'))
const Fasilitas =  lazy(() => import('../component/fasilitas/Fasilitas'))
const VirtualApartement = lazy(() => import('../component/slider/VirtualApartement'))

class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			navigation: [],
			sliders: [],
			gallery: [],
			units: [],
			partnership: [],
			location: [],
			blogs: [],
			errors: {
				navigation: {},
				sliders: {},
				gallery: {},
				units: {},
				partnership: {},
				location: {},
				blogs: {},
			},
			contact: {
				validated: true,
				data: {},
				success:false,
				errors:false,
			},
			sentLoading:false,
			footer: {
				validated: false,
				data: {},
				success:false,
				errors:false,
			}
		}
		this.contrefgelar = createRef()
		this.contrefnama = createRef()
		this.contrefunit = createRef()
		this.contreftelepon = createRef()
		this.contrefemail = createRef()
		this.contrefcatatan = createRef()
		this.footreftitle = createRef()
		this.footrefname = createRef()
		this.footrefemail = createRef()

		this.scrollFasilitas = createRef()
		this.scrollDenahUnit = createRef()
		this.scrollGaleri = createRef()
		this.scrollMap = createRef()
		
		this.formRef = createRef()

		this._contactUs = this._contactUs.bind(this)
		this._footer = this._footer.bind(this)
	}

	componentDidMount(){
		const promiseNavbar = Promise.resolve(
			getNavbar()
			.then(res => this.setState({ navigation: res.data }))
			.catch((err) => {
			  if (err && err.response) this.setState({ errors: { navigation: { code: err.response.status, status: err.response.statusText } } })
			})
		  )
	  
		  const promiseSlider = Promise.resolve(
			getSliders()
			.then((res) => this.setState({ sliders: res.data }))
			.catch((err) => {
			  if (err && err.response) this.setState({ errors: { sliders: { code: err.response.status, status: err.response.statusText } } })
			})
		  )
	  
		  const promiseUnit = Promise.resolve(
			getUnits()
			.then(res => this.setState({ units: res.data }))
			.catch(err => {
			  if (err && err.response) this.setState({ errors: { units: err.response.status, status: err.response.statusText } })
			})
		  )
	  
		  const promiseGaleri = Promise.resolve(
			getGallery()
			.then(res => this.setState({ gallery: res.data }))
			.catch((err) => {
			  if (err && err.response) this.setState({ errors: { gallery: { code: err.response.status, status: err.response.statusText } } })
			})
		  )
	  
		  const promisePartner = Promise.resolve(
			getPartnership()
			.then(res => this.setState({ partnership: res.data }))
			.catch((err) => {
			  if (err && err.response) this.setState({ errors: { partnership: { code: err.response.status, status: err.response.statusText } } })
			})
		  )
	  
		  const promiseLocation = Promise.resolve(
			getLocation()
			.then(res => this.setState({ location: res.data }))
			.catch((err) => {
			  if (err && err.response) this.setState({ errors: { location: { code: err.response.status, status: err.response.statusText } } })
			})
		  )
		  
		  const promiseAbout = Promise.resolve(
			getAbouts()
			.then(res => this.setState({ abouts: res.data }))
			.catch((err) => {
			  if (err && err.response) this.setState({ errors: { abouts: { code: err.response.status, status: err.response.statusText } } })
			})
		  )
	  
		  const promiseBlog = Promise.resolve(
			getBlogs()
			.then(res => this.setState({ blogs: res.data }))
			.catch((err) => {
			  if (err && err.response) this.setState({ errors: { blogs: { code: err.response.status, status: err.response.statusText } } })
			})
		  )
	}

	_contactUs = (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
		  this.setState({ contact: { validated: false } });
		  e.preventDefault();
		  e.stopPropagation();
		}
	
		const data = {
		  gelar: this.contrefgelar.current.value,
		  saya_ingin: this.contrefunit.current.value,
		  nama_lengkap: this.contrefnama.current.value,
		  nomor_telpon: this.contreftelepon.current.value,
		  email: this.contrefemail.current.value,
		  catatan: this.contrefcatatan.current.value
		}
		this.setState({
		  sentLoading: true,
		})
		
		storeContact(data)
		  .then((res)=>{
			this.setState({
				sentLoading:false,
				contact:{
				  success:true,
				}
			})
			setTimeout(function(){
				this.setState({contact:{success:false}});
			}.bind(this),5000);
		  })
		  .catch((err) => {
			this.setState({
			  sentLoading:false,
			  contact:{
				errors:true,
			  }
			})
		  })
		e.preventDefault();
	  }

	  _footer = (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
		  this.setState({ footer: { validated: true } });
		  e.preventDefault();
		  e.stopPropagation();
		}
	
		const data = {
		  gelar: this.footreftitle.current.value,
		  name: this.footrefname.current.value,
		  email: this.footrefemail.current.value
		}
		this.setState({
		  sentLoading: true,
		})
		e.preventDefault()
		storeSubscribe(data)
		  .then((res)=>{
			this.setState({
				sentLoading:false,
				footer:{
				  success:true,
				}
			})
		  })
		  .catch((err) => {
			this.setState({
			  sentLoading:false,
			  footer:{
				errors:true,
			  }
			})
		  })
		e.preventDefault();
	}

	render() {
		return (
			<div>
				{/* <LoaderSpinnerData show={this.state.sentLoading} /> */}
				<OnDesktop>
					<section>
						<div className="container">
							<HeadSlider store={this.state.sliders} errors={this.state.errors.sliders} />
						</div>
					</section>

					<section>
						<div className="container">
							<Fasilitas id="fasilitas" fasilitasRef={this.scrollFasilitas} />
						</div>
					</section>

					<section>
						<div className="container">
							<DenahUnit id="denah-unit" store={this.state.units} denahUnitRef={this.scrollDenahUnit} />
						</div>
					</section>

					<section>
						<div className="container">
							<Maps id="lokasi" store={this.state.location} lokasiRef={this.scrollMap} />
						</div>
					</section>

					<section>
						<div className="w-100">
							<Gallery id="galeri" store={this.state.gallery} galeriRef={this.scrollGaleri} />
						</div>
					</section>

					<section>
						<div className="container">
							<TentangKami id="tentangkami" />
						</div>
					</section>

					<section>
						<div className="w-100">
							<LogoSlider store={this.state.partnership} errors={this.state.errors.partnership} />
						</div>
					</section>

					<section>
						<Blogs store={this.state.blogs} />
					</section>

					{/* <section>
						<div className="w-100">
							<VirtualApartement />
						</div>
					</section> */}

					<section>
						<div className="container">
							<ContactUs
								id="contact-us"
								onSubmit={this._contactUs}
								gelarRef={this.contrefgelar}
								namaRef={this.contrefnama}
								unitRef={this.contrefunit}
								teleponRef={this.contreftelepon}
								emailRef={this.contrefemail}
								catatanRef={this.contrefcatatan}
								validated={this.state.contact.validated}
								success={this.state.contact.success}
								errors={this.state.contact.errors}
							/>
						</div>
					</section>
				</OnDesktop>

				{/* Mobile Table Responsive */}
				<OnMobileAndTablet>
					<section>
						<div className="container">
							<MobileHeaderSlider store={this.state.sliders} />
						</div>
					</section>

					<section>
						<div className="container">
							<MobileFasilitas id="fasilitas" fasilitasRef={this.scrollFasilitas} />
						</div>
					</section>

					<section>
						<MobileDenahUnit id="denah-unit" store={this.state.units} />
					</section>

					<section>
						<div className="container">
							<MobileMaps id="lokasi" store={this.state.location} lokasiRef={this.scrollMap} />
						</div>
					</section>

					<section>
						<MobileGallery id="galeri" galeriRef={this.scrollGaleri} store={this.state.gallery} />
					</section>

					<section>
						<MobileAboutSlider store={this.state.abouts} />
					</section>

					<section>
						<MobileBlogs store={this.state.blogs} />
					</section>

					{/* <section>
						<div className="w-100">
							<VirtualApartement />
						</div>
					</section> */}

					<section>
						<MobileContactUs
							id="contact-us"
							onSubmit={this._contactUs}
							gelarRef={this.contrefgelar}
							namaRef={this.contrefnama}
							unitRef={this.contrefunit}
							teleponRef={this.contreftelepon}
							emailRef={this.contrefemail}
							catatanRef={this.contrefcatatan}
							validated={this.state.contact.validated}
							success={this.state.contact.success}
							errors={this.state.contact.errors}
						/>
					</section>
				</OnMobileAndTablet>
			</div>
		)
	}
}

export default Home