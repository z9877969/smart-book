import React, { Component } from 'react';
import { connect } from 'react-redux';

const withAuthRedirect = BaseComponent => {
  class WithAuthRedirect extends Component {
    transformLocation = locationObj => {
      const loc = Object.values(locationObj);
      const locNew = loc.splice(0, loc.length - 1);
      return locNew.reduce((acc, el) => acc + el, '');
    };

    componentDidMount() {
      this.transformLocation(this.props.loc);
      if (this.props.authenticated) {
        this.props.history.replace(`${this.transformLocation(this.props.loc)}`);
      }
    }

    componentDidUpdate() {
      this.transformLocation(this.props.loc);
      if (this.props.authenticated) {
        this.props.history.replace(`${this.transformLocation(this.props.loc)}`);
      }
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    authenticated: state.session.authenticated,
    loc: state.lastLocation,
  });

  return connect(mapStateToProps)(WithAuthRedirect);
};

export default withAuthRedirect;
