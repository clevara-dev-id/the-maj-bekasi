import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('./view/Home'))
const Partnership = lazy(() => import('./view/Partnership'))
const TentangKami = lazy(() => import('./view/TentangKami'))
const Expertice = lazy(() => import('./view/Expertice'))
const BlogList = lazy(() => import('./view/Blog'))
const PrivacyPolicy = lazy(() => import('./view/PrivacyPolicy'))
const Page404 = lazy(() => import('./view/errors/Page404'))
const BlogDetail = lazy(() => import('./view/BlogDetail'))

const BaseRoute = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/section/:args?" component={Home} />
            <Route exact path="/tentang-kami" component={TentangKami} />
            <Route exact path="/partnership" component={Partnership} />
            <Route exact path="/expertise" component={Expertice} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/blogs" component={BlogList} />
            <Route exact path="/blog/:slug" component={BlogDetail} />
            <Route path="" component={Page404} />
        </Switch>
    )
}

export default BaseRoute