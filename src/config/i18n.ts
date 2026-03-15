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
    settings: {
      general: {
        title: string;
        seo: {
          name: string;
          description: string;
        };
      };
      directoryData: {
        tagPages: {
          title: string;
        };
        search: {
          placeholder: string;
        };
        tags: {
          [key: string]: {
            description: string;
          };
        };
      };
      header: {
        banner: {
          text: string;
          brandText: string;
        };
        actionButton: {
          text: string;
        };
      };
      footer: {
        description: string;
      };
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
    },
    settings: {
      general: {
        title: "Meditation Apps",
        seo: {
          name: "Cafe Directory",
          description: "Find the best nuxt starter kits."
        }
      },
      directoryData: {
        tagPages: {
          title: "{0} Apps"
        },
        search: {
          placeholder: "Search among {0} listings of this directory :)"
        },
        tags: {
          breathing: {
            description: "Breathing techniques are a popular feature in meditation apps."
          },
          sleep: {
            description: "Some apps include music that slowly goes away to help you sleep better and rest."
          },
          meditation: {
            description: "A meditation for your life. It's a great way to relax and clear your mind. It's also a great way to improve your sleep."
          },
          yoga: {
            description: "A yoga for your life."
          },
          timer: {
            description: "Timers can be used to track how much you meditate."
          }
        }
      },
      header: {
        banner: {
          text: "Follow mark_bruderer on twitter.",
          brandText: "AI Agent Libraries"
        },
        actionButton: {
          text: "Submit an app"
        }
      },
      footer: {
        description: "Best directory for my niche."
      }
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
    },
    settings: {
      general: {
        title: "冥想应用",
        seo: {
          name: "冥想应用目录",
          description: "发现最好的冥想应用。"
        }
      },
      directoryData: {
        tagPages: {
          title: "{0} 应用"
        },
        search: {
          placeholder: "在这个目录的 {0} 个应用中搜索 :)"
        },
        tags: {
          breathing: {
            description: "呼吸技巧是冥想应用中的热门功能。"
          },
          sleep: {
            description: "一些应用包含慢慢消失的音乐，帮助您更好地入睡和休息。"
          },
          meditation: {
            description: "为您的生活提供冥想。这是放松和清醒头脑的好方法。也是改善睡眠的好方法。"
          },
          yoga: {
            description: "为您的生活提供瑜伽。"
          },
          timer: {
            description: "计时器可用于跟踪您的冥想时间。"
          }
        }
      },
      header: {
        banner: {
          text: "在Twitter上关注mark_bruderer。",
          brandText: "AI 代理库"
        },
        actionButton: {
          text: "提交应用"
        }
      },
      footer: {
        description: "我的利基市场的最佳目录。"
      }
    }
  }
};

export default i18nConfig;