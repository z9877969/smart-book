import * as React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  createArrayOfDate,
  createArrayOfCount,
  makeAverage,
  findDifference,
  // planPosition,
  // factPosition,
} from './helpersFn';
import styles from './Chart.module.css';

const Chart = ({ training }) => {
  // const width = document.documentElement.clientWidth;

  const {
    pagesReadResult: readPages,
    timeStart,
    timeEnd,
    allPagesCount,
  } = training;

  const arrayOfDate = createArrayOfDate(readPages).sort();
  const difference = findDifference(timeStart, timeEnd);
  const arrayOfCount = createArrayOfCount(arrayOfDate, readPages);
  // const lastCountReadPage = arrayOfCount[arrayOfCount.length - 1];
  const averageCountPage = Math.round(allPagesCount / difference);
  const { length } = arrayOfCount;
  const aim = makeAverage(averageCountPage, length);

  // const legendPosition = {
  //   plan: planPosition(
  //     lastCountReadPage,
  //     averageCountPage,
  //     arrayOfCount,
  //     width,
  //   ),
  //   fact: factPosition(
  //     lastCountReadPage,
  //     averageCountPage,
  //     arrayOfCount,
  //     width,
  //   ),
  // };

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
      <h3 className={styles.title}>КІЛЬКІСТЬ СТОРІНОК / ДЕНЬ</h3>
      <span className={styles.titleText}>{`${averageCountPage}`}</span>
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 15,
              left: 0,
              right: 20,
              bottom: 40,
            },
          },
          // title: {
          //   display: true,
          //   position: 'top',
          //   fontColor: '#091e3f',
          //   fontStyle: 'normal',
          //   padding: 10,
          //   left: 0,
          //   // horizontalAlign: 'right',
          //   text: `КІЛЬКІСТЬ СТОРІНОК / ДЕНЬ ${averageCountPage}`,
          //   fontSize: 12,
          // },
          legend: {
            display: true,
            position: 'bottom',
            padding: 20,
            labels: {
              fontSize: 12,
              fontFamily: 'Open Sans',
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
                  beginAtZero: true,
                  stepSize: 20,
                  fontSize: 10,
                  fontFamily: 'Open Sans',
                },
                gridLines: {
                  // display: false, /* removes grid lines if activate */
                  // drawBorder: false, /* removes grid lines if activate */
                  color: 'rgba(193, 196, 206, 0.4)',
                },
                display: true,
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: false,
                  // labelString: 'ЧАС',
                  // fontSize: 10,
                  // fontFamily: 'Open Sans',
                  // fontColor: '#242a37',
                  // fontStyle: 'bold',
                },
                ticks: {
                  display: true,
                  maxRotation: 45,
                  minRotation: 0,
                  fontSize: 10,
                  paddingRight: 15,
                  fontFamily: 'Open Sans',
                },
                gridLines: {
                  color: 'rgba(193, 196, 206, 0.4)',
                },
              },
            ],
          },
        }}
      />
      {/* {length > 1 && (
        <div className={styles.legendWrapper}>
          <p
            className={styles.legendItem}
            style={{ bottom: `${legendPosition.plan}px` }}
          >
            План
          </p>
          <p
            className={styles.legendItem}
            style={{ bottom: `${legendPosition.fact}px` }}
          >
            Факт
          </p>
        </div>
      )} */}
    </div>
  );
};
Chart.propTypes = {
  training: PropTypes.shape().isRequired,
};
export default Chart;
