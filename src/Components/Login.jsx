import React from "react";
import { Link } from "react-router-dom";
import "../Stylesheets/index.scss";

class Login extends React.Component {
  state = { email: "", password: "", errMessage: "" };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const body = {
      auth: { email, password },
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        this.props.logInHandler();
        this.props.history.push("/game");
      }
    } catch (err) {
      this.setState({
        errMessage: err.message,
      });
    }
  };

  render() {
    const { email, password, errMessage } = this.state;
    return (
      <div className="form-container">
        <h1>Login</h1>
        {errMessage && <span>{errMessage}</span>}

        <form onSubmit={this.onFormSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            data-testid="email"
            placeholder="Email"
            onChange={this.onInputChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            data-testid="password"
            placeholder="Password"
            onChange={this.onInputChange}
          />
          <div className="button">
            <input type="submit" value="Login" />
          </div>
        </form>
        <p className="clickHere">
          Click <Link to="/sign-up">HERE</Link> to SignUp
        </p>
      </div>
    );
  }
}

export default Login;
