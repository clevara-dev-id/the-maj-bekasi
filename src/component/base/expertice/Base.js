import React, { Component } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import { BaseUrl } from '../../../services/axios'
import { layoutGenerator } from 'react-break';
import LoaderSpinner from '../loader/LoaderSpinner';

const layout = layoutGenerator({
    mobile: 0,
    tablet: 768,
    desktop: 992,
});

const OnMobileAndTablet = layout.isAtMost('tablet');
const OnDesktop = layout.is('desktop');

export default class ExperticeComponent extends Component {
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
            isLoading: false
          }
        }
      }

    render() {
        if(this.state.isLoading){
            return(
              <LoaderSpinner />
            )
          }
        return (
            <>
                {this.state.localStore.length && this.state.localStore.map((data, i) => {
                    const logos = JSON.parse(data.logo)
                    const sources = JSON.parse(data.images)
                    return (
                    <>
                        <OnDesktop>
                            <BaseComponents key={i}
                                reverse={i % 2 ? true : false}
                                logo={BaseUrl + '/storage/' + logos[0].download_link}
                                description={data.description}
                                source={BaseUrl + '/storage/' + sources[0].download_link}
                            />
                        </OnDesktop>
                        <OnMobileAndTablet>
                            <BaseComponentsMobile key={i}
                                logo={BaseUrl + '/storage/' + logos[0].download_link}
                                description={data.description}
                                source={BaseUrl + '/storage/' + sources[0].download_link}
                            />
                        </OnMobileAndTablet>
                    </>
                )})}
            </>
        )
    }
}
const BaseComponents = (props) => (
    <Container>
        <Row>
            {
                props.reverse ?
                    (
                        <>
                            <SecondCol {...props} />
                            <FirstCol {...props} />
                        </>
                    ) : (
                        <>
                            <FirstCol {...props} />
                            <SecondCol {...props} />
                        </>
                    )

            }
        </Row>
    </Container>
)
const BaseComponentsMobile = (props) => (
    <Container>
        <Col className="text-center"><Logo src={props.logo} alt="Company Logo" /></Col>
        <Col className="mb-5">
            {/* <Background source={props.source} /> */}
            <img src={props.source} alt="company" className="w-100" />
        </Col>
        <Col><P>{props.description}</P></Col>
    </Container>
)
const FirstCol = (props) => (
    <Col md={6}>
        <Logo src={props.logo} alt="Company Logo" />
        <P>{props.description}</P>
    </Col>
)
const SecondCol = (props) => (
    <Col md={6}>
        {/* <Background source={props.source} /> */}
        <img src={props.source} alt="company" className="w-100" />
    </Col>
)

const Container = styled.div`
    width:100%;
    height:auto;
    padding:100px 0px;
    border-bottom: 1px solid #C4C9D2;
`;

const Logo = styled.img`
    width:150px;
    margin-bottom:50px;
`;
const P = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: #232323;
`;