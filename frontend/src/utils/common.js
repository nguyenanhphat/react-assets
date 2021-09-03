import { TOKEN } from 'constants/cookies';
import Cookies from 'js-cookie';
import { forEach } from 'lodash';

export const checkFormInvalid = (form, listFieldRequire) => {
  let inValid = false;
  const formValue = form.getFieldsValue();
  forEach(formValue, (value, key) => {
    if (!listFieldRequire[key]) {
      return;
    }

    if (!value) {
      inValid = true;
    }
  });
  const errorRemain = form
    .getFieldsError()
    .filter(({ errors }) => errors.length).length;

  if (!inValid) {
    inValid = errorRemain ? true : false;
  }
  return inValid;
};

// export const checkFormAntInvalid = (form, requiredField = []) => {
//   let isEmptyObjects = false;
//   const errors = form.getFieldsError().filter(({ errors }) => errors.length)
//     .length;
//   if (requiredField.length) {
//     const dataFields = form.getFieldsValue() || {};
//     isEmptyObjects = !checkRequiredFieldHasValue(dataFields, requiredField);
//   }
//   return errors || isEmptyObjects;
// };

// const checkRequiredFieldHasValue = (object, requiredField) => {
//   if (!object || object === null) return false;
//   return (
//     Object.entries(object).every(([key, data]) => {
//       if (data && typeof data === 'object') {
//         return checkRequiredFieldHasValue(data, requiredField);
//       }
//       if (requiredField?.indexOf(key) !== -1) {
//         return !!data;
//       }
//       return true;
//     }) || false
//   );
// };

export const checkStatusSuccess = num => {
  if (num.toString().match(/2../)) {
    return true;
  }
  return false;
};

export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

let timer;
const DEFAULT_TIMEOUT = 300;
export const debounced = fn => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    fn();
    timer = null;
  }, DEFAULT_TIMEOUT);
};

export const getFileExtension = fileName => {
  if (!fileName) {
    return {};
  }
  const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
  const name = fileName.replace(/\.[^/.]+$/, '');
  return { extension, name };
};

export const lowerCaseKey = info => {
  if (!info) return;
  let obj = {};
  for (let key in info) {
    if (info.hasOwnProperty(key)) {
      const ketNew = key.toLowerCase();
      obj = Object.assign({}, obj, {
        [ketNew]: info[key],
      });
    }
  }
  return obj;
};

export const getEmailHide = email => {
  if (!email) {
    return '';
  }
  return `${email.substring(0, 3)}•••••${email.slice(email.length - 4)}`;
};

export const getPhoneHide = phone => {
  if (!phone) {
    return '';
  }
  return `•••••${phone.slice(phone.length - 4)}`;
};

export const getPhoneNumber = phone => {
  if (phone.charAt(0) === 0) {
    return phone.substr(1);
  }
  return phone;
};

// export class ValidateRequireField {
//   field = [];
//   constructor(validate) {
//     this.field = Object.entries(validate).reduce((acc, [key, value]) => {
//       if (value.find(_ => _.required)) {
//         acc.push(key);
//       }
//       return acc;
//     }, []);
//   }

//   check(form) {
//     const values = form.getFieldsValue(this.field);
//     return Object.values(values).some(_ => !_) || checkFormAntInvalid(form);
//   }
// }

export const setTokenSession = accessToken => {
  Cookies.set(TOKEN, accessToken);
};
export const getTokenSession = () => {
  return Cookies.get(TOKEN);
};
export const removeTokenSession = () => {
  return Cookies.remove(TOKEN);
};

export const formatCurrencyVnd = number => {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
