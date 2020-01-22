import React, { Component } from 'react';
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import './Signup.scss'

import { userSignupRequest } from '../../store/actions'

// Props from mapDispatchToProps
interface SignupProps {
  signup: () => void;
}

class Signup extends Component<SignupProps, {}> {
  public static defaultProps: SignupProps = { signup: () => { } }
  
  render() {
    return (
      <div onClick={() => this.props.signup()}>
        sign up
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): SignupProps {
  return {
    signup: () => dispatch(userSignupRequest()),
  }
}

export const SignupConnected = connect(null, mapDispatchToProps)(Signup);