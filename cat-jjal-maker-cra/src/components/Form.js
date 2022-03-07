import React from "react";

const Form = ({updateMainCat}) => {
  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);

  function handleInputChage(event) {
    const userValue = event.target.value;
    setErrorMessage('');
    if (includesHangul(userValue)) {
      setErrorMessage('한글은 입력할 수 없습니다.')
    }
    setValue(event.target.value.toUpperCase());
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    setErrorMessage('');
    if (value === '') {
      setErrorMessage('빈 값으로 만들 수 없습니다.');
      return;
    }
    updateMainCat(value);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input 
      type="text" 
      name="name"
      value={value}
      placeholder="영어 대사를 입력해주세요"
      onChange={handleInputChage} />
      <button
        type="submit">생성</button>
      <p style={{color:"red"}}>
        {errorMessage}
      </p>
    </form>
  )
}

export default Form;