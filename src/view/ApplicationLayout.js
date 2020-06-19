import React from 'react'
import { NavigationBar, MobileNavigationBar, Footer, MobileFooter } from '../component/base_component/'

import { OnDesktop, OnMobileAndTablet } from '../constants/'
import Base from './Base'
import Whatsapp from '../component/base/whatsapp'

export default class ApplicationLayout extends Base {
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