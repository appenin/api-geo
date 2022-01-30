import { tags } from '../../config';

export const probesReadinessRoute = {
  method: 'GET',
  path: `/probes/readiness`,
  options: {
    description: 'Return application readiness status.',
    notes: [],
    plugins: {
      'hapi-swagger': {},
    },
    tags: ['api', tags.probes],
    handler: async function (request) {
      const { server } = request;
      const apiIsReadyToBeRequested = server.info.started;
      const status = apiIsReadyToBeRequested ? 'UP' : 'DOWN';
      return { state: status };
    },
  },
};
