import React from 'react'; // , { useState }
// import { useSelector, useDispatch } from 'react-redux';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxSharp from '@material-ui/icons/CheckBoxSharp';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PropTypes from 'prop-types';
// import { getUserToken } from '../../../redux/selectors/sessionSelectors';
// import { bookUpdate } from '../../../redux/books/BooksOperations';
import style from './TableItemInfo.module.css';

const TableItemInfo = ({ id, title, author, year, pagesCount }) => {
  // const token = useSelector(state => getUserToken(state));
  // const dispatch = useDispatch();

  // const [toggleInput, setToggleInput] = useState(false);
  // const [bookId, setBookId] = useState('');

  // const pagesReadResultArr = useSelector(
  //   state => state.training.pagesReadResult,
  // );
  // const bookPagesCount = useSelector(state =>
  //   state.training.books.find(book => book.bookId === bookId),
  // );
  // const allPagesCount = useSelector(state => state.training.allPagesCount);
  // const books = useSelector(state => state.books);

  // const pagesReadResult = pagesReadResultArr
  //   ? [...pagesReadResultArr].reduce((acc, el) => acc + el.count, 0)
  //   : 0;
  // // console.log(pagesCount);

  // const handleInputToggle = ({ target }) => {
  //   const { name, value } = target;

  //   const book = books.find(book => book._id === name)

  //   setToggleInput(prev => !prev);
  //   setBookId(name);
  //   const fetchData = dispatch(bookUpdate(token, book));

  //   // console.log('token', token, '\nid', name, '\ndata', fetchData);

  //   if (true) {
  //   }

  //   console.log('handleInputChange\n', name, '\n', value);
  // };

  return (
    <li key={id} className={style.bookListItem}>
      <input
        className={style.input}
        type="checkbox"
        name={id}
        // value={toggleInput}
        id={title}
        // onClick={handleInputToggle}
      />
      <label htmlFor={title} className={style.label}>
        {/* {!toggleInput ? ( */}
        <CheckBoxOutlineBlankIcon className={style.icon} />
        {/* ) : (
          <CheckBoxSharp className={style.icon} />
        )} */}
        {/* <CheckBoxIcon className={style.icon} /> */}
        <div className={style.bookListItemBody}>
          <p className={style.bookTitle}>{title}</p>
          <div className={`${style.bookInfo} ${style.bookAuthor}`}>
            <p className={style.bookName}>Автор:</p>
            <p className={style.bookData}>{author}</p>
          </div>
          <div className={`${style.bookInfo} ${style.bookYear}`}>
            <p className={style.bookName}>Рiк:</p>
            <p className={style.bookData}>{year}</p>
          </div>
          <div className={`${style.bookInfo} ${style.bookPages}`}>
            <p className={style.bookName}>Стор.:</p>
            <p className={style.bookData}>{pagesCount}</p>
          </div>
        </div>
      </label>
    </li>
  );
};

TableItemInfo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  pagesCount: PropTypes.number.isRequired,
};

export default TableItemInfo;
