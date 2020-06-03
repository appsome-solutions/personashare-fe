import styled, { css } from 'styled-components';

export interface IconProps {
  svgLink: string;
  width?: string;
  height?: string;
  cursor?: string;
  color?: string;
  hoverBackground?: string;
}

const defaults: IconProps = {
  height: '24px',
  width: '24px',
  svgLink: '',
  cursor: 'pointer',
};

const Icon = styled.div.attrs({
  role: 'img',
})<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: ${(props) => props.cursor};
  mask-image: url(${(props) => props.svgLink});
  mask-position: center;
  background: ${(props) => props.color || props.theme.colors.utils.text.dark} no-repeat;
  mask-repeat: no-repeat, no-repeat;
  display: inline-block;

  // transparent causes disapearing icons bug
  &:hover {
    ${(props) =>
      props.hoverBackground &&
      css`
        background-color: props.hoverBackground;
      `}
  }
`;

Icon.defaultProps = {
  width: defaults.width,
  height: defaults.height,
  cursor: defaults.cursor,
  color: defaults.color,
};

export { Icon, defaults };
