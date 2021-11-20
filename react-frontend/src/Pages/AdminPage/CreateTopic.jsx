import axios from 'axios'
import React, { Component } from 'react'
import './AdminPage.css'
export class CreateTopic extends Component {
    constructor(props){
        super(props)
        this.state={
            tag: '',
            type: '1',
            sname: '',
            fname: '',
            detail: '',
            isSubmiting: false
        }
        this.onChangeTag = this.onChangeTag.bind(this)
        this.onChangeType = this.onChangeType.bind(this)
        this.onChangeSname = this.onChangeSname.bind(this)
        this.onChangeFname = this.onChangeFname.bind(this)
        this.onChangeDetail = this.onChangeDetail.bind(this)
        this.onTopicSubmit = this.onTopicSubmit.bind(this)
    }
    onChangeSname(e){
        this.setState({sname: e.target.value})
    }
    onChangeFname(e){
        this.setState({fname: e.target.value})
    }
    onChangeDetail(e){
        this.setState({detail: e.target.value})
    }
    onChangeType(e){
        this.setState({type: e.target.value})
    }
    onChangeTag(e){
        this.setState({tag: e.target.value})
    }
    async onTopicSubmit(e){
        this.setState({isSubmiting: true})
        const data= {
            sname: this.state.sname,
            fname: this.state.fname,
            detail: this.state.detail,
            type: this.state.type,
            tag: this.state.tag
        }
        try{
            const res = await axios.post('/track/addTopic', data)
            console.log(res.data.status);
            if (res.data.status === 'success'){
                this.setState({isSubmiting: false})
                this.props.onAfterSubmiting()
            }else{
                console.log(res.data.status);
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className="adp-ct-box">
                <div className="adp-ct-head">
                    <span>Create Topics</span>
                    <button onClick={this.onTopicSubmit}>Submit</button>
                </div>
                <div className="adp-ct-name">
                    <input type="text" placeholder="Short Name" value={this.state.sname} onChange={this.onChangeSname} required/>
                    <input type="text" placeholder="Full Name" value={this.state.fname} onChange={this.onChangeFname} required/>
                </div>
                <div className="adp-ct-detail">
                    <textarea placeholder="Enter details" value={this.state.details} onChange={this.onChangeDetail}></textarea>
                </div>
                <div className="adp-ct-options">
                    <select className="adp-ct-type"onChange={this.onChangeType}>
                        <option value="1" defaultValue="selected">Major</option>
                        <option value="2">Minor</option>
                        <option value="3">Topic</option>
                        <option value="4">Sub topic</option>
                    </select>
                    <input type="text" placeholder="Tag" value={this.state.tag} onChange={this.onChangeTag}/>
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

export default CreateTopic
