import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';



const particleOptions = {
    particles: {
      number: {
        density: {
          enable: true,
          value_area: 400
        },
        value:35
      },
      line_linked: {
        shadow: {
          enable: true,
          color: "#3CA9D1",
          blur: 5
        }
      },
      "shape": {
        type: "circle",
        stroke: {
          width: 1,
          color: "#fff"
        }
      }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name:'',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })

  }
  OnInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  CalculateBoundingBox = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return (
      clarifaiFaces.map((clarifaiFace, i) => {
        let clarifaiFaceRegion = clarifaiFace.region_info.bounding_box;
        return {
          left: clarifaiFaceRegion.left_col * width,
          top: clarifaiFaceRegion.top_row * height,
          right: width - (clarifaiFaceRegion.right_col * width),
          bottom: height - (clarifaiFaceRegion.bottom_row * height)
        }
      })
    )
    
  }

  updateBoxState = (box) => {
    this.setState({box: box})
  }



  OnButtonClick = () => {
    this.setState({imageUrl: this.state.input})
    fetch('https://whispering-sierra-61887.herokuapp.com/imageApi', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then( 
      response => {
        this.updateBoxState(this.CalculateBoundingBox(response))
        if(response) {
          // update entry count in server
          fetch('https://whispering-sierra-61887.herokuapp.com/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
    })
    .catch(err => {
      console.log(err)
    })
  }

  OnRouteChange = (route) => {
    if(route === 'home') {
      this.setState({isSignedIn: true})
    } else {
      this.setState(initialState)
    }
    this.setState({route : route})
  }

  render() {
    const {route, isSignedIn, box, imageUrl} = this.state;
    const {name, entries} = this.state.user;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particleOptions}
        />
        <Navigation 
          isSignedIn = {isSignedIn} 
          OnRouteChange = {this.OnRouteChange}
        />
        {
          (route === 'signin')
          ? <SignIn loadUser = {this.loadUser} OnRouteChange = {this.OnRouteChange} />
          : (
              (route === 'register')
              ? <Register loadUser = {this.loadUser} OnRouteChange = {this.OnRouteChange}/>
              : <div>
                  <Logo />
                  <Rank Username={name} Entries = {entries}/>
                  <ImageLinkForm 
                    OnInputChange = {this.OnInputChange}
                    OnButtonClick = {this.OnButtonClick} 
                  />
                  <FaceRecognition
                    Box = {box} 
                    ImageUrl = {imageUrl}
                  />
                </div>
            )
        }
      </div>
    );
  }
}

export default App;
