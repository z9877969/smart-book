import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import { endOfYearIso } from './timerHelpers';
import css from './PanelOfTimers.module.css';

const PanelOfTimers = ({ endOfTrainingIso }) => (
  <div className={css.panel}>
    <Timer title="До закінчення року залишилось" finishDate={endOfYearIso} />
    <Timer
      title="До досягнення мети залишилось"
      finishDate={endOfTrainingIso}
    />
  </div>
);

PanelOfTimers.propTypes = {
  endOfTrainingIso: PropTypes.string,
};

PanelOfTimers.defaultProps = {
  endOfTrainingIso: '2019-12-18T01:24:40',
};

export default PanelOfTimers;
