import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import {
  version, description, author, license,
} from '../../../package.json';
import config from '../../config';

const info = {
  title: 'StudyOffline',
  version,
  description,
  license: {
    name: license,
    url: 'https://github.com/piuswalter/StudyOffline/blob/main/LICENSE.md',
  },
  contact: author,
};

const { api: { prefix }, port } = config.system;
const servers = [
  {
    url: `http://localhost:${port}${prefix}`,
    description: 'Local dev server',
  },
];

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info,
    servers,
    components: {
      securitySchemes: {
        token: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  },
  apis: [
    path.join(__dirname, '../**/*.router.ts'),
  ],
};

export default swaggerUi.setup(
  swaggerJSDoc(options),
  { explorer: false },
);
