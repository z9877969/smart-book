const validationOfEmail = value => {
  const regExp = /^([0-9a-zA-Z].*?@([0-9a-zA-Z].*\.\w{2,4}))$/gm;
  const emailIsValid = regExp.test(value);

  return emailIsValid;
};

const validationOfPassword = value => {
  const regExp = /^(?=.*\d)(?=.*[a-z]).{6,}$/gm;
  const passwordIsValid = regExp.test(value);

  return passwordIsValid;
};

const checkPasswordsForIdentity = (pass, repeatPass) => {
  return String(pass) !== String(repeatPass);
};

const errorsMassage = (value = '') => ({
  required: `Обов'язкове поле`,
  shortLength: `Повинно ввести мінімум ${value} символи`,
  invalidEmail: `Введіть корректний email`,
  invalidPassword: `Пароль повинен складатися не менше ніж з ${value} цифр або букв`,
  invalidPasswordRepeat: `Паролі не співпадають`,
});

const validate = values => {
  const errors = {};
  // userName
  if (!values.userName) {
    errors.userName = errorsMassage().required;
  } else if (values.userName.length < 3) {
    errors.userName = errorsMassage(3).shortLength;
  }

  // email
  if (!values.email) {
    errors.email = errorsMassage().required;
  } else if (!validationOfEmail(values.email)) {
    errors.email = errorsMassage().invalidEmail;
  }

  // password
  if (!values.password) {
    errors.password = errorsMassage().required;
  } else if (validationOfPassword(values.password)) {
    errors.password = errorsMassage(6).invalidPassword;
  }

  // password repeat
  if (!values.passwordRepeat) {
    errors.passwordRepeat = errorsMassage().required;
  } else if (
    checkPasswordsForIdentity(values.password, values.passwordRepeat)
  ) {
    errors.passwordRepeat = errorsMassage().invalidPasswordRepeat;
  }

  return errors;
};

export default validate;
