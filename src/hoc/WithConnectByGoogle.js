import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setGoogleToken } from '../redux/login/loginActions';

const withConnectByGoogle = BaseComponent => {
  class WithConnectByGoogle extends Component {
    componentDidMount() {
      const { token, giveGoogleToken } = this.props;
      const googleToken = this.getToken();
      if (!token && this.getToken()) {
        giveGoogleToken(googleToken);
      }
    }

    componentDidUpdate() {
      const { token, giveGoogleToken } = this.props;
      const googleToken = this.getToken();
      if (!token && this.getToken()) {
        giveGoogleToken(googleToken);
      }
    }

    getToken = () => {
      const { search } = this.props.location;
      const token = new URLSearchParams(search).get('token');
      return token;
    };

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    token: state.session.token,
  });

  const mapDispatchToProps = dispatch => ({
    giveGoogleToken: googleToken => dispatch(setGoogleToken(googleToken)),
  });

  WithConnectByGoogle.propTypes = {
    token: PropTypes.string,
    giveGoogleToken: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
  };

  WithConnectByGoogle.defaultProps = {
    token: null,
    location: {
      search: '',
    },
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithConnectByGoogle);
};

withConnectByGoogle.propTypes = {
  WithConnectByGoogle: PropTypes.instanceOf(Component),
};

export default withConnectByGoogle;
