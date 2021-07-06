import { useState } from "react";

export const UseForm = (initialStateValue, props, ValidateInfo) => {
  const [values, setValues] = useState(initialStateValue);

  const [enteredNameTouched, setEnteredNmaeTouched] = useState(false);
  const [enteredPhoneTouched, setEnteredPhoneTouched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //copy value current  and then input update coloque valor que esta utilizando
    setValues({ ...values, [name]: value });
  };

  const handleInputBlurname = (e) => {
    handleInputChange(e);
    setEnteredNmaeTouched(true);
  };

  const handleInputBlurPhone = (e) => {
    handleInputChange(e);
    setEnteredPhoneTouched(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnteredNmaeTouched(true);
    setEnteredPhoneTouched(true);
    if (!enteredNameValid && !enteredPhoneValid) {
      return;
    }
    setEnteredNmaeTouched(false);
    setEnteredPhoneTouched(false);
    //setError(ValidateInfo(values));
    props.addOrEditContact(values);
    setValues({ ...initialStateValue });
  };

  const enteredNameValid = values.name.trim() !== "";
  const nameInputIsInvalid = !enteredNameValid && enteredNameTouched;

  const enteredPhoneValid = values.phone.trim() !== "";
  const phoneInputIsInvalid = !enteredPhoneValid && enteredPhoneTouched;

  let formIsValid = false;

  if (enteredNameValid && enteredPhoneValid) {
    formIsValid = true;
  }

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid "
    : "form-control ";

  const phoneInputClasses = phoneInputIsInvalid
    ? "form-control invalid "
    : "form-control ";
  return {
    values,
    handleInputChange,
    setValues,
    handleInputBlurname,
    handleInputBlurPhone,
    handleSubmit,
    enteredNameValid,
    nameInputIsInvalid,
    enteredPhoneValid,
    phoneInputIsInvalid,
    nameInputClasses,
    phoneInputClasses,
    formIsValid,
  };
};

//export default UseForm
