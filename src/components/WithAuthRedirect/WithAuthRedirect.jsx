import React, { Component } from 'react';
import { connect } from 'react-redux';

const withAuthRedirect = BaseComponent => {
  class WithAuthRedirect extends Component {
    componentDidMount() {
      if (this.props.authenticated) {
        this.props.history.replace('/library');
      }
    }

    componentDidUpdate() {
      if (this.props.authenticated) {
        this.props.history.replace('/library');
      }
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    authenticated: state.session.authenticated,
  });

  return connect(mapStateToProps)(WithAuthRedirect);
};

export default withAuthRedirect;
