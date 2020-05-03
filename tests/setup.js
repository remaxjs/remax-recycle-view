import { createAppConfig } from 'remax';

// mock mini program getApp api
const app = createAppConfig(undefined);
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
global.getApp = () => app;
