type UrlParamsPaylod = (params: string[]) => Record<string, string>;

export const getUrlsParams: UrlParamsPaylod = params => {
  const urlParams = new URLSearchParams(window.location.search);
  return params.reduce(
    (result, item) => ({
      ...result,
      [item]: urlParams.get(item) || '',
    }),
    {}
  );
};
