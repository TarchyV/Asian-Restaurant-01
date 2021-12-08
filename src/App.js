import './App.css';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';




function Navbar(){
  return (
    <div className="Navbar">
        <a href="#">Home</a>
        <a href="#">Menu</a>
        <a href="#">Order</a>
    </div>
  );
}





function MapsComponent(props) {
  const center = {
    lat: 43.6532,
    lng: 79.3832,
  };
  const mapStyle = {
    width: props.width+'px',
    height: props.height+'px',
    border: '2px solid #c73434',
    boxShadow: 'rgba(50, 50, 93, 0.11) -15px 5px 60px 2px',
  };
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAEo7OvTsLY61QySxPc976dGOUGpmTAF4k',
    id: 'rocketleaguelivetracker',
  });
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={mapStyle}
        center={center}
        zoom={20}
        onLoad={onLoad}
        onUnmount={onUnmount}

      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>

}

class SplashNav extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      show: true,
      tagline: props.tagline,
      name: props.name,
      description: props.description,
      scrollPosition: 0,
      SplashStlye: {
        background: "linear-gradient(to right, #f0f0f0, #ffffff)",
        height: "50em",
        position: "fixed",
        width: "80%",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px",
        transition: "ease-in-out all 0.3s"
      },
      TitleStyle:{
        position: "absolute",
        color: "#c73434",
        fontSize: "6vw",
        marginTop: "5%",
        marginLeft: "5%",
        fontFamily: "Satisfy",
        textShadow: "5px 5px #1d1d1d3b",
        transition: "ease-in-out all 0.3s",
      },
      LogoStyle:{
        position: "absolute",
        marginTop: "1%",
        marginLeft: "1%",
        backgroundImage:"url('https://cdn-icons-png.flaticon.com/512/2518/2518266.png')",
        backgroundPosition: "center",
        backgroundSize: "contain",
        height: "50px",
        width: "50px",
        transition: "0.3s ease-in-out"
      }

    }
  }

  
  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
  
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  
    const scrolled = winScroll / height
    if(scrolled > 0.09){
      //update SplashStyle height
      console.log("HIDE")

      this.setState({
        SplashStlye: {
          background: "linear-gradient(to right, #f0f0f0, #ffffff)",
          height: "5vh",
          width: "80%",
          position: "fixed",
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px",
          transition: "ease-in-out all 0.3s",
        },
        TitleStyle:{
          position: "absolute",
          color: "#c73434",
          fontSize: "1.5vw",
          marginTop: "0.25vh",
          marginLeft: "4.5%",
          fontFamily: "Satisfy",
          transition: "ease-in-out all 0.3s",
        },
        LogoStyle:{
          position: "absolute",
          marginTop: "0.3vh",
          marginLeft: "1%",
          backgroundImage:"url('https://cdn-icons-png.flaticon.com/512/2518/2518266.png')",
          backgroundPosition: "center",
          backgroundSize: "contain",
          height: "35px",
          width: "35px",
          transition: "0.3s ease-in-out"
        },
        show: false
      })
    }else{
      //update SplashStyle height
      console.log("SHOW")

      this.setState({
        SplashStlye: {
          background: "linear-gradient(to right, #f0f0f0, #ffffff)",
          height: "50em",
          width: "80%",
          position: "fixed",
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px",
          transition: "ease-in-out all 0.3s"
        },
        TitleStyle:{
          position: "absolute",
          color: "#c73434",
          fontSize: "6vw",
          marginTop: "5%",
          marginLeft: "5%",
          fontFamily: "Satisfy",
          textShadow: "5px 5px #1d1d1d3b",
          transition: "ease-in-out all 0.3s",
  
        },
        LogoStyle:{
          position: "absolute",
          marginTop: "1%",
          marginLeft: "1%",
          backgroundImage:"url('https://cdn-icons-png.flaticon.com/512/2518/2518266.png')",
          backgroundPosition: "center",
          backgroundSize: "contain",
          height: "50px",
          width: "50px",
          transition: "0.3s ease-in-out"
        },
        
        show: true
      })
    }
  }
  


  componentDidMount(){
    window.addEventListener('scroll', this.listenToScroll)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.listenToScroll)
  }


  render(){
    var children = [];
    if(this.state.show){
      children.push(
        <p id="tagline" key={0}>{this.state.tagline}</p>
      )
      children.push(
        <div className="SplashImage" key={1}></div>
      );
      children.push(
        <div className="InfoBox"key={2}>
          <p key={3}>
          {this.state.description}
          </p>
          <div className="MapHolder" key={4}>
            <MapsComponent width={400} height={220} key={5} />
          </div>
        </div>       
      );
      children.push(
        <div key={6} className="ArrowBox">
        <h1 key={7} >Menu</h1>
        <div key={8} className="DownArrow"></div>
      </div>
      )
    }else{
      children = [];
    }
    return (
      <div className="SplashNav" style={this.state.SplashStlye}>
        <div className="Logo" style={this.state.LogoStyle}></div>
        <h1 className="Title" style={this.state.TitleStyle}> {this.state.name}</h1>
        {children}
       
      </div>
    );
  }
}


