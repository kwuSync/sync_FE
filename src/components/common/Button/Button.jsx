import React from 'react';
import * as S from './Button.style';

const Button = ({ children, onClick, ...props }) => {
  return (
    <S.ButtonWrapper onClick={onClick} {...props}>
      {children}
    </S.ButtonWrapper>
  );
};

export default Button;