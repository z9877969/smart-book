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
// import { addUserTraining } from '../../redux/userTraining/userTrainingActions';
import { postTraining } from '../../services/API';
import TableItemCreate from '../TrainingBooksTable/TableItemCreate/TableItemCreate';

const useStyles = makeStyles(theme => ({
  selectEmpty: {
    marginRight: '21px',
    margin: theme.spacing(1),
    backgroundColor: 'transparent',
    background: 'transparent',
    '.MuiSelect-selectMenu': {
      paddingLeft: 10,
    },
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

  const handleSubmit = evt => {
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
      // dispatch(addUserTraining(training));
      dispatch(postTraining(training, token));
    }
  };

  const handleSelectBook = event => {
    setSelectedBookId(event.target.value);
    setSelectedBook(event.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <p className={style.title}>Моє тренування</p>
      </div>
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
          {[...plannedBooks]
            .filter(el => !booksForRender.includes(el))
            .map(el => (
              <MenuItem data-id={el._id} value={el._id} key={el._id}>
                {el.title}
              </MenuItem>
            ))}
        </Select>
        <button type="button" className={style.button} onClick={handleSubmit}>
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
        <button type="submit" className={style.submit} onClick={addTraining}>
          Почати тренування
        </button>
      </div>
    </div>
  );
};

export default Workout;
