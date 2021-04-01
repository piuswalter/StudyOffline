import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const { env } = process;
const readInt = (name: string) => parseInt(env[name], 10);

interface IConfig {
  system: {
    port: number,
    api: {
      prefix: string,
      docs: string
    }
  },
  studysmarter: {
    url: string,
  },
}

const config: IConfig = {
  system: {
    port: readInt('PORT') || 3000,
    api: {
      prefix: env.API_PREFIX || '/api/v1',
      docs: env.API_DOCS || '/api/docs',
    },
  },
  studysmarter: {
    url: env.STUDYSMARTER_URL || 'https://prod.studysmarter.de',
  },
};

export default config;
