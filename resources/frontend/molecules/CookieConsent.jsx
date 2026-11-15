import React, { useEffect, useState } from 'react';
import Button from "#/atoms/buttons/button.jsx";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent !== 'accepted') {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent">
      <div>
        Мы используем файлы cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с этим.
      </div>
      <Button handleClick={acceptCookies}>Принять</Button>
    </div>
  );
}
