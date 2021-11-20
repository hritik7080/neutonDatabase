import axios from 'axios'
import React, { Component } from 'react'
import './AdminPage.css'
import ChildBar from './ChildBar'
import CreateTopic from './CreateTopic'
import CreateTrackContainer from './CreateTrackContainer'
import FutureBar from './FutureBar'
import PastBar from './PastBar'
export class AdminPage extends Component {
    constructor(){
        super()
        this.state={
            isCreatingTrack: false,
            isCreatingTopic:false,
            isSearching: false,
            isFutureOpen: false,
            isPastOpen: false,
            selectedTrack: null,
            selectedAttach: null,
        }
        this.onTrackCreating = this.onTrackCreating.bind(this)
        this.onTopicCreating = this.onTopicCreating.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.getRecentTrack = this.getRecentTrack.bind(this)
        this.getChildTrack = this.getChildTrack.bind(this)
        this.handleFuture = this.handleFuture.bind(this)
        this.handlePast = this.handlePast.bind(this)
        this.selectTrack = this.selectTrack.bind(this)
        this.selectAttach = this.selectAttach.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.getFutureTrack = this.getFutureTrack.bind(this)
    }
    async getRecentTrack(){
        try {
            this.setState({recentTrack: []})
            const res = await axios.get('/admin/getRecentTrack')
            if(res.data.length !== 0){
                this.setState({recentTrack: [...res.data.response]})
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount(){
        this.getRecentTrack() 
    }
    onTrackCreating(){
        this.setState({isCreatingTrack: !this.state.isCreatingTrack})
    }
    onTopicCreating(){
        this.setState({isCreatingTopic: !this.state.isCreatingTopic})
    }
    async handleSearch(e){
        try {
            this.setState({track_search: []})
            const res = await axios.get('/track/search', {params: {search_quary: e.target.value}})
            
            if(res.data.response.length !== 0){
                this.setState({track_search: [...res.data.response], isSearching: true})
            }else{
                this.setState({isSearching: false})
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getChildTrack(){
        try {
            this.setState({childTrack: [], clen: 0})
            const res = await axios.get(`/admin/getChildTrack/${this.state.selectedTrack.id}`)
            this.setState({childTrack: [...res.data.response], clen: res.data.response.length})
        } catch (error) {
            console.log(error);
        }
    }
    
    async handlePast(){
        this.setState({isPastOpen: !this.state.isPastOpen})
        if (!this.state.isPastOpen){
            console.log("[PAST FUNCTION STARTED] ...");
            try {
                const res = await axios.get('/admin/getPastTrack',{params: {id: this.state.selectedTrack.id, pid: this.state.selectedTrack.pid, jid: this.state.selectedTrack.jid}})
                if(res.data.status === 'success'){
                    this.setState({pastTrack: res.data.response})
                }
            } catch (error) {
                console.log(error)
            }   
        }
    }

    async getFutureTrack(){
        console.log(this.state.selectedTrack.id, this.state.selectedTrack.pid);
        try {
            const res = await axios.get('/admin/getFutureTrack',{params: {id: this.state.selectedTrack.id, pid: this.state.selectedTrack.pid}})
            if(res.data.status === 'success'){
                this.setState({futureTrack: res.data.response})
            }
        } catch (error) {
            console.log(error)
        }
}

    async handleFuture(){
        this.setState({isFutureOpen: !this.state.isFutureOpen})
        if (this.state.isFutureOpen === false) {
            this.getFutureTrack()
        }
    }

    async selectTrack(e){
        try {
            const res = await axios.get(`/admin/OpenTrack/${e.target.value}`)
            this.setState({selectedTrack: res.data.response})
            this.getChildTrack()
            // this.getFutureTrack()
        } catch (error) {
            console.log(error);
        }
    }
    async selectAttach(e){
        try {
            const res = await axios.get(`/track/getOneTrack/${e.target.value}`)
            console.log(res.data.response)
            this.setState({selectedAttach: res.data.response})
        } catch (error) {
            console.log(error);
        }
    }
    async handleDelete(e){
        try {
            await axios.delete(`/track/deleteTrack/${e.target.value}`)
            this.getRecentTrack()
            // if (res.data.status === 'success') {
            //     this.getRecentTrack()
            // }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className="adp-main">
                <div className="adp-header">
                    <input type="text" onChange={this.handleSearch} placeholder="Search"/>
                    <button>Statistics</button>
                    <button onClick={this.onTopicCreating}>Create topic</button>
                    <button onClick={this.onTrackCreating}>Create track</button>
                </div>
                {this.state.selectedAttach?
                    <div className="adp-attach">
                        <h5>{this.state.selectedAttach.id}</h5>
                        <h5>{this.state.selectedAttach.sname}</h5>
                        <p>{this.state.selectedAttach.fname}</p>
                    </div>
                :
                    null    
                }
                {this.state.isCreatingTrack?
                    <CreateTrackContainer onAfterSubmiting={this.onTrackCreating}/>
                :
                    null
                }
                {this.state.isCreatingTopic?
                    <CreateTopic onAfterSubmiting={this.onTopicCreating}/>
                :
                    null
                }
                <div className="adp-body">
                    {this.state.isSearching?
                        <div className="adp-sr-box">
                            {this.state.track_search && this.state.track_search.map((item, index) => (
                                <div key={index} className="adp-sr-1">
                                    <h3>{item.id}: {item.sname}</h3>
                                    <p>{item.fname}</p>
                                </div>
                            ))
                            }
                        </div>
                    :
                        <div className="adp-sr-box">
                            <div className="adp-sr-1">
                                <button onClick={this.getRecentTrack}>Refresh</button>
                            </div>
                            {this.state.recentTrack && this.state.recentTrack.map((item, index) => (
                                <div key={index} className="adp-sr-1">
                                    <h3>{item.id}: {item.sname}</h3>
                                    <p>{item.fname}</p>
                                    <button value={item.id} onClick={this.selectTrack}>Select</button>
                                    <button>Edit</button>
                                    <button value={item.id} onClick={this.handleDelete} >remove</button>
                                    <button value={item.id} onClick={this.selectAttach}>Select Attach</button>
                                </div>
                            ))
                            }
                        </div>
                    }
                    {this.state.selectedTrack?
                        <div className="adp-show-box">
                            {this.state.isPastOpen?
                                <div className="adp-track-past">
                                    <div className="adp-past-more">
                                        Load More
                                    </div>
                                    {this.state.pastTrack && this.state.pastTrack.map((item, index) => (
                                        <PastBar key={index} data={item} />
                                    ))}
                                </div>
                            :null
                            }
                            <div className="adp-track-present">
                                <div>
                                    <h5>ID: {this.state.selectedTrack.id}</h5>
                                    <h5>TID: {this.state.selectedTrack.tid}</h5>
                                    <h5>SNAME: {this.state.selectedTrack.sname}</h5>
                                    <h5>FNAME: {this.state.selectedTrack.fname}</h5>
                                    <h5>DETAILS: {this.state.selectedTrack.detail}</h5>
                                    <h5>LEVEL: {this.state.selectedTrack.level}</h5>
                                    <h5>LIKES: {this.state.selectedTrack.likes}</h5>
                                    <h5>VEIWS: {this.state.selectedTrack.veiws}</h5>
                                </div>
                                <div>
                                    <button onClick={this.handlePast}>Early track</button>
                                    <button onClick={this.handleFuture}>{this.state.isFutureOpen? "Present track":"Future track"}</button>
                                    <button>Attach Child</button>
                                </div>
                            </div>
                            {!this.state.isFutureOpen?
                                <div className="adp-track-child">
                                    {this.state.childTrack && this.state.childTrack.map((item, index) => (
                                        <ChildBar key={index} data={item} cno={index} clen={this.state.clen}/>
                                    ))}
                                </div>
                            :
                                <div className="adp-track-future">
                                    {this.state.futureTrack && this.state.futureTrack.map((item, index) => (
                                        <FutureBar key={index} data={item}/>
                                    ))}
                                    <div className="adp-future-add">
                                        Add More
                                    </div>
                                </div>
                            }
                        </div>
                    :
                        null
                    }
                    
                </div>
            </div>
        )
    }
}

export default AdminPage