import React from 'react';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import OutlinedFlagIcon from '@material-ui/icons/OutlinedFlag';
import styled from './StartingSteps.module.css';

const StartingSteps = () => (
  <div className={styled.wrapper}>
    <div className={styled.container}>
      <p className={styled.title}>Крок 1.</p>
      <div className={styled.secondTitle}>
        <MenuBookTwoToneIcon className={styled.bookIcon} />
        <p className={styled.titleText}>Створіть особисту бібліотеку</p>
      </div>
      <div className={styled.bodyText}>
        <SubdirectoryArrowRightIcon className={styled.arrowIcon} />
        <p className={styled.text}>
          Додайте до неї книжки, які маєте намір прочитати.
        </p>
      </div>
      <p className={styled.title}>Крок 2.</p>
      <div className={styled.secondTitle}>
        <OutlinedFlagIcon className={styled.flagIcon} />
        <p className={styled.titleText}>Сформуйте своє перше тренування</p>
      </div>
      <div className={styled.bodyText}>
        <SubdirectoryArrowRightIcon className={styled.arrowIcon} />
        <p className={styled.text}>
          Визначте ціль, оберіть період, розпочинайте тренування.
        </p>
      </div>
      <button type="button" className={styled.button}>
        Ok
      </button>
    </div>
  </div>
);

export default StartingSteps;
