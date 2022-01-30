import { exec } from 'child_process';

import { tags } from '../../config';

export const probesVersionRoute = {
  method: 'GET',
  path: `/probes/version`,
  options: {
    description: 'Probes versioning.',
    notes: [],
    plugins: {
      'hapi-swagger': {},
    },
    tags: ['api', tags.probes],
    handler: async function () {
      return new Promise((resolve, reject) => {
        exec('git describe --tags', (error, stdout) => {
          if (error) {
            reject(error);
          } else {
            const tags = stdout.trim().split('-');
            resolve(`API GEO: ${tags[0]}`);
          }
        });
      });
    },
  },
};
