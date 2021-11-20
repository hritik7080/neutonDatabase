import React, { Component } from 'react'
import * as ACTIONS from "../store/actions/actions";

import { connect } from "react-redux";

export class testContainer extends Component {
    render() {
        let data = "I am Satyam"
        return (
            <div>
                <button onClick={() => console.log(this.props.value, this.props.name)}>Get state</button>
                <button onClick={() => this.props.action1()}>SUCCESS</button>
                <button onClick={() => this.props.action2()}>FAILURE</button>
                <button onClick={() => this.props.action_creator1()}>Action Creator 1</button>
                <button onClick={() => this.props.action_creator2()}>Action_Creator 2</button>
                <button onClick={() => this.props.action_creator3(data)}>Action_Creator 3</button>
                {this.props.name
                ?<h1>{this.props.name}</h1>
                :null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        value: state.test.logic,
        name: state.profile.name
    }
}

function mapDispatchToProps(dispatch) {
    return{
        action1: () => dispatch(ACTIONS.SUCCESS),
        action2: () => dispatch(ACTIONS.FAILURE),
        action_creator1: () => dispatch(ACTIONS.success()),
        action_creator2: () => dispatch(ACTIONS.failure()),
        action_creator3: (text) => dispatch(ACTIONS.user_input(text))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(testContainer)
