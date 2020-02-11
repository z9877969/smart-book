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
import { addUserTraining } from '../../redux/userTraining/userTrainingActions';
import TrainingTableInfo from '../TrainingTableInfo/TrainingTableInfo';
import { postTraining } from '../../services/API';

const useStyles = makeStyles(theme => ({
  selectEmpty: {
    marginRight: '21px',
    margin: theme.spacing(1),
    backgroundColor: 'transparent',
    background: 'transparent',
    '.MuiSelect-selectMenu': {
      paddingLeft: 10,
    },
    // marginTop: theme.spacing(2),
    '&$:focus': {
      backgroundColor: '#fff',
    },
    '&:focus': {
      background: '#fff',
    },
    '.MuiSelect-select': {
      background: '#fff',
    },
  },
}));

const Workout = ({ handleChangeToGoal }) => {
  const classes = useStyles();
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

  const dispatch = useDispatch();
  const token = useSelector(state => state.session.token);
  const haveTraining = useSelector(state => state.user.haveTraining);

  const plannedBooks = useSelector(state =>
    state.books.filter(book => book.status === 'planned'),
  );

  const handleTimeStart = date => {
    setTimeStart(date.toISOString());
    handleChangeToGoal({ startTime: date.toISOString() });
  };

  const handleTimeEnd = date => {
    setTimeEnd(date.toISOString());
    handleChangeToGoal({ finishTime: date.toISOString() });
  };

  // const addBook = evt => {
  //   setSelectedBookId(evt.target.options[evt.target.selectedIndex].dataset.id);
  // };

  const handleSubmit = evt => {
    evt.preventDefault();
    const getSelectedBook = plannedBooks.find(el => el._id === selectedBookId);
    if (booksForRender.find(el => el._id === selectedBookId)) return;
    setBooksForRender([...booksForRender, getSelectedBook]);
    setBooks([...books, { book: selectedBookId }]);

    setSelectedBook({
      _id: null,
      title: '',
    });
  };

  const deleteBook = id => {
    const updatedBooks = booksForRender.filter(el => el._id !== id);
    setBooksForRender(updatedBooks);
    setBooks(books.filter(el => el.book !== id));
    handleChangeToGoal({ countBooks: booksForRender.lenght });
  };

  useEffect(() => {
    const allPages = booksForRender.reduce(
      (acc, el) => (el.pagesCount !== null ? acc + el.pagesCount : acc),
      0,
    );
    setAvgReadPages(allPages);
    handleChangeToGoal({ countBooks: booksForRender.lenght });
  }, [booksForRender]);

  const addTraining = () => {
    if (booksForRender.length !== 0 && timeEnd) {
      const training = {
        books,
        timeStart,
        timeEnd,
        avgReadPages,
      };
      dispatch(addUserTraining(training));
      dispatch(postTraining(training, token));
      // setSelectedBookId('');
      // setBooks([]);
      // setBooksForRender([]);
      // setTimeEnd(new Date().toISOString());
    }
  };

  const handleSelectBook = event => {
    setSelectedBookId(event.target.value);
    setSelectedBook(event.target.value);
  };

  return (
    <div className={style.container}>
      {haveTraining ? (
        <TrainingTableInfo />
      ) : (
        <>
          <div className={style.pickers}>
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
          <div className={style.selectContainer}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              value={selectedBook}
              onChange={handleSelectBook}
              className={classes.selectEmpty}
              inputProps={{
                placeholder: 'Виберіть книгу...',
                style: { paddingLeft: '10px' },
              }}
            >
              {plannedBooks.map(el => (
                <MenuItem data-id={el._id} value={el._id} key={el._id}>
                  {el.title}
                </MenuItem>
              ))}
            </Select>
            <button
              type="button"
              className={style.button}
              onClick={handleSubmit}
            >
              Додати
            </button>
          </div>
          <TrainingBookTable books={booksForRender} deleteBook={deleteBook} />
          <button type="submit" className={style.submit} onClick={addTraining}>
            Почати тренування
          </button>
        </>
      )}
    </div>
  );
};

export default Workout;
