import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '../AppContext';

const Banner = () => {
  const { t } = useTranslation();
  const {
    geolocation: {
      failed,
      loading,
    } = {},
    weather: {
      error,
      loading: weatherLoading,
    },
  } = useContext(AppContext);
  const [dismissed, setDismissed] = useState(false);
  const [dismissedError, setDismissedError] = useState(false);

  const dismiss = () => setDismissed(true);
  const dismissError = () => setDismissedError(true);

  return (
    <>
      {!loading && failed && !dismissed && (
        <article className="message is-warning">
          <div className="message-header">
            <p>{t('banner.loading.failed.title')}</p>
            <button className="delete" aria-label="delete" onClick={dismiss}>
            </button>
          </div>
          <div className="message-body">
            {t('banner.loading.failed.body')}
          </div>
        </article>
      )}
      {!weatherLoading && error && !dismissedError && (
        <article className="message is-error">
          <div className="message-header">
            <p>{t(`${error}`)}</p>
            <button className="delete" aria-label="delete" onClick={dismissError}>
            </button>
          </div>
        </article>
      )}
    </>
  );
};

export default Banner;
