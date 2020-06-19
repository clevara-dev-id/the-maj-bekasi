import { Component, createRef } from 'react'
import $ from 'jquery'
import { getNavbar, getSliders, getUnits, getGallery, getPartnership, getLocation, getAbouts, getBlogs, getExpertice, getPrivacyPolicy, getSocialMedia } from '../services/get'
import {storeContact, storeSubscribe} from '../services/post'

export default class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: [],
      sliders: [],
      gallery: [],
      units: [],
      partnership: [],
      location: [],
      blogs: [],
      abouts: [],
      expertice: [],
      privacyPolicy:[],
      socialMedia:[],
      errors: {
        abouts: {},
        sliders: {},
        gallery: {},
        units: {},
        partnership: {},
        navigation: {},
        blogs: {},
        location: {},
        expertice: {},
        privacyPolicy: {},
        socialMedia: {},
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

  componentDidMount() {
    // const promiseNavbar = Promise.resolve(
    //   getNavbar()
    //   .then(res => this.setState({ navigation: res.data }))
    //   .catch((err) => {
    //     if (err && err.response) this.setState({ errors: { navigation: { code: err.response.status, status: err.response.statusText } } })
    //   })
    // )

    // const promiseSlider = Promise.resolve(
    //   getSliders()
    //   .then((res) => this.setState({ sliders: res.data }))
    //   .catch((err) => {
    //     if (err && err.response) this.setState({ errors: { sliders: { code: err.response.status, status: err.response.statusText } } })
    //   })
    // )

    // const promiseUnit = Promise.resolve(
    //   getUnits()
    //   .then(res => this.setState({ units: res.data }))
    //   .catch(err => {
    //     if (err && err.response) this.setState({ errors: { units: err.response.status, status: err.response.statusText } })
    //   })
    // )

    // const promiseGaleri = Promise.resolve(
    //   getGallery()
    //   .then(res => this.setState({ gallery: res.data }))
    //   .catch((err) => {
    //     if (err && err.response) this.setState({ errors: { gallery: { code: err.response.status, status: err.response.statusText } } })
    //   })
    // )

    const promisePartner = Promise.resolve(
      getPartnership()
      .then(res => this.setState({ partnership: res.data }))
      .catch((err) => {
        if (err && err.response) this.setState({ errors: { partnership: { code: err.response.status, status: err.response.statusText } } })
      })
    )

    // const promiseLocation = Promise.resolve(
    //   getLocation()
    //   .then(res => this.setState({ location: res.data }))
    //   .catch((err) => {
    //     if (err && err.response) this.setState({ errors: { location: { code: err.response.status, status: err.response.statusText } } })
    //   })
    // )
    
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
    
    const promisePrivacyPolicy = Promise.resolve(
      getExpertice()
      .then(res => this.setState({ expertice: res.data }))
      .catch((err) => {
        if (err && err.response) this.setState({ errors: { expertice: { code: err.response.status, status: err.response.statusText } } })
      })
    )

    const promiseExpert = Promise.resolve(
      getPrivacyPolicy()
      .then(res => this.setState({ privacyPolicy: res.data }))
      .catch((err) => {
        if (err && err.response) this.setState({ errors: { privacyPolicy: { code: err.response.status, status: err.response.statusText } } })
      })
    )

    // const promiseSocialMedia = Promise.resolve(
    //   getSocialMedia()
    //   .then(res => this.setState({ socialMedia: res.data }))
    //   .catch((err) => {
    //     if (err && err.response) this.setState({ errors: { socialMedia: { code: err.response.status, status: err.response.statusText } } })
    //   })
    // )
    
    // Promise.all([promiseNavbar, promiseSlider, promiseUnit, promiseGaleri, promisePartner, promiseLocation, promiseAbout, promiseBlog, promiseExpert, promisePrivacyPolicy, promiseSocialMedia])
    //   .then(() => {
    //     // setTimeout(()=>{
    //     //   if (this.props.match && this.props.match.path === "/") {
    //     //     document.getElementById('nav-fasilitas').addEventListener('click', this._handleClickFasilitas)
    //     //     document.getElementById('nav-denah-unit').addEventListener('click',this._handleClickDenahUnit)
    //     //     document.getElementById('nav-lokasi').addEventListener('click', this._handleClickLokasi)
    //     //     document.getElementById('nav-galeri').addEventListener('click',this._handleClickGaleri)
    //     //   }
    //     // }, 3000)
    //   })
    //   .catch(err => console.log(err))
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
}