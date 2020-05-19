const pages = ['pages/index/index'];
const color = '#282c34';
const title = 'Remax RecycleView';


module.exports.wechat = {
  pages,
  window: {
    navigationBarTitleText: title,
    navigationBarBackgroundColor: color,
  },
};

module.exports.ali = {
  pages,
  window: {
    defaultTitle: title,
    titleBarColor: color,
  },
};

module.exports.toutiao = {
  pages,
  window: {
    navigationBarTitleText: title,
    navigationBarBackgroundColor: color,
  },
};

module.exports.web = {
  pages,
  title,
};
