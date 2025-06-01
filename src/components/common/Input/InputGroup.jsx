import React from "react";
import * as S from "./InputGroup.style";

const InputGroup = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <S.Group>
      <S.Label htmlFor={id}>{label}</S.Label>
      <S.Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Group>
  );
};

export default InputGroup;