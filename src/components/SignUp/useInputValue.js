import {useState} from 'react';

export const useInputValue = (initialValues) => {
  const [value, setValue] = useState(initialValues);

  const onChangeValue =  (name, value)  => {
    setValue({ ...value, [name]: value });
  };

  return[value, onChangeValue, setValue];
}