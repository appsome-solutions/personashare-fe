import React, { ComponentType, FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerWithOverlay = css`
  :before {
    position: fixed;
    content: '';
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.8);
    width: 100%;
    height: 100%;
    z-index: 100;
  }

  :after {
    position: fixed;
    content: '';
    top: 50%;
    left: 50%;
    margin: -1.5em 0 0 -1.5em;
    width: 3em;
    height: 3em;
    animation: ${rotate} 0.6s linear;
    animation-iteration-count: infinite;
    border-radius: 500rem;
    border-color: rgb(118, 118, 118) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1);
    border-style: solid;
    border-width: 0.2em;
    box-shadow: 0 0 0 1px transparent;
    visibility: visible;
    z-index: 101;
  }
`;

type SpinnerOverlayProps = {
  isLoading: boolean;
};

export function withSpinnerOverlay<T>(Component: ComponentType<T>, spinnerOverlayProps: SpinnerOverlayProps) {
  const ComponentWithOverlaySpinner = styled(Component)<SpinnerOverlayProps>`
    ${spinnerOverlayProps => (spinnerOverlayProps.isLoading ? SpinnerWithOverlay : ``)};
  `;
  const result: FC<T> = props => <ComponentWithOverlaySpinner {...props} {...(spinnerOverlayProps as any)} />;

  return result;
}

export const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -1.5em 0 0 -1.5em;
  width: 3em;
  height: 3em;
  animation: ${rotate} 0.6s linear;
  animation-iteration-count: infinite;
  border-radius: 500rem;
  border-color: rgb(118, 118, 118) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-width: 0.2em;
  box-shadow: 0 0 0 1px transparent;
  visibility: visible;
  z-index: 101;
`;
