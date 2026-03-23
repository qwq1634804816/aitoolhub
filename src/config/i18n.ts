// 国际化配置文件
export interface Translation {
  [key: string]: string;
}

export interface I18nConfig {
  [lang: string]: {
    navigation: {
      [key: string]: string;
    };
    tags: {
      [key: string]: string;
    };
    footer: {
      [key: string]: string;
    };
    common: {
      [key: string]: string;
    };
  };
}

const i18nConfig: I18nConfig = {
  en: {
    navigation: {
      Blog: "Blog",
      Analytics: "Analytics",
      "Submit an app": "Submit an app",
      Home: "Home"
    },
    tags: {
      breathing: "Breathing",
      sleep: "Sleep",
      meditation: "Meditation",
      yoga: "Yoga",
      timer: "Timer"
    },
    footer: {
      Directory: "Directory",
      Categories: "Categories",
      Legal: "Legal",
      Submit: "Submit",
      Advertise: "Advertise",
      Articles: "Articles",
      "Privacy Policy": "Privacy Policy",
      "Terms of Service": "Terms of Service"
    },
    common: {
      search: "Search",
      featured: "Featured",
      categories: "Categories",
      all: "All",
      back: "Back",
      submit: "Submit",
      loading: "Loading...",
      error: "Error",
      notFound: "Not Found"
    }
  },
  zh: {
    navigation: {
      Blog: "博客",
      Analytics: "分析",
      "Submit an app": "提交应用",
      Home: "首页"
    },
    tags: {
      breathing: "呼吸",
      sleep: "睡眠",
      meditation: "冥想",
      yoga: "瑜伽",
      timer: "计时器"
    },
    footer: {
      Directory: "目录",
      Categories: "分类",
      Legal: "法律",
      Submit: "提交",
      Advertise: "广告",
      Articles: "文章",
      "Privacy Policy": "隐私政策",
      "Terms of Service": "服务条款"
    },
    common: {
      search: "搜索",
      featured: "精选",
      categories: "分类",
      all: "全部",
      back: "返回",
      submit: "提交",
      loading: "加载中...",
      error: "错误",
      notFound: "未找到"
    }
  }
};

export default i18nConfig;