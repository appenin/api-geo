import { ResponseToolkit, ResponseValue } from '@hapi/hapi';

export const responseToolkitForTest: ResponseToolkit = {
  response: (result?: ResponseValue | undefined) => ({
    code: (statusCode: number) => ({ statusCode, source: result }),
  }),
} as ResponseToolkit;
