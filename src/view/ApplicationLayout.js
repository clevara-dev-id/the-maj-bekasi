import React, { Component, createRef } from 'react'
import { NavigationBar, MobileNavigationBar, Footer, MobileFooter } from '../component/base_component/'
import { getNavbar,getSocialMedia } from '../services/get'
import {storeContact, storeSubscribe} from '../services/post'

import { OnDesktop, OnMobileAndTablet } from '../constants/'
// import Base from './Base'
import Whatsapp from '../component/base/whatsapp'

export default class ApplicationLayout extends Component {
    constructor(props){
        super(props)
        this.state = {
            navigation: [],
            socialMedia:[],
            errors: {
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
        const promiseSocialMedia = Promise.resolve(
            getSocialMedia()
            .then(res => this.setState({ socialMedia: res.data }))
            .catch((err) => {
              if (err && err.response) this.setState({ errors: { socialMedia: { code: err.response.status, status: err.response.statusText } } })
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
                <Whatsapp />
                <header>
                    <OnDesktop>
                        <NavigationBar store={this.state.navigation} isTop={this.state.isTop}/>
                    </OnDesktop>
                    <OnMobileAndTablet>
                        <MobileNavigationBar store={this.state.navigation} isTop={this.state.isTop} />
                    </OnMobileAndTablet>
                </header>

                <div id="content">
                    {this.props.children}
                </div>

                <footer>
                    <OnDesktop>
                        <Footer
                            validated={this.state.footer.validated}
                            onSubmit={this._footer}
                            titleRef={this.footreftitle}
                            nameRef={this.footrefname}
                            emailRef={this.footrefemail}
                            success={this.state.footer.success}
                            errors={this.state.footer.errors}
                            store={this.state.socialMedia}
                        />
                    </OnDesktop>
                    <OnMobileAndTablet>
                        <MobileFooter 
                            validated={this.state.footer.validated}
                            onSubmit={this._footer}
                            titleRef={this.footreftitle}
                            nameRef={this.footrefname}
                            emailRef={this.footrefemail}
                            success={this.state.footer.success}
                            errors={this.state.footer.errors}
                            store={this.state.socialMedia}
                        />
                    </OnMobileAndTablet>
                </footer>
            </div>
        )
    }
}