import React, { Component } from 'react'
import styled from 'styled-components'

export default class AboutCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading:true,
            localStore:[],
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.store.length !== prevState.localStore.length) {
			return {
				localStore: nextProps.store,
				isLoading: false,
			}
		}
	}
    render(){
        if(this.state.isLoading){
            return(
                <>
                    <Container>
                        <H1>Tentang Kami</H1>
                        <Content>
                            <div style={{width:"100%", height:"300px", backgroundColor:"#ccc"}}></div>
                        </Content>
                    </Container>
                </>
            )
        }
        return(
            <>
            <Container>
                <H1>Tentang Kami</H1>
                <Content>
                    {this.state.localStore.map((data, i) => (
                        <P key={i}>{data.tentang_kami}</P>
                    ))}
                </Content>
            </Container>
            </>
        )
    }

    
}
const Container = styled.div`
    width: 790px;
    height: 392px;
    margin-top:150px;
    margin-left:auto;
    margin-right:auto;
    @media only screen and (max-width:768px){
        width:290px;
        height:auto;
        margin-top:48px;
        margin-bottom:150px;
    }
`;
const H1 = styled.h1`
    margin:0px auto 47px auto;
    text-align:center;
`;
const H5 = styled.h5`
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
    text-align:center;
    margin:0px auto 47px auto;
    color: #000000;
`;
const Content = styled.div`
    padding-bottom:50px;
    column-count: 2;
    @media only screen and (max-width:768px){
        column-count:auto;
    }
`;
const P = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    text-align:justify;
    color: #000;
    margin-left:auto;
    margin-right:auto;
`;