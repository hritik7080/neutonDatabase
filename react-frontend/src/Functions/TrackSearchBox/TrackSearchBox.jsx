import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './TrackSearchBox.css'
export class TrackSearchBox extends Component {
    constructor(props){
        super(props)
        this.state={
            isSearching: false,
            isFousing: false,
            isData: false,
            topics: []
        }
        this.onSeaching = this.onSeaching.bind(this)
        this.onFousIN = this.onFousIN.bind(this)
        this.onFousOUT = this.onFousOUT.bind(this)
    }
    async onSeaching(e){
        try {
            this.setState({
                isSearching: true
            })
            if(e.target.value.length >= 3){
                const res = await axios.get('/searchTrack/', {params: {query: e.target.value}})
                if(res.data.length !== 0){
                    this.setState({topics: [...res.data], isSearching: false, isData: true})
                }else{
                    this.setState({isData: false})
                }
            }else{
                this.setState({isSearching: false, isData: false})
            }
        } catch (error) {
            this.setState({isSearching: false, isData: false})
        }
    }
    onFousIN(){
        this.setState({isFousing: true})
        if (this.state.topics.length !== 0) {
            this.setState({isData: true})
        }
    }
    onFousOUT(){
        this.setState({
            isSearching: false,
            isFousing: false
        })
    }
    render() {
        return (
            <div onClick={this.onFousIN} onMouseLeave={this.onFousOUT} className="tsb-main">
                <div className="tsb-top-box">
                    <input type="text" onChange={this.onSeaching} placeholder="Search topic, subject or course"/>
                    {this.state.isSearching?
                        <span><img className="tsb-search-img" height="24px" width="24px" src="/media/images/search-loader.png" alt="search"/></span>    
                    :
                        <span><img className="tsb-search-btn" height="24px" width="24px" src="/media/images/black-lens.svg" alt="search"/></span>    
                    }
                </div>
                {this.state.isFousing?
                    <div className="tsb-bottom-box">
                        {!this.state.isData?
                            <div className="tsb-message-box">                        
                                <h3>No Results</h3>
                            </div>
                        :
                            <div className="tsb-result-box">                        
                                {this.state.topics && this.state.topics.map((item, index) => (
                                        <div className="tsb-result-row">
                                            <Link to={`/track/${item.id}`}>{item.title}</Link>
                                        </div>
                                    
                                ))}
                            </div>
                        }
                        <div className="tsb-result-row-end">
                            <p>I need track for this topic</p>
                        </div>
                    </div>
                :
                    null
                }
            </div>
        )
    }
}

export default TrackSearchBox
