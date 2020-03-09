import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import css from './Loader.module.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const CircularIndeterminate: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={css.container}>
      <div className={classes.root}>
        <CircularProgress color="secondary" />
      </div>
    </div>
  );
};
export default CircularIndeterminate;
