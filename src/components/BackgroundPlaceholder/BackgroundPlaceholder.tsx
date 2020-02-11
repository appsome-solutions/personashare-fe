import React, { FC, MutableRefObject } from 'react';
import styled from 'styled-components';
import BgPlaceholder from 'assets/bg_placeholder.svg';
import AddPhoto from 'assets/add_photo.svg';

const Placeholder = styled.div`
  position: relative;
  background-color: ${props => props.theme.colors.functional.disabled};
  border-radius: 6px 6px 0 0;
  height: 154px;
`;

const BgImage = styled.img`
  // width: 100%;
  max-height: 154px;
  max-width: 100%;
`;

const BgWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
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
  ref?: MutableRefObject<HTMLDivElement | undefined>;
};

export const BackgroundPlaceholder: FC<BackgroundPlaceholderProps> = ({ background, children, alt }) => (
  <Placeholder>
    <BgWrapper>
      <BgImage src={background || BgPlaceholder} alt={alt} />
    </BgWrapper>
    {!background && <EditBgIcon src={AddPhoto} alt={alt} />}
    {children}
  </Placeholder>
);