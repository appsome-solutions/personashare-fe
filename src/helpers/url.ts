export const getPathnameArray = (pathname: string): string[] => {
  return pathname.split('?')[0].split('/');
};
