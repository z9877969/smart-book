import React from 'react'; // , { useState } //uncomment
// import { useSelector, useDispatch } from 'react-redux'; //uncomment
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxSharp from '@material-ui/icons/CheckBoxSharp'; //uncomment
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PropTypes from 'prop-types';
// import { getUserToken } from '../../../redux/selectors/sessionSelectors'; //uncomment
// import { bookUpdate } from '../../../redux/books/BooksOperations'; //uncomment
import style from './TableItemInfo.module.css';

const TableItemInfo = ({ id, title, author, year, pagesCount }) => {
  // const token = useSelector(state => getUserToken(state)); // uncomment
  // const dispatch = useDispatch(); // uncomment

  // const [toggleInput, setToggleInput] = useState(false); // uncomment
  // const [bookId, setBookId] = useState(''); // uncomment

  // const pagesReadResultArr = useSelector(
  //   state => state.training.pagesReadResult,
  // );// uncomment

  // const bookPagesCount = useSelector(state =>
  //   state.training.books.find(book => book.bookId === bookId),
  // );// uncomment

  // const allPagesCount = useSelector(state => state.training.allPagesCount);// uncomment

  // const pagesReadResult = pagesReadResultArr
  //   ? [...pagesReadResultArr].reduce((acc, el) => acc + el.count, 0)
  //   : 0; // uncomment

  // console.log(pagesCount, bookPagesCount, allPagesCount, pagesReadResult); // last 3 arg must delete

  // const handleInputToggle = ({ target }) => {
  //   const { name, value } = target;
  //   setToggleInput(prev => !prev);
  //   setBookId(name);
  //   const fetchData = dispatch(bookUpdate(token, name, { status: 'readed' })); // uncomment

  //   console.log('token', token, '\nid', name, '\ndata', fetchData); // uncomment

  //   if (true) {
  //   } // uncomment

  //   console.log('handleInputChange\n', name, '\n', value);
  // }; // uncomment

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
        {/* {!toggleInput ? (  // uncomment */}
        <CheckBoxOutlineBlankIcon className={style.icon} />
        {/* // ) : ( // uncomment */}
        {/* // <CheckBoxSharp className={style.icon} /> // uncomment */}
        {/* // )} // uncomment */}
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
