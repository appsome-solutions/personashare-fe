type FunctionType<T = any> = (...args: any[]) => T;

/**
 * This method is lodash equivalent of _.partial but should be used only with functions
 * that accept object as only argument, for other methods please use _.partial from lodash
 * @param func function for partial application
 * @param partialOptions partially applied options
 */
export const partial = <T = any>(
  func: FunctionType<T>,
  partialOptions: Record<string, any>
): FunctionType<ReturnType<typeof func>> => (options: Record<string, any>): ReturnType<typeof func> =>
  func({ ...partialOptions, ...options });
