import * as React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  createArrayOfDate,
  createArrayOfCount,
  makeAverage,
  findDifference,
} from './helpersFn';
import styles from './Chart.module.css';

const Chart = ({ training }) => {
  const { pagesReadResult, timeStart, timeEnd, allPagesCount } = training;

  const arrayOfDate = createArrayOfDate(pagesReadResult).sort();
  const difference = findDifference(timeStart, timeEnd, arrayOfDate);
  const arrayOfCount = createArrayOfCount(arrayOfDate, pagesReadResult);
  const averageCountPage = (allPagesCount / difference).toFixed(0);
  const { length } = arrayOfCount;
  const aim = makeAverage(averageCountPage, length);

  const data = {
    labels: arrayOfDate,
    datasets: [
      {
        label: 'Факт',
        data: arrayOfCount,
        borderColor: '#d97833',
        backgroundColor: '#d97833',
        fill: false,
      },
      {
        label: 'План',
        data: aim,
        borderColor: '#091e3f',
        backgroundColor: '#091e3f',
        fill: false,
      },
    ],
  };

  return (
    <div className={styles.ChartWrapper}>
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 10,
              left: 10,
              right: 10,
              bottom: 10,
            },
          },
          title: {
            display: true,
            position: 'top',
            fontColor: '#091e3f',
            fontStyle: 'normal',
            padding: 10,
            left: 0,
            // horizontalAlign: 'right',
            text: `КІЛЬКІСТЬ СТОРІНОК / ДЕНЬ ${averageCountPage}`,
            fontSize: 12,
          },
          legend: {
            display: false,
            position: 'right',
            padding: 20,
            labels: {
              fontSize: 12,
              fontFamily: 'Montserrat',
              fontColor: '#242a37',
              boxWidth: 5,
              padding: 10,
              fullWidth: false,
              usePointStyle: true,
            },
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  position: 'left',
                },
                ticks: {
                  display: true,
                },
                gridLines: {
                  color: 'rgba(193, 196, 206, 0.4)',
                },
                display: true,
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'ЧАС',
                  fontSize: 12,
                  fontFamily: 'Montserrat',
                  fontColor: '#242a37',
                  fontStyle: 'bold',
                },
                ticks: {
                  display: true,
                  minRotation: 30,
                },
                gridLines: {
                  color: 'rgba(193, 196, 206, 0.4)',
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

Chart.propTypes = {
  training: PropTypes.shape().isRequired,
};

export default Chart;
