import React, { Component } from 'react';
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import './Signout.scss'

import { userSignoutRequest } from '../../store/actions'

// Props from mapDispatchToProps
interface SignoutProps {
  signout: () => void;
}

class Signout extends Component<SignoutProps, {}> {
  public static defaultProps: SignoutProps = { signout: () => { } }
  
  render() {
    return (
      <div onClick={() => this.props.signout()}>
        sign out
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): SignoutProps {
  return {
    signout: () => dispatch(userSignoutRequest()),
  }
}

export const SignoutConnected = connect(null, mapDispatchToProps)(Signout);