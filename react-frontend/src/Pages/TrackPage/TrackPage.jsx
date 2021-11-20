import * as ACTIONS from "../../store/actions/actions"
import React, { Component } from 'react'
import { connect } from "react-redux"
import "./TrackPage.css"
import axios from 'axios'
import history from "../../utils/history";
import TrackMenu from '../../Containers/TrackMenu/TrackMenu';
import FeedbackContainer from '../../Containers/Feedback/FeedbackContainer';
import TrackBox from '../../Containers/TrackBox/TrackBox'
import TrackSearchBox from '../../Functions/TrackSearchBox/TrackSearchBox';
import LoadingBox from "../../Functions/LoadingBox/LoadingBox"
// import { Helmet } from "react-helmet-async"
import { Helmet } from "react-helmet";
import TrackPosterContainers from "../../Containers/Posters/TrackPosters/TrackPosterContainers"
class TrackPage extends Component {
    constructor(props){
        super(props)
        this.state={
            gotoHeight: 0,
            isLoading: true,
            searchResults: [],
            showGoToTop: false,
            isPosterClosed: false,
            screenHeight: window.innerHeight
        }
        this.tpbody = React.createRef()
        this.topRef = React.createRef()
        this.updatePosition= this.updatePosition.bind(this)
        this.onGotoTop = this.onGotoTop.bind(this)
        this.closePoster = this.closePoster.bind(this)

    }
    componentDidMount(){
        const fetchTrackMetadata = async() => {
            try {
                const res = await axios.get('/getTrackMeta/')
                var data = res.data
                data.sort(function(a, b){
                    return ((b.views +b.likes)/2) - ((a.likes + a.views)/2)
                })
                if (res.status === 200) {
                    this.setState({searchResults: data, isLoading: false})
                    this.props.sendtrackMetaData(data)
                }
            } catch (error) {
                history.go(0)
            }
        }
        if(this.props.isStarting){
            fetchTrackMetadata()
        }else{
            setTimeout(() => {
                this.setState({searchResults: this.props.trackMetaData, isLoading: false})
            }, 2500);
        }
        if (sessionStorage.getItem("posterClosedId") === "1"){
            this.setState({isPosterClosed: true})
        }
    }
    
    updatePosition(){
        // console.log(this.tpbody.current.getBoundingClientRect().top + window.innerHeight);
        if (this.tpbody.current.getBoundingClientRect().top + window.innerHeight < 0) {
            this.setState({showGoToTop: true})
        }else{
            this.setState({showGoToTop: false})
        }
    }
    onGotoTop(){
        this.topRef.current.scrollIntoView({
            behavior: "smooth", 
            block: "nearest"
        })
    }
    closePoster(){
        this.setState({isPosterClosed: true})
        sessionStorage.setItem("posterClosedId", 1)
    }
    render() {
        return (
            this.state.isLoading?
                <div className="page-loader">
                    <Helmet>
                        {/* Page sittings */}
                        <meta charset="utf-8" />
                        <meta name="theme-color" content="#000000" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        
                        {/* Primary Meta Tags */}
                        <title>Tracks</title>
                        <meta name="title" content="List of roadmaps"/>
                        <meta name="description" content="List of roadmaps"/>
                        <meta name="keywords" content="Roadmap, track, career path, learning path"/>

                        {/* Open Graph / Facebook */}
                        <meta property="og:type" content="website"/>
                        <meta property="og:url" content="https://neuton.space/track/"/>
                        <meta property="og:title" content="List of roadmaps"/>
                        <meta property="og:description" content="List of roadmaps"/>
                        <meta property="og:image" content="/logo192.png"/>
                        
                        {/* Twitter */}
                        <meta property="twitter:card" content="summary_large_image"/>
                        <meta property="twitter:url" content="https://neuton.space/track/"/>
                        <meta property="twitter:title" content="List of roadmaps"/>
                        <meta property="twitter:description" content=""/>
                        <meta property="twitter:image" content="/logo192.png"/>
                    </Helmet>
                    <h1>NEUTON</h1>
                </div>
            :
            <div className="tp-main" onScroll={this.updatePosition}>
                <Helmet>
                    {/* Page sittings */}
                    <meta charset="utf-8" />
                    <meta name="theme-color" content="#000000" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    
                    {/* Primary Meta Tags */}
                    <title>Tracks</title>
                    <meta name="title" content="List of roadmaps"/>
                    <meta name="description" content="List of roadmaps"/>
                    <meta name="keywords" content="Roadmap, track, career path, learning path"/>

                    {/* Open Graph / Facebook */}
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="https://neuton.space/track/"/>
                    <meta property="og:title" content="List of roadmaps"/>
                    <meta property="og:description" content="List of roadmaps"/>
                    <meta property="og:image" content="/logo192.png"/>
                    
                    {/* Twitter */}
                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content="https://neuton.space/track/"/>
                    <meta property="twitter:title" content="List of roadmaps"/>
                    <meta property="twitter:description" content=""/>
                    <meta property="twitter:image" content="/logo192.png"/>
                </Helmet>
                <div className="tp-head">
                    <TrackMenu />
                </div>
                <div className="tp-body">
                    <div className="tp-body-1" ref={this.tpbody}>
                        <span ref={this.topRef}></span>
                        <TrackSearchBox />
                        {!this.state.isPosterClosed?
                        <TrackPosterContainers handleCloseAction={this.closePoster}/>
                        :null}
                        {!this.state.isLoading?
                            <div className="tp-b1-box">
                                {this.state.searchResults && this.state.searchResults.map((item, index) => (
                                    <TrackBox key={index} sno={index} data={item}/>
                                ))}
                            </div>
                        :
                            <LoadingBox/>
                        }
                        
                    </div>
                    <div className="tp-body-2">
                        <FeedbackContainer />
                        <div className="footer">
                            <p>@NeutonSpace</p>
                        </div>
                    </div>
                    {this.state.showGoToTop?
                    <div className="cp-end" onClick={this.onGotoTop}><b>Go to top</b></div>
                    :null
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        isStarting: state.track.isStarting,
        trackMetaData: state.track.trackMetaData
    }
}

function mapDispatchToProps(dispatch) {
    return{
        sendtrackMetaData: (data) => dispatch(ACTIONS.save_track_metadata(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackPage)
