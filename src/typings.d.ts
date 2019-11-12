import CoreTheme from 'global/Themes/CoreTheme';

export type ThemeInterface = typeof CoreTheme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends ThemeInterface {}
}
