import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth, logout } from '../../store/auth/actions';

export default function(NestedComponent) {
  class Authenticate extends Component {
    componentDidMount() {
      if (!this.props.currentUser) {
        const token = localStorage.getItem('token');
        if (token) {
          this.props.auth();
        } else {
          this.props.logout();
          this.props.history.replace('/login');
        }
      }
    }

    render() {
      return (
        <>
          <NestedComponent {...this.props} />
        </>
      );
    }
  }

  const mapStateToProps = state => {
    const { currentUser, isLoading } = state.auth;
    return { currentUser, isLoading };
  };

  const mapDispatchToProps = dispatch => ({
    auth: () => dispatch(auth()),
    logout: () => dispatch(logout()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
