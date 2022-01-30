import HapiSwagger from 'hapi-swagger';

export const swaggerOptions: HapiSwagger.RegisterOptions = {
  tags: [
    {
      name: 'A. Probes',
      description: 'provide information on readiness and version.',
    },
    {
      name: 'B. Administrative',
      description: 'Administrative information.',
    },
    {
      name: 'C. Criminality',
      description: 'Provide information about criminality.',
    },
    {
      name: 'D. Economical-influences',
      description: 'Provide information on economical influences.',
    },
    {
      name: 'E. Natural-risks',
      description: 'Provide information on natural risks.',
    },
    {
      name: 'F. Security',
      description: 'Provide information on security infrastructures.',
    },
    {
      name: 'G. Structural-features',
      description: 'Provide information about structural features.',
    },
    {
      name: 'H. Weather',
      description: 'Provide information about weather.',
    },
    {
      name: 'I. Multi-query',
      description: 'Return all inforamtion in one query.',
    },
    {
      name: 'J. Data visualization',
      description: 'Return all inforamtion in one query.',
    },
    {
      name: 'K. Deprecated',
      description: 'Old routes.',
    },
  ],
  info: {
    title: 'Falco-geo API Documentation',
    description: 'Documentation of falco-geo API',
    version: '0.2.17',
  },
  grouping: 'tags',
  documentationPath: '/documentation',
};
