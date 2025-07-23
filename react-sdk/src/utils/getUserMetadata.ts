export function getUserMetaData() {
    return {
      url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
      },
      timestamp: Date.now(),
    };
  }