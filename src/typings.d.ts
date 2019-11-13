import CoreTheme from 'global/Themes/CoreTheme';

import Dictionary from 'global/Langs/pl';

export type ThemeInterface = typeof CoreTheme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends ThemeInterface {}
}

export type TranslationsType = typeof Dictionary.pl.translation;

declare module 'react-i18next' {
  export function t(translate: TranslationsType): string;
}
