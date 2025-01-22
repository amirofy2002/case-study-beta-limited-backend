export const retry = (promise: Promise<any>, retries: number) =>
  promise.catch((error: any) => {
    console.error({ retry: retries, error });
    return retries > 1 ? retry(promise, retries - 1) : Promise.reject(error);
  });
