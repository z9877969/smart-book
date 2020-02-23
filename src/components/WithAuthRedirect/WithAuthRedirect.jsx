import React, { Component } from 'react';
import { connect } from 'react-redux';

const withAuthRedirect = BaseComponent => {
  class WithAuthRedirect extends Component {
    componentDidMount() {
      // console.log('this.props.history', this.props.history);
      console.log('this.props.history', this.props.history);
      // console.log('this.props.history.length', this.props.history.length);
      // console.log('window', window.history.length);
      // history.go(index);
      // lastLocation = history.entries[history.index - 1];
      this.props.history.replace('/library');
      if (this.props.authenticated) {
        if (this.props.location === '/login') {
          // this.props.history.replace('/library');
        } else {
          const historyLength = this.props.history.length;
          // this.props.history.go(historyLength - 2);
        }
        // this.props.history.replace('/library');
        // const historyLength = this.props.history.length;
        // this.props.history.go(historyLength - 1);
      }
    }

    componentDidUpdate() {
      // if (this.props.authenticated) {
      //   this.props.history.replace('/library');
      //   const historyLength = this.props.history.length;
      //   // this.props.history.go(historyLength - 1);
      // }
      this.props.history.replace('/library');
      if (this.props.authenticated) {
        if (this.props.location === '/login') {
          // this.props.history.replace('/library');
        } else {
          const historyLength = this.props.history.length;
          // this.props.history.go(historyLength - 2);
        }
        // this.props.history.replace('/library');
        // const historyLength = this.props.history.length;
        // this.props.history.go(historyLength - 1);
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
