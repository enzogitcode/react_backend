
const CustomInput =({inputName, inputType, inputId, inputPlaceholder, labelFor, labelText, value, handleChange }) => {
  
  return (
    <div className="form-floating mb-3">
  <input name={inputName} type={inputType} className="form-control" placeholder={inputPlaceholder}
  />
  <label htmlFor="floatingInput">{labelText}</label>
</div>
  );
}

export default CustomInput;