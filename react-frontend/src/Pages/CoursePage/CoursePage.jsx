import "./CoursePage.css"
import axios from "axios";
import {Helmet} from "react-helmet";
import { connect } from "react-redux"
// import { Helmet } from "react-helmet-async"
import React, { Component } from 'react'
import * as ACTIONS from "../../store/actions/actions"
import TrackMenu from '../../Containers/TrackMenu/TrackMenu'
import AddCourseContainer from "../../Containers/AddCourse/AddCourseContainer"
import SubscribeContainer from "../../Containers/Subscribe/SubscribeContainer"
import CourseCardContainer from '../../Containers/CourseCard/CourseCardContainer'
import { Link } from "react-router-dom";
import PageHeaderLayout from "../../layout/PageHeaderLayout/PageHeaderLayout";

export class CoursePage extends Component {
    constructor(props){
        super(props)
        this.state={
            res: 0,
            diff: 0,
            price: 0,
            sortValue: 0,
            filterData: [],
            courseData: [],
            isLoading: true,
            customOption: 0,
            isResAvail: true,
            showGoToTop: false,
            isCourseNull: true,
            isAddCourseClose: false
        }
        this.cpbody = React.createRef()
        this.topContainer = React.createRef()
        this.openSort = this.openSort.bind(this)
        this.onGotoTop =this.onGotoTop.bind(this)
        this.openFilter = this.openFilter.bind(this)
        this.onResSelect = this.onResSelect.bind(this)
        this.onDiffSelect = this.onDiffSelect.bind(this)
        this.onPriceSelect = this.onPriceSelect.bind(this)
        this.closeCustomMenu = this.closeCustomMenu.bind(this)
        this.handleCourseClose = this.handleCourseClose.bind(this)
        this.updatePosition= this.updatePosition.bind(this)
        this.onLoginSuccess = this.onLoginSuccess.bind(this)
        this.sorting = this.sorting.bind(this)
        this.updateFilter = this.updateFilter.bind(this)
    }
    componentDidMount(){
        const fetchCourseData = async() => {
            const res = await axios.get('/resource/',{params:{id: this.props.match.params.id}})
            if(res.data.length === 0){
                this.setState({isResAvail: false})
            }
            this.setState({courseData: res.data, filterData: res.data, isLoading: false})
            this.props.sendCourseData(res.data)
        }
        try{
            fetchCourseData()
            if(window.innerWidth < 700){
                this.setState({customOption: 2})
            }
        }catch (error){
            console.log(error)
            this.State= { isResAvail: false, errorMessage: "Reload Page"}
        }
    }
    updateFilter(){
        const data = (this.state.courseData).filter(item => {
            console.log(item.difficulty, item.type, item.price);
            var priceCode = 0
            if(Number(item.price) <= 0){
                priceCode = 1
            }else{
                priceCode = 2
            }
            if (this.state.res === 0 && this.state.diff === 0 && this.state.price === 0){
                return item
            }else if(this.state.res === 0 && this.state.diff === 0) {
                return this.state.price === priceCode
            }else if(this.state.diff === 0 && this.state.price === 0) {
                return this.state.res === Number(item.type)
            }else if(this.state.price === 0 && this.state.res === 0) {
                return this.state.diff === Number(item.difficulty)
            }else if(this.state.res === 0) {
                return this.state.diff === Number(item.difficulty) && this.state.price === priceCode
            }else if(this.state.diff === 0){
                return this.state.res === Number(item.type) && this.state.price === priceCode
            }else if(this.state.price === 0){
                return this.state.res === Number(item.type) && this.state.diff === Number(item.difficulty)
            }else{
                return this.state.res === Number(item.type) && this.state.diff === Number(item.difficulty) && this.state.price === priceCode
            }
        })
        if (data.length) {
            this.setState({isResAvail: true, filterData: data})
        }else{
            this.setState({isResAvail: false})
        }
    }
    onResSelect(e){
        e.preventDefault();
        this.setState({res: e.target.value}, () => this.updateFilter())
    }
    onDiffSelect(e){
        e.preventDefault();
        this.setState({diff: e.target.value}, () => this.updateFilter())
    }
    onPriceSelect(e){
        e.preventDefault();
        this.setState({price: e.target.value}, () => this.updateFilter())
        
    }
    updatePosition(){
        // console.log(this.cpbody.current.getBoundingClientRect().top + window.innerHeight);
        if (this.cpbody.current.getBoundingClientRect().top + window.innerHeight < 0) {
            this.setState({showGoToTop: true})
        }else{
            this.setState({showGoToTop: false})
        }
    }
    handleCourseClose(){
        this.setState({
            isAddCourseClose: true
        })
    }
    onGotoTop(){
        this.topContainer.current.scrollIntoView({
            behavior: "smooth", 
            block: "nearest"
         })
    }
    openFilter(){
        this.setState({customOption: 0})
    }
    openSort(){
        this.setState({customOption: 1})
    }
    closeCustomMenu(e){
        e.stopPropagation()
        this.setState({customOption: 2})
    }
    onLoginSuccess(){
        console.log("LOGIN SUCCESS");
    }
    sorting(e){
        this.setState({sortValue: e.target.value})
        var data = this.state.filterData
        switch (e.target.value) {
            case 0:
                data.sort(function(a, b){
                    return ((b.views +b.likes)/2) - ((a.likes + a.views)/2)
                })
                break;
            case 1:
                data.sort(function(a, b){
                    return b.likes - a.likes
                })
                break;
            case 2:
                data.sort(function(a, b){
                    return Number(b.price) - Number(a.price)
                })
                break;
            case 3:
                data.sort(function(a, b){
                    return Number(a.price) - Number(b.price)
                })
                break;
            default:
                break;
        }
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
                        <title>Loading...</title>
                    </Helmet>
                    <h1>NEUTON</h1>
                </div>
            :
            <div className="cp-main" onScroll={this.updatePosition}>
                {!this.props.isLogged || this.state.isLoading?
                    <div className="backdrop">
                        <SubscribeContainer onLoginSuccess={this.onLoginSuccess}/>
                    </div>
                :null}
                <Helmet>
                    {/* Page sittings */}
                    <meta charset="utf-8" />
                    <meta name="theme-color" content="#000000" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    
                    {/* Primary Meta Tags */}
                    <title>Resources</title>
                    <meta name="title" content="Resources"/>
                    <meta name="description" content="List of resources"/>
                    <meta name="keywords" content="Roadmap, track, career path, learning path"/>

                    {/* Open Graph / Facebook */}
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="https://neuton.space/course/1/"/>
                    <meta property="og:title" content="Resources"/>
                    <meta property="og:description" content="List of resources"/>
                    <meta property="og:image" content="/logo192.png"/>
                    
                    {/* Twitter */}
                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content="https://neuton.space/course/1/"/>
                    <meta property="twitter:title" content="Resources"/>
                    <meta property="twitter:description" content="List of resources"/>
                    <meta property="twitter:image" content="/logo192.png"/>
                </Helmet>
                <PageHeaderLayout>
                    <TrackMenu />
                </PageHeaderLayout>
                <div className="cp-body" >
                    <div className="cp-body-1" ref={this.cpbody}>
                        {!this.state.isResAvail?
                            <div className="cp-no-res">
                                <h2>Sorry!</h2>
                                <p>No resource available.</p>
                            </div>
                        :
                        <div className="cp-b1-box">
                            {this.state.filterData.map((item, index) => (
                                <CourseCardContainer key={index} data={item}/>
                            ))}
                            <div className="footer">
                                <p>The End</p>
                            </div>
                        </div>
                        }
                        
                    </div>
                    <div className="cp-body-2" >
                    <span ref={this.topContainer}></span>
                        <Link to={`/add-resourse/${this.props.match.params.id}`}>Add Resources</Link>
                        {!this.state.isAddCourseClose
                        ?<AddCourseContainer handleClose={this.handleCourseClose} data={this.props.match.params.id} />
                        :null
                        }
                        <div className={this.state.customOption === 2? "cp-customize cp-customize-off": "cp-customize"}>
                            <div className="cp-customize-head">
                                <div onClick={this.openFilter} className={this.state.customOption === 0 || this.state.customOption === 2? "cp-customize-active" : null}>
                                    <img height="16px" width="16px" style={{marginRight: '10px'}} src="/media/images/black-filter.png" alt="filter"/>
                                    <h4 style={{margin: "0"}}>Filter</h4>
                                    <span onClick={this.closeCustomMenu} style={this.state.customOption === 2? {display: 'none'}: null}>
                                        <img height="32px" width="32px" src="/media/images/black-cross.png" alt="sort"/>
                                    </span>
                                </div>
                                <div onClick={this.openSort} className={this.state.customOption === 1 || this.state.customOption === 2? "cp-customize-active" : null}>
                                    <img height="16px" width="16px" style={{marginRight: '10px'}} src="/media/images/black-sort.png" alt="sort"/>
                                    <h4 style={{margin: "0"}}>Sort</h4>
                                    <span onClick={this.closeCustomMenu} style={this.state.customOption === 2? {display: 'none'}: null}>
                                        <img height="32px" width="32px" src="/media/images/black-cross.png" alt="sort"/>
                                    </span>
                                </div>
                            </div>
                            {this.state.customOption === 2?
                                null
                            :
                                <div className="cp-customize-body">
                                {!this.state.customOption?
                                    <div className="cp-filter">
                                        <div className="cp-filter-line">
                                            <span>Price</span>
                                            <hr/>
                                        </div>
                                        <ul className="cp-list">
                                            <li id={this.state.price === 0? "cp-active": null} onClick={this.onPriceSelect} value="0">All</li>
                                            <li id={this.state.price === 1? "cp-active": null} onClick={this.onPriceSelect} value="1">Free</li>
                                            <li id={this.state.price === 2? "cp-active": null} onClick={this.onPriceSelect} value="2">Paid</li>
                                        </ul>
                                        <div className="cp-filter-line">
                                            <span>Resources</span>
                                            <hr/>
                                        </div>
                                        <ul className="cp-filter-res">
                                            <li id={this.state.res === 0? "cp-active": null} onClick={this.onResSelect} value="0">All Resources</li>
                                            <li id={this.state.res === 1? "cp-active": null} onClick={this.onResSelect} value="1">Course</li>
                                            <li id={this.state.res === 2? "cp-active": null} onClick={this.onResSelect} value="2">Article</li>
                                            <li id={this.state.res === 3? "cp-active": null} onClick={this.onResSelect} value="3">Books</li>
                                            <li id={this.state.res === 4? "cp-active": null} onClick={this.onResSelect} value="4">Project</li>
                                        </ul>
                                        <div className="cp-filter-line">
                                            <span>Difficulty</span>
                                            <hr/>
                                        </div>
                                        <ul className="cp-list">
                                            <li id={this.state.diff === 0? "cp-active": null} onClick={this.onDiffSelect} value="0">Mixed</li>
                                            <li id={this.state.diff === 1? "cp-active": null} onClick={this.onDiffSelect} value="1">Easy</li>
                                            <li id={this.state.diff === 2? "cp-active": null} onClick={this.onDiffSelect} value="2">Hard</li>
                                        </ul>
                                    </div>
                                    :
                                    <div className="cp-sort">
                                        <ul className="cp-filter-res">
                                            <li id={this.state.sortValue === 0? "cp-active": null} onClick={this.sorting} value="0">Most Popular</li>
                                            <li id={this.state.sortValue === 1? "cp-active": null} onClick={this.sorting} value="1">Highest likes</li>
                                            <li id={this.state.sortValue === 2? "cp-active": null} onClick={this.sorting} value="2">Highest Price</li>
                                            <li id={this.state.sortValue === 3? "cp-active": null} onClick={this.sorting} value="3">Lowest Price</li>
                                            {/* <li id={this.state.price === 5? "cp-active": null} onClick={this.sorting} value="5">Newest</li> */}
                                        </ul>
                                    </div>
                                    }
                                </div>   
                            }
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
        isLogged: state.profile.isLogged,
        userToken: state.profile.userToken,
        courseData: state.track.courseData
    }
}
function mapDispatchToProps(dispatch) {
    return{
        sendCourseData: (data) => dispatch(ACTIONS.save_course_data(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage)