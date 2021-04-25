import React from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      requestFailed: false,
      errorMessage: "",
    };
  }

  OnNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  OnEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  OnInputFocus = () => {
    this.setState({ requestFailed: false });
  };

  OnPaswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  OnRegisterSubmit = (event) => {
    event.preventDefault();
    NProgress.start();
    const { email, password, name } = this.state;
    fetch("https://whispering-sierra-61887.herokuapp.com/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.OnRouteChange("home");
        } else {
          this.setState({
            requestFailed: true,
            errorMessage: "Unable to register",
          });
        }
        NProgress.done();
      });
  };

  render() {
    const { requestFailed, errorMessage } = this.state;
    return (
      <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 black-80">
          <form className="measure" onSubmit={this.OnRegisterSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={this.OnNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  required
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.OnEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.OnPaswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  required
                />
              </div>
            </fieldset>
            {requestFailed ? <div className="error">{errorMessage}</div> : null}
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                type="submit"
                value="Register"
              />
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Register;
