import axios from 'axios'
import React, { Component } from 'react'
import "./AdminPage.css"
export class CreateTrackContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            pid: '',
            jid: '',
            tid: '',
            level: '',
            filter: '',
            jdata: null,
            pdata: null,
            tdata: null,
            isSubmiting: false
        }
        this.onChangePid = this.onChangePid.bind(this)
        this.onChangeJid = this.onChangeJid.bind(this)
        this.onChangeTid = this.onChangeTid.bind(this)
        this.onSelectPid = this.onSelectPid.bind(this)
        this.onSelectJid = this.onSelectJid.bind(this)
        this.onSelectTid = this.onSelectTid.bind(this)
        this.onChangeLevel = this.onChangeLevel.bind(this)
        this.onChangeFilter = this.onChangeFilter.bind(this)
        this.onTrackSubmit = this.onTrackSubmit.bind(this)
    }
    async onChangePid(e){
        try {
            this.setState({
                pid: e.target.value,
                pid_search: []
            })
            const res = await axios.get('/admin/getTrack', {params: {search_quary: e.target.value}})
            if(res.data.length !== 0){
                this.setState({pid_search: [...res.data.response]})
            }
        } catch (error) {
            console.log(error);
        }

    }
    async onChangeJid(e){
        try {
            this.setState({
                jid: e.target.value,
                jid_search: []
            })
            const res = await axios.get('/admin/getTrack', {params: {search_quary: e.target.value}})
            if(res.data.length !== 0){
                this.setState({
                    jid_search: [...res.data.response]
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    async onChangeTid(e){
        try {
            this.setState({
                tid: e.target.value,
                tid_search: []
            })
            const res = await axios.get('/admin/getTopic', {params: {search_quary: e.target.value}})
            if(res.data.length !== 0){
                this.setState({
                    tid_search: [...res.data.response]
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    onSelectPid(item){
        this.setState({pid:'', pid_search: [], pdata: item})
    }
    onSelectJid(item){
        this.setState({jid:'', jid_search: [], jdata: item})
    }
    onSelectTid(item){
        this.setState({tid:'', tid_search: [], tdata: item})
    }
    onChangeLevel(e){
        this.setState({level: e.target.value})
    }
    onChangeFilter(e){
        console.log(e.target.value);
        this.setState({filter: e.target.value})
    }
    async onTrackSubmit(){
        this.setState({isSubmiting: true})
        const trackdata= {
            tid: this.state.tdata.id,
            pid: this.state.pdata? this.state.pdata.id: null,
            jid: this.state.jdata? this.state.jdata.id: null,
            level: this.state.level,
            filter: this.state.filter
        }
        try{
            const res = await axios.post('/admin/createTrack', trackdata)
            console.log(res.data);
            if (res.data.status === 'success') {
                this.setState({isSubmiting: false})
                this.props.onAfterSubmiting()
            }else{
                console.log("ERROR");
            }
        } catch (error) {
            console.log("ERROR 2");
        }
    }
    render() {
        return (
            <div className="adp-ct-box">
                <div className="adp-ct-head">
                    <span>Create Roadmap</span>
                    <button onClick={this.props.onAfterSubmiting}>Cancel</button>
                    <button onClick={this.onTrackSubmit}>Submit</button>
                </div>
                <div className="adp-ct-connect">
                    <div className="adp-ct-1">
                        <input type="text" placeholder="Topic" value={this.state.tid} onChange={this.onChangeTid}/>
                        <div className="adp-is-main">
                            {this.state.tid_search && this.state.tid_search.map((item, index) => (
                                <div key={index} className="adp-is-box">
                                    <span>
                                        <p>{item.id}: {item.sname}</p>
                                        <button onClick={e => this.onSelectTid(item)}>Select</button>
                                    </span>
                                    <p><b>{item.fname}</b></p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="adp-ct-1">
                        <input type="text" placeholder="Parent" value={this.state.pid} onChange={this.onChangePid}/>
                        <div className="adp-is-main">
                            {this.state.pid_search && this.state.pid_search.map((item, index) => (
                                <div key={index} className="adp-is-box">
                                    <span>
                                        <p>{item.id}: {item.sname}</p>
                                        <button onClick={e => this.onSelectPid(item)}>Select</button>
                                    </span>
                                    <p><b>{item.fname}</b></p>
                                </div>
                            ))}
                        </div>
                    </div>                    
                    <div className="adp-ct-1">
                        <input type="text" placeholder="Junior" value={this.state.jid} onChange={this.onChangeJid}/>
                        <div className="adp-is-main">
                            {this.state.jid_search && this.state.jid_search.map((item, index) => (
                                <div key={index} className="adp-is-box">
                                    <span>
                                        <p>{item.id}: {item.sname}</p>
                                        <button onClick={e => this.onSelectJid(item)}>Select</button>
                                    </span>
                                    <p><b>{item.fname}</b></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {this.state.tdata?
                    <div className="adp-ct-s">
                        <p>Topic-Id: {this.state.tdata.id}</p>
                        <h4>{this.state.tdata.fname}</h4>
                        <p>{this.state.tdata.sname}</p>
                    </div>
                :null
                }
                {this.state.pdata?
                    <div className="adp-ct-s">
                        <p>Parent-Id: {this.state.pdata.id}</p>
                        <h4>{this.state.pdata.fname}</h4>
                        <p>{this.state.pdata.sname}</p>
                    </div>
                :null
                }
                {this.state.jdata?
                    <div className="adp-ct-s">
                        <p>Junior-Id: {this.state.jdata.id}</p>
                        <h4>{this.state.jdata.fname}</h4>
                        <p>{this.state.jdata.sname}</p>
                    </div>
                :null
                }
                <div className="adp-ct-options">
                    <input type="text" placeholder="Level" value={this.state.level} onChange={this.onChangeLevel} required/>
                    <input type="text" placeholder="Filter" value={this.state.filter} onChange={this.onChangeFilter}/>
                </div>
                {this.state.isSubmiting?
                    <div className="adp-track-submiting">Submiting...</div>
                :
                    null
                }
            </div>
        )
    }
}

export default CreateTrackContainer