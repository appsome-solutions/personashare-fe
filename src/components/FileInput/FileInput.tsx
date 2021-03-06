import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const HiddenInput = styled.input`
  display: none;
`;

const AbsoluteLabel = styled.label`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
`;

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  onFileChange?: (file: File) => void;
};

export const FileInput: FC<FileInputProps> = ({ name, id, onFileChange, ...rest }) => (
  <AbsoluteLabel htmlFor={id}>
    <HiddenInput
      type="file"
      name={name}
      id={id}
      onChange={(e) => {
        if (e && e.target && e.target.files) {
          onFileChange && onFileChange(e.target.files[0]);
        }
      }}
      {...rest}
    />
  </AbsoluteLabel>
);
