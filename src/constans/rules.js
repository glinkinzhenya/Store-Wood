export const rulesText = {
  required: (field) => `Треба ввести ${field}.`,
};
export const addFormRulesImage = {
  required: (field) => `Треба додати ${field}.`,
};

export const adminRules = {
  login: {
    required: { value: true, message: rulesText.required('логін') },
  },
  password: {
    required: { value: true, message: rulesText.required('пароль') },
  },
};

export const addFormRules = {
  name: {
    required: { value: true, message: rulesText.required('ПІБ') },
  },
  mail: {
    required: { value: true, message: rulesText.required('E-mail') },
  },
  number: {
    required: { value: true, message: addFormRulesImage.required('Номер телефону') },
  },
};
