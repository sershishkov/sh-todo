const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTaskInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  

  if (!Validator.isLength(data.text, { min: 6 })) {
    errors.text = 'Задача должна состоять минимум из 6 символов';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Это поле обязятельно';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Не выбран статус';
  }   
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