class Menu extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      description:props.description,
      

    }
  }


  render(){

    var menuItems = [];
    var menuNames = ["Chicken Teriyaki", "Dumplings", "Scallion Pancakes", "Sesame Chicken", "Lo Mein", "Kung Pao Shrimp" ]
    var prices = ["$10.99", "$9.99", "$8.99", "$9.99", "$9.99", "$9.99"]
    var imageUrls = [
  "https://images.unsplash.com/photo-1609183480237-ccbb2d7c5772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1607095097076-bf0221751ed6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80",
  "https://hips.hearstapps.com/hmg-prod/images/delish-200408-scallion-pancakes-001-ab-1588192822.jpg",
  "https://foodbythegram.com/wp-content/uploads/2021/03/94C0A52F-CA7B-4614-88DB-0C2F5FB40A17-11632-000002F940736485.jpg",
  "https://www.healthygffamily.com/wp-content/uploads/2019/12/A516112C-3492-4BB4-852C-D51B22C49232-scaled.jpg",
  "https://tasteasianfood.com/wp-content/uploads/2021/04/Kung-pao-shrimp-featured-image.jpg"
  ]
    for(var i = 0; i < menuNames.length; i++){

      menuItems.push(
        <div className="MenuItem"  key={i}>
          <div className="MenuItemDescription">
            <h2>{menuNames[i]}</h2>
            <p>{this.state.description}</p>
            <h3>{prices[i]}</h3>
            </div>
          <div className="MenuItemImage" style={
            {
              width: "45%",
              height: "100%",
              borderLeft: "#c73434 solid 2px",
              borderRight: "#c73434 solid 2px",
              float: "right",
              display: "inline-block",
              backgroundImage: "url(" + imageUrls[i] + ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }
          }></div>
          </div>
      )
    }
    return (
      <div className="Menu">
        {menuItems}
      </div>
    );
  }
}


function ContactUs(){
  return (
    <div className="ContactUs">
      <h1>Contact Us</h1>

        <div className="ContactDetails">
        <h3>Address: 129 Main St, Toronto CA</h3>
        <h3>Phone: (908)-555-2038</h3>
        <h3>Email: DineAsianZest@yahoo.ca</h3>
        <h3>Facebook: Facebook.com/AsianZing</h3>

        </div>

        <div className="Hours">
          <h3>Hours:</h3>
          <h3>Monday-Friday: 11:00am - 9:00pm</h3>
          <h3>Saturday: 11:00am - 10:00pm</h3>
          <h3>Sunday: 11:00am - 9:00pm</h3>
        </div>

      </div>
  );

  }

function App() {
  return (
    <div className="App">
      <SplashNav 
      name="Asain Zing"
      tagline = "Eastern Cuisine"
      description = "Asian Zing is a family owned business that specializes in Asian Cuisine. All of our dishes are made with the freshest ingredients.We are located in the heart of downtown Toronto."
      />
      <Menu 
      name="Chicken Teriyaki"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      price="$10.00"
      />
      <ContactUs />
    </div>
  );
}

export default App;
