import React, { Component } from "react";
import "./HeaderContainer.css";
class HeaderContainer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       dark:true,
       theme:"brown",
       language:"ENGLISH(INDIA)",
       buttonId: 1
    }
    // this.handleToggle= this.handleToggle.bind(this);
    // this.handleTheme= this.handleTheme.bind(this);
    this.handleClick= this.handleClick.bind(this); 
  }
  // handleToggle = (event)=>{
  //   this.setState({dark: !this.state.dark},()=>{
  //     //The transition from Light/Dark theme will be done in this callback.
  //     console.log("Dark theme :"+this.state.dark);
  //   });
    
  // }
  // handleTheme = (event)=>{
  //   this.setState({theme : event.target.value},()=>{
  //     //Theme change
  //     console.log("Current Theme is "+this.state.theme)
  //   })
  // }
  // handleLanguage = (event)=>{
  //   this.setState({...this.language = event.target.value},()=>{
  //     console.log("Current Language is "+this.state.language);
  //   })
  // }
  handleClick = (event) => {
    const key= event.target.value
    this.props.onButtonClick(key)
    this.setState({
      buttonId: key
    })
  }
  render() {
    return (
      <div className="header-box">
        <div className="header-box-1">
          <p>NEUTON</p>
        </div>
        <div className="header-box-2">
          <ul className="hb-link-list">
            <li value= "1" onClick={this.handleClick}>Home</li>
            <li value= "2" onClick={this.handleClick}>Why</li>
            <li value= "3" onClick={this.handleClick}>How</li>
            <li value= "4" onClick={this.handleClick}>Team</li>
          </ul>
        </div>
        {/* <div className="header-box-3">
          <div className="header-box-3-a">
            <label className="hb-switch">
              <input type="checkbox" onChange={this.handleToggle}/> 
              <span className="hb-slider hb-round"></span>
              <span className="hb-slider-text">Light</span>
            </label>
          </div>
          <div className="header-box-3-b">
            <select className="hb-search_categories" id="search_categories" onChange={this.handleLanguage}>
              <option value="Brown" defaultValue="selected">Brown</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Yellow">Yellow</option>
            </select>
          </div>
          <div className="header-box-3-c">
            <select className="hb-search_categories" id="search_categories" onChange={this.handleTheme}>
              <option value="ENGLISH(INDIA)" defaultValue="selected">ENGLISH(INDIA)</option>
              <option value="ENGLISH(UK)">ENGLISH(UK)</option>
              <option value="ESPANOL">ESPANOL</option>
              <option value="HINDI">HINDI</option>
            </select>
          </div>
        </div> */}
      </div>
    );
  }
}

export default HeaderContainer;
