import React, { Component } from 'react'
import TrackBox from '../../TrackBox/TrackBox'
import './TrackPosterContainer.css'

class TrackPosterContainers extends Component {
    constructor(props){
        super(props)
        this.state={
            dummyData: {
                selfId: 123,
                title: "Learn Programming Language",
                desc: 'A programming language is a formal language comprising a set of instructions that produce various kinds of output. Programming languages are used in computer programming to implement algorithms.',
                likes: 123,
                views: 123
            }
        }
    }

    render() {
        return (
            <div className="tpc-box">
                <button onClick={() => this.props.handleCloseAction()} className="tpc-btn">
                    <img width="16px" height="16px" src="./media/images/black-cross.png" alt="close"/>
                </button>
                <div className="tpc-head">
                    <div className="tpc-head-left">
                        <h2>Start Learning</h2>
                        <p>Choose the topic that you want to learn.</p>
                    </div>
                    <div className="tpc-head-right">
                        <img height='100px' src="./media/images/poster-person.svg" alt=""/>
                    </div>
                </div>
                <div className="tpc-body">
                    <TrackBox data={this.state.dummyData}/>
                </div>
                <div className="tpc-foot">
                    <div className="tpc-btn-box">
                        <button>Open Track</button>
                        <p>View full roadmap of the topic.</p>
                    </div>
                    <div className="tpc-btn-box">
                        <button>Resoures</button>
                        <p>View all the courses, project, articles and project of the topic.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default TrackPosterContainers
