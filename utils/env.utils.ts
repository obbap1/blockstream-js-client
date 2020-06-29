import { ENVIRONMENT } from '../enums';

export const isLive = () => (process.env.NODE_ENV === ENVIRONMENT.production ? true : false);
