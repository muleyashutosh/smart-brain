/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      requestFailed: false,
      errorMessage: "",
    };
  }

  OnEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  OnPaswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  OnInputFocus = () => {
    this.setState({ requestFailed: false });
  };

  OnSignInSubmit = async (event) => {
    event.preventDefault();
    NProgress.start();
    const { signInEmail, signInPassword } = this.state;
    try {
      const response = await fetch(
        "https://whispering-sierra-61887.herokuapp.com/signin",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: signInEmail,
            password: signInPassword,
          }),
        }
      );
      const data = await response.json();
      if (data.id) {
        this.props.loadUser(data);
        this.props.OnRouteChange("home");
      } else if (data === "Wrong Credentials") {
        this.setState({
          requestFailed: true,
          errorMessage: "Invalid Email/Password",
        });
      } else {
        this.setState({
          requestFailed: true,
          errorMessage: "Error connecting to Server",
        });
      }
      NProgress.done();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { OnRouteChange } = this.props;
    const { requestFailed, errorMessage } = this.state;
    return (
      <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 black-80">
          <form className="measure" onSubmit={this.OnSignInSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Sign In</legend>
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
                  onFocus={this.OnInputFocus}
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
                  onFocus={this.OnInputFocus}
                  required
                  min="8"
                />
              </div>
            </fieldset>
            {requestFailed ? <div className="error">{errorMessage}</div> : null}
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <a
                onClick={() => OnRouteChange("register")}
                className="f6 link dim black db pointer"
              >
                Register
              </a>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default SignIn;
