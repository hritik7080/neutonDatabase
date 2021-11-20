import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { AddCourseContainer } from '../../Containers/AddCourse/AddCourseContainer'
import { SubscribeContainer } from '../../Containers/Subscribe/SubscribeContainer'
import TrackMenu from '../../Containers/TrackMenu/TrackMenu'
import BodyCenterLayout from '../../layout/BodyCenterLayout/BodyCenterLayout'
import BodySideLayout from '../../layout/BodySideLayout/BodySideLayout'
import PageBodyLayout from '../../layout/PageBodyLayout/PageBodyLayout'
import PageHeaderLayout from '../../layout/PageHeaderLayout/PageHeaderLayout'
import PageLayout from '../../layout/PageLayout/PageLayout'
import './AddResourcePage.css'

class AddResourcePage extends Component {
    constructor(props){
        super(props)
        this.onLoginSuccess = this.onLoginSuccess.bind(this)
    }
    componentDidMount(){
    }
    onLoginSuccess(){
        console.log("LOGIN SUCCESS");
    }
    render() {
        return (
            <PageLayout>           
                {!this.props.isLogged?
                    <div className="backdrop">
                        <SubscribeContainer onLoginSuccess={this.onLoginSuccess}/>
                    </div>
                :null}
                <Helmet>
                    {/* Page sittings */}
                    <meta charset="utf-8" />
                    <meta name="theme-color" content="#000000" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    
                    {/* Primary Meta Tags */}
                    <title>Add Resources</title>
                    <meta name="title" content="Advertise your content for free"/>
                    <meta name="description" content="Increase traffic on your content by uploading in few simple steps."/>

                    {/* Open Graph / Facebook */}
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content={this.props.match.params.tid}/>
                    <meta property="og:title" content="Advertise your content for free"/>
                    <meta property="og:description" content="Increase traffic on your content by uploading in few simple steps."/>
                    <meta property="og:image" content="/logo192.png"/>
                    
                    {/* Twitter */}
                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content={this.props.match.params.tid}/>
                    <meta property="twitter:title" content="Advertise your content for free"/>
                    <meta property="twitter:description" content="Increase traffic on your content by uploading in few simple steps."/>
                    <meta property="twitter:image" content="/logo192.png"/>
                </Helmet>
                <PageHeaderLayout>
                    <TrackMenu />
                </PageHeaderLayout>
                <PageBodyLayout isColumnReversed={false}>
                    <BodyCenterLayout>
                        {/* <div className="body-head">
                            <button>Go back</button>
                            <span>Topic name</span>
                        </div> */}
                        <AddCourseContainer />
                    </BodyCenterLayout>
                    <BodySideLayout>
                        <div className="addvertise">
                            I love you too
                        </div>
                    </BodySideLayout>
                </PageBodyLayout>
                </PageLayout>
        )
    }
}

function mapStateToProps(state) {
    return{
        isLogged: state.profile.isLogged,
        userToken: state.profile.userToken
    }
}

export default connect(mapStateToProps, null)(AddResourcePage)
