import React, {useState, useEffect} from 'react';

export default function AccessibilityPanel({isOpen, onClose}) {
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    contrast: 'normal',
    images: true,
    fontFamily: 'default'
  });

  // Загрузка сохраненных настроек при монтировании
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      applyAccessibilitySettings(parsedSettings);
    }
  }, []);

  // Применение настроек доступности
  const applyAccessibilitySettings = (settings) => {
    const root = document.documentElement;

    // Размер шрифта
    switch (settings.fontSize) {
      case 'large':
        root.style.setProperty('--font-size-body', '18px');
        root.style.setProperty('--font-size-h1', '36px');
        root.style.setProperty('--font-size-h2', '28px');
        root.style.setProperty('--font-size-h3', '24px');
        root.style.setProperty('--font-size-h4', '20px');
        root.style.setProperty('--line-height-body', '28px');
        break;
      case 'xlarge':
        root.style.setProperty('--font-size-body', '20px');
        root.style.setProperty('--font-size-h1', '40px');
        root.style.setProperty('--font-size-h2', '32px');
        root.style.setProperty('--font-size-h3', '28px');
        root.style.setProperty('--font-size-h4', '24px');
        root.style.setProperty('--line-height-body', '32px');
        break;
      default:
        // Возвращаем стандартные значения
        root.style.setProperty('--font-size-body', '16px');
        root.style.setProperty('--font-size-h1', '32px');
        root.style.setProperty('--font-size-h2', '24px');
        root.style.setProperty('--font-size-h3', '20px');
        root.style.setProperty('--font-size-h4', '16px');
        root.style.setProperty('--line-height-body', '24px');
    }

    // Цветовая схема
    if (settings.contrast === 'high') {
      root.style.setProperty('--color-neutral-black', '#000000');
      root.style.setProperty('--color-neutral-white', '#ffffff');
      root.style.setProperty('--color-primary-darkest', '#000000');
      root.style.setProperty('--color-primary-medium', '#000000');
      root.style.setProperty('--color-primary-light', '#0000EE');
      document.body.style.color = '#000000';
      document.body.style.backgroundColor = '#ffffff';
    } else {
      // Возвращаем стандартные значения
      root.style.setProperty('--color-neutral-black', '#000000');
      root.style.setProperty('--color-neutral-white', '#ffffff');
      root.style.setProperty('--color-primary-darkest', '#055335');
      root.style.setProperty('--color-primary-medium', '#07a267');
      root.style.setProperty('--color-primary-light', '#20d792');
      document.body.style.color = '';
      document.body.style.backgroundColor = '';
    }

    // Отображение изображений
    document.querySelectorAll('img, picture, figure').forEach(el => {
      el.style.visibility = settings.images ? 'visible' : 'hidden';
    });

    // Шрифт
    document.body.style.fontFamily = settings.fontFamily === 'arial'
      ? 'Arial, sans-serif'
      : "'Inter', sans-serif";
  };

  const handleSettingChange = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    setSettings(newSettings);
    applyAccessibilitySettings(newSettings);
    localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
  };

  if (!isOpen) return null;

  return (
    <div className="accessibility-panel">
      <div className="top-menu__wrapper">
        <div className="accessibility-panel__content">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <h2>Версия для слабовидящих</h2>

          </div>

          <div className="accessibility-option">
            <label>Размер текста:</label>
            <select
              value={settings.fontSize}
              onChange={(e) => handleSettingChange('fontSize', e.target.value)}
            >
              <option value="medium">Средний</option>
              <option value="large">Крупный (+25%)</option>
              <option value="xlarge">Очень крупный (+50%)</option>
            </select>
          </div>

          <div className="accessibility-option">
            <label>Цветовая схема:</label>
            <select
              value={settings.contrast}
              onChange={(e) => handleSettingChange('contrast', e.target.value)}
            >
              <option value="normal">Обычная</option>
              <option value="high">Высокая контрастность</option>
            </select>
          </div>

          <div className="accessibility-option">
            <label>Шрифт:</label>
            <select
              value={settings.fontFamily}
              onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
            >
              <option value="default">Стандартный (Inter)</option>
              <option value="arial">Arial</option>
            </select>
          </div>

          <div className="accessibility-option">
            <label>
              <input
                type="checkbox"
                checked={settings.images}
                onChange={(e) => handleSettingChange('images', e.target.checked)}
                style={{outline: 'none', borderColor: '#051945'}}
              />
              Показывать изображения
            </label>
          </div>

          <div className="accessibility-actions" style={{display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'space-between'}}>
            <button
              className="accessibility-apply"
              onClick={() => {
                applyAccessibilitySettings(settings);
                onClose();
              }}
              style={{border: '1px solid #051945', padding: '5px'}}
            >
              Применить
            </button>
            <button
              className="accessibility-reset"
              onClick={() => {
                const defaultSettings = {
                  fontSize: 'medium',
                  contrast: 'normal',
                  images: true,
                  fontFamily: 'default'
                };

                setSettings(defaultSettings);
                applyAccessibilitySettings(defaultSettings);
                localStorage.setItem('accessibilitySettings', JSON.stringify(defaultSettings));
              }}
              style={{border: '1px solid #051945', padding: '5px'}}
            >
              Сбросить
            </button>

            <button
              onClick={onClose}
              className="accessibility-close-btn"
              aria-label="Закрыть панель настроек"
              style={{border: '1px solid #051945', display: 'flex', alignItems: 'center', padding: '5px'}}
            >
              Закрыть
              <svg width="22px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z"
                  fill="#051945"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
