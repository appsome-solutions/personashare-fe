import { css, FlattenSimpleInterpolation } from 'styled-components';

export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

type MediaCss = (args: TemplateStringsArray) => FlattenSimpleInterpolation;

interface Media {
  [key: string]: MediaCss;
}

export type BreakpointsKeysType = keyof typeof BREAKPOINTS;

export const BreakpointsKeys: BreakpointsKeysType[] = Object.keys(BREAKPOINTS) as BreakpointsKeysType[];

// Mobile first:
export const media: Media = BreakpointsKeys.reduce((acc: Media, label: BreakpointsKeysType) => {
  acc[label] = (...args) => css`
    @media (min-width: ${BREAKPOINTS[label]}px) {
      // @ts-ignore
      ${css(...args)};
    }
  `;

  return acc;
}, {});
