import React, { Component } from 'react'
class CreateRootTrack extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            tag: '',
            desc: '',
            jid: '',
            sid: '',
            tid: '',
            isTopic: true,
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onInputChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
        e.preventDefault()
        try {
            const data = {
                tag: this.state.tag,
                jid: this.state.jid,
                sid: this.state.sid,
                tid: this.state.tid,
                desc: this.state.desc,
                title: this.state.title,
                isTopic: this.state.isTopic
            }
            // var formdata = new FormData()
            // data.append('tag', this.state.tag)
            // data.append('jid', this.state.jid)
            // data.append('sid', this.state.sid)
            // data.append('tid', this.state.tid)
            // data.append('desc', this.state.desc)
            // data.append('title', this.state.title)
            // data.append('isTopic', this.state.isTopic)
            console.log('[SENDING]...')
            this.props.handleRoot(data)
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} className="sp-at-root">
                <div className="sp-at-root-head">
                    <h3>Create Track</h3>
                    <button type="submit">Add</button>
                </div>
                <div className="sp-at-root-body">
                    <div className="sp-at-root-body-1">
                        <input type="text" name="title" value={this.state.title} onChange={this.onInputChange} placeholder="Enter title"/>
                        <input type="text" name="tag" value={this.state.tag} onChange={this.onInputChange} placeholder="Enter tag"/>
                    </div>
                    <textarea name="desc" value={this.state.desc} onChange={this.onInputChange} placeholder="Enter description"></textarea>
                    <div className="sp-at-root-body-1">
                        <input type="text" name="jid" value={this.state.jid} onChange={this.onInputChange} placeholder="Enter junior"/>
                        <input type="text" name="sid" value={this.state.sid} onChange={this.onInputChange} placeholder="Enter senior"/>
                    </div>
                    <div className="sp-at-root-body-1">
                        <div className="sp-at-root-body-2">
                            <input type="checkbox" id="sp-at-isTopic" name="isTopic" value={this.state.isTopic}/>
                            <label for="sp-at-isTopic">Is this a topic?</label>
                        </div>
                        <input list="tracks" name="tid" value={this.state.tid} onChange={this.onInputChange} placeholder="Select track"/>
                        <datalist id="tracks">
                            <option value="wdw"></option>
                            <option value="wdw"></option>
                            <option value="wd"></option>
                            <option value="wdwad"></option>
                        </datalist>
                    </div>
                </div>
            </form>
        )
    }
}

export default CreateRootTrack
