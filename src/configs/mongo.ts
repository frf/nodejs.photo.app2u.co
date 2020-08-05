import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { DB_URL } from './config';

export const mongoConfig: MongoConnectionOptions = {
    type: 'mongodb',
    url: DB_URL,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  };