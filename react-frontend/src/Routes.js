import axios from 'axios';
import { connect } from 'react-redux';
import history from './utils/history';
import React, { Component } from 'react'
import * as ACTIONS from "./store/actions/actions";


import TrackPage from './Pages/TrackPage/TrackPage';
import CoursePage from './Pages/CoursePage/CoursePage';
import { Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import SingleTrackPage from './Pages/SingleTrackPage/SingleTrackPage';
import ProfileCard from './Pages/ProfileCard/ProfileCard';
import AddResourcePage from './Pages/AddResourcePage/AddResourcePage';


class Routes extends Component{
    login = async () => {
        try {
            const userToken = localStorage.getItem('neuton_userToken')
            if(userToken && !this.props.isLogged){
                await axios.get('/auth/validateToken/',{params: {token: userToken}})
                this.props.login_success({token: userToken})
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        if(!this.props.isLogged){
            this.login()
        }
        return (
            <div>
                <Router history = {history}>
                    <Switch>
                        <Route exact path="/" component={LandingPage}/>
                        <Route exact path="/track" component={TrackPage}/>
                        <Route exact path="/track/:id" render={(props) => (
                            <SingleTrackPage key={props.match.params.id} {...props}/>
                        )}/>
                        <Route exact path="/course/:id" component={CoursePage}/>
                        <Route exact path='/add-resourse/:tid' component={AddResourcePage}/>
                        {/* <Route exact path="/addcourse" component={AddCoursePage}/> */}

                        <Route exact path="/:username" component={ProfileCard}/>
                        <Route exact path="/profile/:username" component={CoursePage}/>

                        {/* <Route exact path="/trio" component={AdminPage}/> */}
                        {/* <Route exact path="/secret/dashboard" component={SecretPage}/> */}
                        {/* <Route exact path="/secret/addtrack" component={AddTrackPage}/> */}
                    </Switch>
                </Router>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        isLogged: state.profile.isLogged,
        userToken: state.profile.userToken
    }
}

function mapDispatchToProps(dispatch) {
    return{
        login_success: (text) => dispatch(ACTIONS.login_success(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)