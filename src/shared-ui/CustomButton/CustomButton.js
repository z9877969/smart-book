import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyle = makeStyles(theme => ({
  contained: {
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  },
  outlined: {
    color: 'var(--rusty-orange)',
    borderColor: 'var(--rusty-orange)',
    borderWidth: 1,
  },
}));

const CustomButton = ({ variant, size, className, children, ...rest }) => {
  const classes = useStyle();

  return (
    <Button
      variant={variant}
      size={size || 'medium'}
      className={`${className} ${classes[variant]} `}
      {...rest}
    >
      {' '}
      {children}{' '}
    </Button>
  );
};

CustomButton.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.func, PropTypes.shape()]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

CustomButton.defaultProps = {
  variant: 'contained',
  size: 'medium',
  className: {},
};

export default CustomButton;
