import React, { FC } from 'react';
import styled from 'styled-components';

import { BoxProps } from 'components/FlexBox/FlexBox';
import AddPhoto from 'assets/add_photo.svg';
import { FileInput } from '../FileInput/FileInput';

const PersonCircle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 115px;
  width: 115px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.utils.background.light};
`;

export const PersonaCircleWrapper = styled.div`
  position: absolute;
  height: 50%;
  width: 100%;
  display: flex;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`;

export const AvatarImage = styled.img`
  width: 100%;
  border-radius: 50%;
`;

type PersonaCircleProps = {
  alt: string;
  avatar?: string;
  onAvatarSet(file: File): void;
};

export const PersonaCircle: FC<BoxProps & PersonaCircleProps> = ({ alt, avatar, onAvatarSet, ...restProps }) => {
  return (
    <PersonCircle {...restProps}>
      <AvatarImage src={avatar || AddPhoto} alt={alt} />
      <FileInput onFileChange={onAvatarSet} name="avatar" id="avatar" accept="image/*" />
    </PersonCircle>
  );
};