/**
 * Security Configuration Module
 * Implements frontend security best practices
 */

export const initializeSecurityMeasures = () => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (e.ctrlKey && e.shiftKey && e.key === 'J') ||
      (e.ctrlKey && e.shiftKey && e.key === 'C') ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
      return false;
    }
  });

  const detectDevTools = () => {
    const threshold = 160;
    if (
      window.outerHeight - window.innerHeight > threshold ||
      window.outerWidth - window.innerWidth > threshold
    ) {
      console.clear();
      document.body.innerHTML = '';
      window.location.href = '/';
    }
  };

  setInterval(detectDevTools, 500);

  const noop = () => {};
  console.log = noop;
  console.warn = noop;
  console.error = noop;
  console.debug = noop;
};

export const sanitizeInput = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

export const validateUrl = (url: string): string => {
  try {
    const urlObj = new URL(url, window.location.origin);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return '';
    }
    return urlObj.toString();
  } catch {
    return '';
  }
};

export const secureSetItem = (key: string, value: string) => {
  try {
    const encoded = btoa(JSON.stringify({ data: value, timestamp: Date.now() }));
    localStorage.setItem(key, encoded);
  } catch (error: unknown) {
    console.error('Failed to store secure item:', error);
  }
};

export const secureGetItem = (key: string): string | null => {
  try {
    const encoded = localStorage.getItem(key);
    if (!encoded) return null;
    
    const decoded = JSON.parse(atob(encoded));
    const maxAge = 24 * 60 * 60 * 1000;
    if (Date.now() - decoded.timestamp > maxAge) {
      localStorage.removeItem(key);
      return null;
    }
    
    return decoded.data;
  } catch (error: unknown) {
    console.error('Failed to retrieve secure item:', error);
    return null;
  }
};

export const setSecurityHeaders = () => {
  const cspMeta = document.createElement('meta');
  cspMeta.httpEquiv = 'Content-Security-Policy';
  cspMeta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;";
  document.head.appendChild(cspMeta);

  const xUAMeta = document.createElement('meta');
  xUAMeta.httpEquiv = 'X-UA-Compatible';
  xUAMeta.content = 'IE=edge';
  document.head.appendChild(xUAMeta);

  const referrerMeta = document.createElement('meta');
  referrerMeta.name = 'referrer';
  referrerMeta.content = 'strict-origin-when-cross-origin';
  document.head.appendChild(referrerMeta);
};

export const preventClickjacking = () => {
  if (window.self !== window.top) {
    window.top!.location.href = window.self.location.href;
  }
};

export const disableContentCopy = () => {
  document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
  });

  document.addEventListener('cut', (e) => {
    e.preventDefault();
    return false;
  });

  document.addEventListener('paste', (e) => {
    e.preventDefault();
    return false;
  });
};

export const initializeAllSecurityMeasures = () => {
  setSecurityHeaders();
  preventClickjacking();
};