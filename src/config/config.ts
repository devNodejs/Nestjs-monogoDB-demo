import { environment } from '../../environment';
const envConfig = environment[process.env.NODE_ENV];
import * as moment from 'moment';

export const config = {
  JWTSecret: '46y$M',
  JWTExpireTime: 86400,
};