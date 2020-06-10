import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { Flex, BoxProps } from 'components/FlexBox/FlexBox';

type StepperProps = {
  items: number[];
  current: number;
} & BoxProps;

type StepperItemsProps = {
  isNextStep: boolean;
};

const StepperWrapper = styled(Flex)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  position: relative;
  ::after {
    content: '';
    position: absolute;
    background-color: ${(props) => props.theme.colors.main.primary};
    display: block;
    width: 100%;
    height: 3px;
    top: 11px;
    z-index: 1;
  }
`;

const StepperItem = styled.div<StepperItemsProps>`
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.theme.colors.main.primary};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  ${({ isNextStep, theme }) =>
    isNextStep &&
    css`
      background-color: white;
      border: 2px solid ${theme.colors.main.primary};
      color: ${theme.colors.utils.text.dark};
    `}
`;

export const Stepper: FC<StepperProps> = ({ items, current, ...restProps }: StepperProps) => {
  return (
    <StepperWrapper {...restProps}>
      {items.map((item, index) => (
        <StepperItem key={item} isNextStep={index + 1 > current}>
          {item}
        </StepperItem>
      ))}
    </StepperWrapper>
  );
};
