import React, { Component } from "react";
class Home extends Component {
  render() {
  return (
    
       <div className="home">
         <img alt="" src={process.env.React_APP_API_URL + '/images/header.jpg'}></img>
                       
    </div>
        
  );
  }
}
export default Home;
