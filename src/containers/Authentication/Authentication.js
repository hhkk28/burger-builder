import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import FormInput from "../../components/ui/FormInput/FormInput";
import LoaderAnimation from "../../components/ui/LoaderAnimation/LoaderAnimation";
import classes from "./Auth.module.css";
import * as actions from "../../stores/actions/index";

class SignUp extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
          required: true,
        },
        value: "",
        valid: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
          required: true,
          minLength: 6,
        },
        value: "",
        valid: false,
      },
    },
    signupIsValid: false,
    isSignup: true,
  };
  onSubmitHandler(event) {
    event.preventDefault();
    this.props.onSubmitAuthentication(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  }
  inputChangeHandler(event, inputIdentifier) {
    const newSignupControls = {
      ...this.state.controls,
    };
    const newSignupElement = {
      ...newSignupControls[inputIdentifier],
    };
    newSignupElement.value = event.target.value;
    newSignupElement.valid = event.target.validity.valid;
    newSignupControls[inputIdentifier] = newSignupElement;
    let formIsValid = true;
    for (let input in newSignupControls) {
      formIsValid = newSignupControls[input].valid && formIsValid;
    }
    this.setState({ controls: newSignupControls, signupIsValid: formIsValid });
  }
  changeAuthenticationHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };
  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.changeAuthRedirectPath();
    }
  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = null;
    if (this.props.loading) {
      form = <LoaderAnimation />;
    } else {
      form = formElementsArray.map((formElement) => (
        <FormInput
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(event) => this.inputChangeHandler(event, formElement.id)}
        />
      ));
    }
    let authenticationError = null;
    if (this.props.error) {
      authenticationError = <p>{this.props.error}</p>;
    }
    let switchAuthInfo = {
      spanText: "Do you already have an account?",
      buttonText: "Click here to Login",
    };
    if (!this.state.isSignup) {
      switchAuthInfo = {
        spanText: "Need a new account?",
        buttonText: "Click here to Signup",
      };
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {authenticationError}
        <form onSubmit={(event) => this.onSubmitHandler(event)}>
          {form}
          <Button buttonType="Success" disabled={!this.state.signupIsValid}>
            Submit
          </Button>
        </form>
        <div>
          <p>
            <span>{switchAuthInfo.spanText}</span> &nbsp;
            <Button
              buttonType="Info"
              clicked={this.changeAuthenticationHandler}
            >
              {switchAuthInfo.buttonText}
            </Button>
          </p>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    loading: state.authentication.loading,
    error: state.authentication.error,
    isAuthenticated: state.authentication.token !== null,
    buildingBurger: state.burgerBuilder.buildingBurger,
    authRedirectPath: state.authentication.authRedirectPath,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onSubmitAuthentication: (email, password, isSignup) =>
      dispatch(actions.authentication(email, password, isSignup)),
    changeAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(SignUp);
