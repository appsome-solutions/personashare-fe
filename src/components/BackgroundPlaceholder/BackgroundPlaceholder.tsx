import React, { FC } from 'react';
import styled from 'styled-components';
import BgPlaceholder from 'assets/bg_placeholder.svg';
import AddPhoto from 'assets/add_bg_circle.svg';
import PersonaCircleSvg from 'assets/PersonaCircle.svg';

const Placeholder = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.functional.disabled};
  border-radius: 6px 6px 0 0;
  height: 154px;
`;

const BgImage = styled.img`
  max-height: 154px;
  width: 100%;
  object-fit: cover;
  border-radius: 6px 6px 0 0;
`;

const BgWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const EditBgIcon = styled.img`
  width: 42px;
  height: 42px;
  position: absolute;
  right: 14px;
  top: 10px;
`;

type BackgroundPlaceholderProps = {
  alt: string;
  background?: string;
  className?: any;
  isWithAddPhoto?: boolean;
};

export const BackgroundPlaceholder: FC<BackgroundPlaceholderProps> = ({
  background,
  isWithAddPhoto,
  children,
  alt,
  className,
}) => (
  <Placeholder className={className}>
    <BgWrapper>
      <BgImage src={background || BgPlaceholder} alt={alt} />
    </BgWrapper>
    {!background &&
      (isWithAddPhoto ? <EditBgIcon src={PersonaCircleSvg} alt={alt} /> : <EditBgIcon src={AddPhoto} alt={alt} />)}
    {children}
  </Placeholder>
);
