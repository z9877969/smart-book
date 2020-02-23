/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import makeStyles from '@material-ui/styles/makeStyles';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import Select from '@material-ui/core/Select';
import style from './Workout.module.css';
import TrainingBookTable from '../TrainingBooksTable/TrainingBooksTable';
import { postTraining } from '../../services/API';
import TableItemCreate from '../TrainingBooksTable/TableItemCreate/TableItemCreate';

const useStyles = makeStyles(() => ({
  selectEmpty: {
    marginRight: '21px',
    // margin: theme.spacing(1),
    backgroundColor: 'transparent',
    background: 'transparent',
    select: {
      // background: '#fff',
      backgroundColor: '#fff',
    },
    '.MuiSelect-selectMenu': {
      paddingLeft: 10,
    },
    '&$:focus': {
      backgroundColor: '#fff',
    },
    '&:focus': {
      background: '#fff',
    },
  },
}));

const Workout = ({ handleChangeToGoal }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  // state
  const [selectedBookId, setSelectedBookId] = useState('');
  const [books, setBooks] = useState([]);
  const [booksForRender, setBooksForRender] = useState([]);
  const [timeStart, setTimeStart] = useState(new Date().toISOString());
  const [timeEnd, setTimeEnd] = useState();
  const [avgReadPages, setAvgReadPages] = useState(0);
  const [selectedBook, setSelectedBook] = useState({
    _id: null,
    title: '',
  });

  // selectors
  const token = useSelector(state => state.session.token);
  const plannedBooks = useSelector(state =>
    state.books.filter(book => book.status === 'planned'),
  );

  // helpers
  const deleteBook = id => {
    const updatedBooks = booksForRender.filter(el => el._id !== id);
    setBooksForRender(updatedBooks);
    setBooks(books.filter(el => el.book !== id));
    handleChangeToGoal({ countBooks: booksForRender.length });
  };

  // handlers
  const handleTimeStart = date => {
    setTimeStart(date.toISOString());
    handleChangeToGoal({ startTime: date.toISOString() });
  };

  const handleTimeEnd = date => {
    setTimeEnd(date.toISOString());
    handleChangeToGoal({ finishTime: date.toISOString() });
  };

  const handleSubmitTrainingBook = evt => {
    evt.preventDefault();
    setSelectedBook({
      _id: null,
      title: '',
    });
    const getSelectedBook = [...plannedBooks]
      .filter(el => !booksForRender.includes(el))
      .find(el => el._id === selectedBookId);

    if (!getSelectedBook) return;
    setBooksForRender([...booksForRender, getSelectedBook]);
    setBooks([...books, { book: selectedBookId }]);
  };

  const handleAddTraining = async () => {
    if (booksForRender.length !== 0 && timeEnd) {
      const training = {
        books,
        timeStart,
        timeEnd,
        avgReadPages,
      };
      await dispatch(postTraining(training, token));
    }
  };

  const handleSelectBook = event => {
    setSelectedBookId(event.target.value);
    setSelectedBook(event.target.value);
  };

  // effects
  useEffect(() => {
    const allPages = booksForRender.reduce(
      (acc, el) => (el.pagesCount !== null ? acc + el.pagesCount : acc),
      0,
    );
    setAvgReadPages(allPages);
    handleChangeToGoal({ countBooks: booksForRender.length });
  }, [booksForRender]);

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <p className={style.title}>Моє тренування</p>
      </div>
      <div className={style.pickers}>
        <div className={style.pickerWrapper}>
          <div className={style.pickerTitle}>Початок тренування</div>
          <MuiPickersUtilsProvider
            className={style.pickerOverlay}
            utils={DateFnsUtils}
          >
            <DatePicker
              value={timeStart}
              onChange={handleTimeStart}
              disablePast
              disableFuture
              format="dd/MM/yyyy"
              InputProps={{ className: style.picker }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <div className={style.pickerTitle}>Кінець тренування</div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={timeEnd}
              onChange={handleTimeEnd}
              disablePast
              format="dd/MM/yyyy"
              InputProps={{ className: style.picker }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      <div className={style.selectContainer}>
        {selectedBook._id === null && (
          <p className={style.placeholder}>Обрати книги з бібліотеки</p>
        )}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth
          value={selectedBook}
          onChange={handleSelectBook}
          className={classes.selectEmpty}
          inputProps={{
            placeholder: 'Обрати книги з бібліотеки',
            style: { paddingLeft: '10px' },
          }}
        >
          {[...plannedBooks]
            .filter(el => !booksForRender.includes(el))
            .map(el => (
              <MenuItem data-id={el._id} value={el._id} key={el._id}>
                {el.title}
              </MenuItem>
            ))}
        </Select>
        <button
          type="button"
          className={style.button}
          onClick={handleSubmitTrainingBook}
        >
          Додати
        </button>
      </div>
      <TrainingBookTable>
        {booksForRender.length > 0 &&
          booksForRender.map(el => (
            <TableItemCreate
              key={el._id}
              id={el._id}
              title={el.title}
              author={el.author}
              year={el.year}
              pagesCount={el.pagesCount}
              deleteBook={deleteBook}
            />
          ))}
      </TrainingBookTable>
      <div className={style.submitOverlay}>
        <button
          type="submit"
          className={style.submit}
          onClick={handleAddTraining}
        >
          Почати тренування
        </button>
      </div>
    </div>
  );
};

export default Workout;
