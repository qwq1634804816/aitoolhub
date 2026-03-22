// 自动语言检测脚本

// 检查是否在中国地区
function isChinaRegion() {
  // 方法1: 检查浏览器语言设置
  const navigatorLanguage = navigator.language || navigator.userLanguage;
  const isChineseLanguage = navigatorLanguage.startsWith('zh');
  console.log('Auto lang detection: Browser language:', navigatorLanguage, 'isChinese:', isChineseLanguage);
  
  // 方法2: 检查时区（中国使用 UTC+8）
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isChinaTimeZone = timeZone === 'Asia/Shanghai' || timeZone === 'Asia/Beijing' || timeZone === 'Asia/Chongqing' || timeZone === 'Asia/Hong_Kong' || timeZone === 'Asia/Macau' || timeZone === 'Asia/Taipei';
  console.log('Auto lang detection: Time zone:', timeZone, 'isChinaTimeZone:', isChinaTimeZone);
  
  // 方法3: 检查浏览器区域设置
  const navigatorLocale = navigator.language || navigator.userLanguage;
  const isChineseLocale = navigatorLocale.startsWith('zh');
  console.log('Auto lang detection: Navigator locale:', navigatorLocale, 'isChineseLocale:', isChineseLocale);
  
  // 只要满足任一条件，就认为在中国地区
  const result = isChineseLanguage || isChinaTimeZone || isChineseLocale;
  console.log('Auto lang detection: Is China region:', result);
  return result;
}

// 从本地存储获取用户语言选择
function getUserLanguagePreference() {
  try {
    const storedData = localStorage.getItem('language_preference');
    console.log('Auto lang detection: Stored data:', storedData);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const now = Date.now();
      // 检查是否在1小时内
      const isWithinHour = now - parsedData.timestamp < 60 * 60 * 1000;
      console.log('Auto lang detection: Stored language:', parsedData.language, 'Timestamp:', parsedData.timestamp, 'Is within hour:', isWithinHour);
      if (isWithinHour) {
        return parsedData.language;
      } else {
        // 如果超过1小时，清除存储
        localStorage.removeItem('language_preference');
        console.log('Auto lang detection: Removed expired language preference');
      }
    }
  } catch (error) {
    console.error('Error reading language preference from localStorage:', error);
  }
  return null;
}

// 重定向到相应的语言版本
function redirectToLanguage() {
  console.log('Auto lang detection: Starting');
  console.log('Auto lang detection: Current URL:', window.location.href);
  
  // 检查 URL 中是否有语言前缀
  const pathname = window.location.pathname;
  console.log('Auto lang detection: Current pathname:', pathname);
  
  // 检测语言：如果有 /zh 前缀则为中文，否则为英文
  let detectedLang = 'en'; // 默认英文
  if (pathname.startsWith('/zh')) {
    detectedLang = 'zh';
  }
  console.log('Auto lang detection: Detected language from URL:', detectedLang);
  
  // 检查本地存储中的语言选择
  const storedLanguage = getUserLanguagePreference();
  console.log('Auto lang detection: Stored language preference:', storedLanguage);
  
  if (storedLanguage) {
    // 如果存储的语言与当前语言不同，进行重定向
    if (storedLanguage !== detectedLang) {
      console.log('Auto lang detection: Stored language different from current, redirecting...');
      // 构建新的 URL
      let newPathname;
      if (storedLanguage === 'en') {
        // 英文版本移除语言前缀
        if (pathname.startsWith('/zh')) {
          newPathname = pathname.replace(/^\/zh/, '');
          // 确保路径以 / 开头
          if (!newPathname.startsWith('/')) {
            newPathname = `/${newPathname}`;
          }
          // 如果路径是空的，设置为 /
          if (newPathname === '') {
            newPathname = '/';
          }
        } else {
          newPathname = pathname;
        }
      } else {
        // 中文版本添加 /zh 前缀
        if (pathname.startsWith('/zh')) {
          newPathname = pathname;
        } else {
          if (pathname === '/') {
            newPathname = '/zh';
          } else {
            newPathname = `/zh${pathname}`;
          }
        }
      }
      
      // 确保新路径不是重复的
      if (newPathname !== window.location.pathname) {
        const newUrl = new URL(newPathname, window.location.origin);
        newUrl.search = window.location.search;
        newUrl.hash = window.location.hash;
        console.log('Auto lang detection: Redirecting to:', newUrl.href);
        
        // 重定向
        window.location.href = newUrl.href;
      }
    } else {
      console.log('Auto lang detection: Stored language matches current, no redirect needed');
    }
    return;
  }
  
  // 没有存储的语言选择，根据地区检测
  console.log('Auto lang detection: No stored language preference, detecting region...');
  const shouldUseChinese = isChinaRegion();
  const targetLanguage = shouldUseChinese ? 'zh' : 'en';
  console.log('Auto lang detection: Target language based on region:', targetLanguage);
  
  // 如果检测到的地区语言与当前语言不同，进行重定向
  if (targetLanguage !== detectedLang) {
    console.log('Auto lang detection: Target language different from current, redirecting...');
    // 构建新的 URL
    let newPathname;
    if (targetLanguage === 'en') {
      // 英文版本移除语言前缀
      if (pathname.startsWith('/zh')) {
        newPathname = pathname.replace(/^\/zh/, '');
        // 确保路径以 / 开头
        if (!newPathname.startsWith('/')) {
          newPathname = `/${newPathname}`;
        }
        // 如果路径是空的，设置为 /
        if (newPathname === '') {
          newPathname = '/';
        }
      } else {
        newPathname = pathname;
      }
    } else {
      // 中文版本添加 /zh 前缀
      if (pathname.startsWith('/zh')) {
        newPathname = pathname;
      } else {
        if (pathname === '/') {
          newPathname = '/zh';
        } else {
          newPathname = `/zh${pathname}`;
        }
      }
    }
    
    // 确保新路径不是重复的
    if (newPathname !== window.location.pathname) {
      const newUrl = new URL(newPathname, window.location.origin);
      newUrl.search = window.location.search;
      newUrl.hash = window.location.hash;
      console.log('Auto lang detection: Redirecting to:', newUrl.href);
      
      // 重定向
      window.location.href = newUrl.href;
    }
  } else {
    console.log('Auto lang detection: Target language matches current, no redirect needed');
  }
  
  // 更新本地存储，无论是否有语言前缀
  try {
    const storageData = {
      language: targetLanguage,
      timestamp: Date.now()
    };
    console.log('Auto lang detection: Storing language preference:', storageData);
    localStorage.setItem('language_preference', JSON.stringify(storageData));
  } catch (error) {
    console.error('Error storing language preference to localStorage:', error);
  }
}

// 页面加载时执行
if (typeof window !== 'undefined') {
  // 延迟执行，确保页面已经加载
  console.log('Auto lang detection: Adding DOMContentLoaded listener');
  window.addEventListener('DOMContentLoaded', redirectToLanguage);
}
