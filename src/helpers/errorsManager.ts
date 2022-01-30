import { AxiosError } from 'axios';

import { Error } from '../libs/types';

export function formatError(error: AxiosError<any>): Error {
  return {
    error: {
      code: error.response?.data?.statusCode || error.response?.status,
      // internal API
      error: error.response?.data?.error || null,
      message: error.response?.data?.message || null,
      // public API
      errors: error.response?.data?.errors || null,
    },
  };
}

export function formatLoggerError(error: AxiosError<any>) {
  if (error.response) {
    const { data, status, statusText, headers, config } = error.response;
    return {
      config,
      data,
      headers,
      status,
      statusText,
    };
  }
  return error;
}
