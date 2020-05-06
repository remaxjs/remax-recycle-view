import { createAppConfig } from 'remax';

// mock mini program getApp api
const app = createAppConfig(undefined);
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
global.getApp = () => app;

global.my = {
  getSystemInfoSync() {
    return {
      windowWidth: 375,
    };
  },
};

global.wx = {
  getSystemInfoSync() {
    return {
      windowWidth: 375,
    };
  },
};

global.tt = {
  getSystemInfoSync() {
    return {
      windowWidth: 375,
    };
  },
};
