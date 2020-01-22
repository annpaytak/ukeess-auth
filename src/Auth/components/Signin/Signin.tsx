import React, { Component } from 'react';
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import './Signin.scss'
import { ApplicationState } from '../../../store'

import { userSigninRequest, userSignoutRequest } from '../../store/actions'

// Props from parent (just for ilustration)
interface OwnProps { }

// Props from mapStateToProps
interface StateProps {
  email: string | null
}

// Props from mapDispatchToProps
interface DispatchProps {
  signin: () => void;
  signout: () => void;
}

// Own little state
interface SigninContainerState { }

type SigninContainerProps = OwnProps & StateProps & DispatchProps;

class Signin extends Component<SigninContainerProps, {}> {
  public static defaultProps: SigninContainerProps = {
    signin: () => { },
    signout: () => { },
    email: null
  }

  render() {
    return (
      <div>
        {this.props.email ?
          <div className="user-container">
            <p>{this.props.email}</p>
            <button onClick={() => this.props.signout()} className="outlined-button">sign out</button>
          </div>
          :
          <div className="user-container">
            <button onClick={() => this.props.signin()} className="outlined-button">sign in</button>
          </div>
        }
        <hr />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    signin: () => dispatch(userSigninRequest()),
    signout: () => dispatch(userSignoutRequest())
  }
}

function mapStateToProps(state: ApplicationState, ownProps: OwnProps): StateProps {
  return {
    email: state.auth.email,
  }
}

export const SigninConnected = connect(mapStateToProps, mapDispatchToProps)(Signin);