import React, { FC, memo, PropsWithChildren } from 'react';
import styled from 'styled-components';

type ChildrenPosition = 'left' | 'right';

export type RoadMapElementProps = {
  childrenPosition?: ChildrenPosition;
  svgLink: string;
};

type ChildrenWrapperProps = Pick<RoadMapElementProps, 'childrenPosition'>;

const ElementWrapper = styled.div`
  position: relative;
  display: flex;
`;

const ElementImageWrapper = styled.div`
  border: 3px ${(props) => props.theme.colors.main.primary} solid;
  border-radius: 50%;
  padding: 12px;
`;

const ChildrenWrapper = styled.div<ChildrenWrapperProps>`
  position: absolute;
  min-width: 194px;
  max-width: 194px;
  height: 100%;
  display: flex;
  ${(props) => (props.childrenPosition === 'left' ? 'left: 100px' : 'right: 100px')};
  ${(props) => (props.childrenPosition === 'left' ? 'text-align: left' : 'text-align: right')};
`;

const RoadMapElement: FC<PropsWithChildren<RoadMapElementProps>> = ({
  children,
  svgLink,
  childrenPosition,
}: PropsWithChildren<RoadMapElementProps>) => {
  const ElementImage = styled.img`
    width: 41px;
  `;

  return (
    <ElementWrapper>
      <ElementImageWrapper>
        <ElementImage src={svgLink} />
      </ElementImageWrapper>
      <ChildrenWrapper childrenPosition={childrenPosition}>{children}</ChildrenWrapper>
    </ElementWrapper>
  );
};

export default memo<PropsWithChildren<RoadMapElementProps>>(RoadMapElement);
