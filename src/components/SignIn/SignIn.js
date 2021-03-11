/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import NProgress from 'nprogress';
import "nprogress/nprogress.css";


class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  OnEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  OnPaswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  OnSignInSubmit = () => {
    NProgress.start();
    const {signInEmail, signInPassword } = this.state;
    fetch('https://whispering-sierra-61887.herokuapp.com/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.id) {
        this.props.loadUser(data)
        this.props.OnRouteChange('home');
        NProgress.done()
      } 
    })

  }

  render() {
    const {OnRouteChange} = this.props
    return (
      <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Sign In</legend>
              
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                <input 
                  onChange = {this.OnEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address" 
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                <input 
                  onChange = {this.OnPaswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password" 
                  id="password" 
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.OnSignInSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                type="submit" 
                value="Sign in" 
              />
            </div>
            <div className="lh-copy mt3">
              <a
                onClick={() => OnRouteChange('register')}
                className="f6 link dim black db pointer"
              >Register</a>
            </div>
          </div>
        </main>
      </article>
    )
  }

}


export default SignIn;
