import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TrackContainer from '../../Containers/Track/TrackContainer'
import "./SecretPage.css"
class SecretPage extends Component {
    constructor(props){
        super(props)
        this.state={
            trackData: [],
            searchResults: []
        }
        this.openTrack = this.openTrack.bind(this) 
    }
    componentDidMount(){
        const fetchTrackMetadata = async() => {
            try {
                const res = await axios.get('/getTrackMeta/')
                var data =res.data
                data.sort(function(a, b){
                    return (b.views - a.views)
                })
                if (res.status === 200) {
                    this.setState({searchResults: data, isLoading: false})
                    this.props.sendtrackMetaData(data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchTrackMetadata()
    }
    openTrack(e){
        axios.get('/getTrack/',{params: {id: e.target.value}})
        .then((res) => this.setState({trackData: res.data}))
        .catch((err) => console.log(err))
    }
    render() {
        return (
            <div className="sp-db-main">
                <div className="sp-db-head">
                    <h2>Dashboard</h2>
                    <div className="sp-db-head-opt">
                        <input type="text" placeholder="Search here"/>
                        <Link to={'/secret/addtrack'}><button>Create Track</button></Link>
                        <Link to={'/secret/maptrack'}><button>Map Track</button></Link>
                    </div>
                </div>
                <div className="sp-db-body">
                    <div className="sp-db-body-1">
                        <h4>Tracks</h4>
                        {this.state.searchResults && this.state.searchResults.map((item, index) => (
                            <div key={index} className="sp-db-track-box">
                                <div className="sp-db-track-head">
                                    <p>{item.title}</p>
                                    <span>{item.selfId}</span>
                                </div>
                                <div className="sp-db-track-body">
                                    <p>{item.desc}</p>
                                </div>
                                <div className="sp-db-track-foot">
                                    <button style={{background: 'tomato'}}>Delete</button>
                                    <button style={{background: 'yellow'}}>Edit</button>
                                    <button onClick={this.openTrack} value={item.selfId} style={{background: 'deepskyblue'}}>Open</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="sp-db-body-2">
                        {/* <h4>Details</h4> */}
                        {this.state.trackData.length !== 0?
                            <TrackContainer data={this.state.trackData}/>
                        :null}
                    </div>
                </div>
            </div>
        )
    }
}

export default SecretPage
