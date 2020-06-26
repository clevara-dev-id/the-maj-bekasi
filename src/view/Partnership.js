import React from 'react'
import SakuraLogo from '../component/assets/partnership-image/sakura.svg'
import Sakura from '../component/card/Sakura'
import Base from './Base'

export default class Partnership extends Base {
    
    render() {
        return (
            <div>
                <section>
                    <div className="container">
                        <div className="text-center" style={{marginTop: 102}}>
                            <img src={SakuraLogo} alt="sakura-logo" />
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <Sakura />
                    </div>
                </section>
            </div>
        )
    }
}
