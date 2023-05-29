import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from '@trpc/server/adapters/fetch';
// import * as trpc from '@trpc/server';
// import * as trpcNext from '@trpc/server/adapters/next';
import {appRouter} from '../router';

// interface CreateNextContextOptions {}

// export async function createContextInner(_opts: CreateNextContextOptions) {
//   return {};
// }

// export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: function (
      opts: FetchCreateContextFnOptions,
    ): object | Promise<object> {
      return {};
    },
  });
  // Next adapter not yet supported in app directory
  // return trpcNext.createNextApiHandler({
  //   router: appRouter,
  //   /**
  //    * @link https://trpc.io/docs/context
  //    */
  //   createContext: async function (
  //     opts: trpcNext.CreateNextContextOptions,
  //   ): Promise<Context> {
  //     return await createContextInner({});
  //   },
  //   /**
  //    * @link https://trpc.io/docs/error-handling
  //    */
  //   onError({error}) {
  //     if (error.code === 'INTERNAL_SERVER_ERROR') {
  //       // send to bug reporting
  //       console.error('Something went wrong', error);
  //     }
  //   },
  //   /**
  //    * Enable query batching
  //    */
  //   batching: {
  //     enabled: true,
  //   },
  //   /**
  //    * @link https://trpc.io/docs/caching#api-response-caching
  //    */
  //   // responseMeta() {
  //   //   // ...
  //   // },
  // });
};

export {handler as GET, handler as POST};
