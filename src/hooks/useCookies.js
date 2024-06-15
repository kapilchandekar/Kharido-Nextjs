import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useCookies = (cookieName) => {
  const [cookieValue, setCookieValue] = useState(null);

  useEffect(() => {
    const value = Cookies.get(cookieName);
    setCookieValue(value);
  }, [cookieName]);

  return cookieValue;
};

export default useCookies;
