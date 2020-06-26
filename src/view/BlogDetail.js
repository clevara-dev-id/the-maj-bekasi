import React, { createElement, useState } from 'react'
import { Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styled from 'styled-components'

// import { BlogPlaceholder } from '../component/base/loader/ImagePlaceholder'
import IconUser from '../component/assets/tmp-blog/user.svg'
import IconCalender from '../component/assets/tmp-blog/calender.svg'

import { OnDesktop } from '../constants'
import { Link, useHistory, withRouter } from 'react-router-dom'
import { BaseUrl } from '../services/axios'
import ScrollToTopOnMount from '../services/ScrollToTopOnMount'
import Base from './Base'
import LoaderSpinner from '../component/base/loader/LoaderSpinner'

class BlogDetail extends Base {
    _shareClick = (e) => {
        // console.log(e)
        // console.log(window.location)
    }
    render() {
        if (this.state.blogs.length) {
            const { slug } = this.props.match.params
            const Detail = this.state.blogs.find(data => {
                return data.heading.replace(/\s/g, "-").replace(/[%@#,*>!?"'.]/g, "").toLocaleLowerCase() === slug
            })
            const List = this.state.blogs.filter(data => {
                return data.heading.replace(/\s/g, "-").replace(/[%@#,*>!?"'.]/g, "").toLocaleLowerCase()
            })
            if (!Detail) return window.location.assign("/not-found")
            const { heading, image, img_desc, author, created_at, text, categories } = Detail
            const Kategori = categories.replace(/[\["\]]/g, "")
            return (
                <>
                    <ScrollToTopOnMount />
                    <section>
                        <div className="container">
                            <div style={{ width: "auto", margin: "0px auto", padding: "20px 0" }}>
                                <Col>
                                    <Breadcrumb>
                                        <BreadcrumbLink to="/">Home</BreadcrumbLink> / <BreadcrumbLink to="/blogs">Blog</BreadcrumbLink> / <Span>{heading.replace(/\s/g, "-").replace(/[%@#,*>!?"'.]/g, "")}</Span>
                                    </Breadcrumb>
                                </Col>
                                <Col lg={12} sm={12} xs={12}>
                                    <h5> {Kategori.replace(/\,/g, " | ")} </h5>
                                    <h1 style={{ maxWidth: "460px", marginTop: "23px", marginBottom: "70px" }}> {heading} </h1>
                                </Col>
                                <Row style={{ margin: "86px 0 23px 0" }}>
                                    <Col md={4} xs={6}>
                                        <Author author={author} />
                                    </Col>
                                    <Col md={4} xs={6}>
                                        <Posted_At posted_at={created_at} />
                                    </Col>
                                    <Col md={4} xs={12} className="text-right">
                                        <ButtonShare
                                            onClick={this._shareClick}
                                            heading={heading}
                                            kategoriArray={[Kategori.toUpperCase()]}
                                            tooltip={{
                                                facebook: "Share to Facebook",
                                                twitter: "Share to Twitter",
                                                copy: "Copy Link"
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Col lg={12} sm={12} xs={12}>
                                    <img style={{ width: "100%" }} src={`${BaseUrl}/storage/${image.replace(/\\/g, "/")}`} alt="img-blog" />
                                    <DescImage margin="15px 0px 0px 0px" width="auto">
                                        {img_desc}
                                    </DescImage>
                                </Col>

                                <Row className="mx-0" style={{marginTop:"90px"}}>
                                    <Col xs={12} md={8}>
                                        <div style={{ padding: "0 0 134px 0" }}>
                                            {text && renderHTML(text)}
                                        </div>
                                    </Col>

                                    <OnDesktop>
                                        <Col lg={4} style={{ padding: "0" }}>
                                            <div>
                                            <h5 style={{letterSpacing:"2px", marginBottom:"20px"}}>ARTIKEL TERKAIT</h5>
                                                {List && List.slice(0,4).map((data, i) => {
                                                    let head = data.heading && data.heading.toLowerCase().replace(/\s/g, "-").replace(/[%@#,*>!?"'.]/g, "")
                                                    return (
                                                        <>
                                                            <BlogItem
                                                                key={i}
                                                                src={`${BaseUrl}/storage/${data.image.replace(/\\/g, "/")}`}
                                                                head={data.heading}
                                                                posted_at={data.created_at}
                                                                to={{
                                                                    pathname: `/blog/${head}`,
                                                                    state: { store: this.state.abouts }
                                                                }}
                                                            />
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </Col>
                                    </OnDesktop>
                                </Row>
                            </div>
                        </div>
                    </section>
                </>
            )
        }

        return <LoaderSpinner />
    }
}

export default withRouter(BlogDetail)

const Span = styled.span({
    color:"#232323", fontFamily:"Verlag Bold !important", fontSize:"14px"
})
const Breadcrumb = styled.h5({
    color:"#c8c8c8",
    textTransform:"uppercase",
    marginBottom:"76px",
    marginTop:"76px"
})

const BreadcrumbLink = styled(Link)({
    color:"#c8c8c8",
    "&:hover" : {
        color:"#c8c8c8",
        textDecoration: "none",
    }
})

const ButtonShare = props => {
    const [show, setShow] = useState(false)
    const _onClick = () => {
        const { onClick } = props
        onClick(!show)
        setShow(!show)
    }
    return (
        <>
            <Sosmed URL={window.location.href} heading={props.heading} hastags={props.kategoriArray} tooltip={props.tooltip} />
        </>
    )
}

const Icon = styled.i(
    props => ({
        fontSize: props.size,
        color: props.fill,
    })
)

const Sosmed = props => {
    const Facebook = () => (
        <OverlayTrigger overlay={<Tooltip> {props.tooltip.facebook} </Tooltip>}>
            <span
                data-href="https://developers.facebook.com/docs/plugins/"
                data-layout="button"
                data-size="small"
            >
                <a
                    target="_blank"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${props.URL}&amp;src=sdkpreparse`}
                >
                    <Icon size="18px" fill="#12284C" className="fab fa-facebook-square mr-4" />
                </a>
            </span>
        </OverlayTrigger>
    )

    const Twitter = () => (
        <OverlayTrigger overlay={<Tooltip> {props.tooltip.twitter} </Tooltip>}>
            <span>
                <a
                    href={`https://twitter.com/intent/tweet?text=${props.heading}&url=${props.URL}&hashtags=${props.hastags.join()}`}
                    data-size="large">
                    <Icon size="18px" fill="#12284C" className="fab fa-twitter mr-4" />
                </a>
            </span>
        </OverlayTrigger>
    )
    const CopyLink = props => {
        const [tooltip, setTolltip] = useState("Copy link")
        const _onCopyClick = () => {
            const url = document.getElementById("urlCopy")
            url.select()
            document.execCommand("copy")
            setTolltip(`copied: ${url.value}`)
        }

        return (
            <>
                <input type="text" id="urlCopy" hidden value={props.URL} />
                <OverlayTrigger overlay={<Tooltip> {tooltip} </Tooltip>}>
                    <span>
                        <a onClick={_onCopyClick} style={{ cursor: "pointer" }}>
                            <Icon size="18px" fill="#12284C" className="fas fa-link" />
                        </a>
                    </span>
                </OverlayTrigger>
            </>
        )
    }

    return (
        <>
            <Facebook {...props} />
            <Twitter {...props} />
            <CopyLink {...props} />
        </>
    )
}

const renderHTML = (args) => {
    return createElement("div", {
        dangerouslySetInnerHTML: { __html: args }
    })
}

const Author = (props) => (
    <>
        <img src={IconUser} alt="author" />
        <span
            style={{
                marginLeft: "8px",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#C8C8C8"
            }}>
            {props.author}
        </span>
    </>
)

const Posted_At = props => (
    <>
        <img src={IconCalender} alt="calendar" />
        <span
            style={{
                marginLeft: "8px",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#C8C8C8"
            }}
        >
            {props.posted_at}
        </span>
    </>
)

const BlogItem = props => (
    <ContainerItem>
        <Col lg={4} style={{ padding: "0" }}>
            <img src={props.src.replace(".jpg", "-thumbnail.jpg")} width="95px" height="95px" alt="list-blog" />
        </Col>
        <Col lg={8} style={{ padding: "0" }}>
            <ButtonLink {...props}><H3>{props.head}</H3></ButtonLink>
            <Created>Posted On {props.posted_at.replace(/-/g, " ")} </Created>
        </Col>
    </ContainerItem>
)

const ButtonLink = props => {
    const history = useHistory()
    const { head } = props
    const _handleClick = (e) => {
        e.perventDefault()
        history.push(`/blog/${head && head.toLowerCase().replace(/\s/g, "-").replace(/[%@#,*>!?"'.]/g, "")}`)
    }
    return (
        <Link {...props} style={{ textDecoration: "none" }}>
            {props.children}
        </Link>
    )
}

const DescImage = styled.p(
    props => ({
        margin: props.margin,
        padding: props.padding,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "10px",
        lineHeight: "15px",
        color: "#C8C8C8",
        width: props.width
    })
)

const ContainerItem = styled.div(
    props => ({
        display: "flex",
        margin: "0 0 35px 0",
        padding: "0 0 27px 0",
        borderBottom: "1px solid #C8C8C8",
    })
)

const H3 = styled.h3(
    props => ({
        // fontSize: "15px",
        height: "61px",
        whiteSpace: "wrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        margin: props.margin,
        padding: props.padding,
        transition: "color .2s",
        ":hover": {
            color: "#CC9980",
        }
    })
)

const Created = styled.small(
    props => ({
        margin: props.margin,
        padding: props.padding,
        fontStyle: "normal",
        fontSize: "12px",
        fontWeight: "bold",
        lineHeight: "28px",
        color: "#CC9980",
    })
)
