import React from "react";
import "../Style/Header.css";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Modal from "react-modal";
import { jwtDecode } from "jwt-decode";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "antiquewhite",
    border: "solid 1px brown",
  },
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: "",
      display: "none",
      color: "",
      position: "",
      right: "",
      loginModalIsOpen: false,
      isLoggedIn: false,
      loggedInUser: undefined,
      signUpModalIsOpen: false,
    };
  }
  componentDidMount() {
    const path = this.props.history.location.pathname;
    let bg;
    let display;
    let color;
    let pos;
    let righ;
    if (path === "/" || path === "/home") {
      bg = "transparent";
      display = "none";
      color = "white";
      pos = "absolute";
      righ = "1%";
    } else {
      bg = "#c00a0a";
      display = "inline-block";
    }
    this.setState({
      backgroundColor: bg,
      display: display,
      color: color,
      position: pos,
      right: righ,
    });
  }
  handelSuccess = (response) => {
    console.log(response);
    const decode = jwtDecode(response?.credential);
    this.setState({
      isLoggedIn: true,
      loggedInUser: decode.name,
      loginModalIsOpen: false,
    });
    const ded = Object.values(decode);
    console.log("---------------------------------" + ded);
  };
  handleLogin = () => {
    this.setState({ loginModalIsOpen: true });
  };
  handleCancel = () => {
    this.setState({ loginModalIsOpen: false });
  };
  handleLogout = () => {
    this.setState({ isLoggedIn: false, loggedInUser: undefined });
  };
  handleSignUp = () => {
    this.setState({ signUpModalIsOpen: true });
  };
  handleSignCancel = () => {
    this.setState({ signUpModalIsOpen: false });
  };

  handleChange = (event) => {
    this.setState({ loggedInUser: event.target.value });
  };
  navigate = (path) => {
    this.props.history.push(path);
  };
  render() {
    const {
      color,
      position,
      right,
      backgroundColor,
      display,
      loginModalIsOpen,
      isLoggedIn,
      loggedInUser,
      signUpModalIsOpen,
    } = this.state;
    return (
      <div>
        <div
          className="backgroun"
          style={{
            backgroundColor: backgroundColor,
            position: position,
            right: right,
          }}
        >
          <div
            onClick={() => {
              this.navigate("/home");
            }}
            className="log"
            style={{ display: display, cursor: "pointer" }}
          >
            <p>e!</p>
          </div>
          {!isLoggedIn ? (
            <div className="btnnnBox">
              <button
                className="btnn btnn1 me-md-2"
                onClick={this.handleLogin}
                style={{ color: color }}
              >
                Login
              </button>
              <button
                className="btnn btnn2"
                onClick={this.handleSignUp}
                style={{ color: color }}
              >
                {" "}
                Create an account{" "}
              </button>
            </div>
          ) : (
            <div className="btnnnBox">
              <button className="btnn btnn2" onClick={this.handleLogout}>
                Logout{" "}
              </button>
              <button className="btnn btnn1 me-md-2">{loggedInUser}</button>
            </div>
          )}
        </div>

        <Modal isOpen={loginModalIsOpen} style={customStyles}>
          <div style={{ margin: "1em" }}>
            <h2 style={{ textAlign: "center", marginBottom: "1em" }}>
              Welcome to Zomato
            </h2>
            <input
              type="text"
              className="inputPart inputTxt"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <br />
            <input
              type="password"
              className="inputPart inputPas"
              placeholder="Password"
            />
            <div className="buttonDiv">
              <p type="button" onClick={this.handleCancel}>
                Cancel Login ?
              </p>
              <button type="button" class="btn ">
                Log in
              </button>
            </div>
          </div>
          <h6 style={{ textAlign: "center" }}>OR</h6>
          <div className="GooglePas">
            <GoogleOAuthProvider clientId="901018032033-ivup34ikdfcequ05se9okk5qr42l6fls.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={this.handelSuccess}
                onError={() => {
                  console.log("login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div>
          <div className="Facebook">
            <LoginSocialFacebook
              appid="1148338952919188"
              onResolve={(response) => {
                console.log(response);
              }}
              onReject={(error) => {
                console.log(error);
              }}
            >
              <FacebookLoginButton />
            </LoginSocialFacebook>
          </div>
        </Modal>

        <Modal isOpen={signUpModalIsOpen} style={customStyles}>
          <div className="boss">
            <h2>Sign Up</h2>
            <p>Fill this form to create an account</p>
            <hr />
            <div style={{ margin: "8px" }}>
              <span>
                <b>First Name:&nbsp;&nbsp;&ensp;&emsp;&emsp;&emsp;</b>
              </span>
              <input
                type="text"
                className="newligin"
                placeholder="First Name"
              />
              <br /> <br />
              <span>
                <b>Last Name:&emsp;&emsp;&emsp;&emsp;</b>
              </span>
              <input type="text" placeholder="Last Name" />
              <br /> <br />
              <span>
                <b>Mobile Number:&nbsp;&nbsp;&nbsp;&emsp;</b>
              </span>
              <input type="text" placeholder="Mobile Number" />
              <br /> <br />
              <span>
                <b>
                  Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                </b>
              </span>
              <input type="text" placeholder="Email" />
              <br /> <br />
              <span>
                <b>Password:&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;</b>
              </span>
              <input type="Password" placeholder="Password" />
              <br /> <br />
              <span>
                <b>Confirm Password:&nbsp;&nbsp;&nbsp;</b>
              </span>
              <input type="Password" placeholder="Confirm Password" />
            </div>
            <hr />
            <div className="signup-btn">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={this.handleSignCancel}
              >
                Cancel
              </button>
              <button type="button" class="btn btn-danger">
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Header;
