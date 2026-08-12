import { useEffect, useState } from 'react';
import useScript from 'react-script-hook';

import { ClientConfig } from './types';

export default function useTrackstarLink(config: ClientConfig) {
  const [, error] = useScript({
    src: "https://link.trackstarhq.com/main.js",
    // src: "http://localhost:3005/main.js",
    checkForExisting: true,
  });
  const trackstarModalId = (config.hasOwnProperty("buttonId") ? "Trackstar" + config.buttonId : "Trackstar") as `Trackstar${string}`;

  // useScript's loading flag can get stuck: when another instance already added
  // the <script>, a late-mounting instance attaches its load listener after the
  // event fired and never re-renders, so init() below never runs. Watch for
  // window.Trackstar ourselves and re-render once main.js has set it.
  const [trackstarReady, setTrackstarReady] = useState(
    typeof window !== 'undefined' && Boolean(window.Trackstar)
  );
  useEffect(() => {
    if (trackstarReady || error || typeof window === 'undefined') {
      return;
    }
    if (window.Trackstar) {
      setTrackstarReady(true);
      return;
    }
    const intervalId = window.setInterval(() => {
      if (window.Trackstar) {
        window.clearInterval(intervalId);
        setTrackstarReady(true);
      }
    }, 50);
    return () => window.clearInterval(intervalId);
  }, [trackstarReady, error]);

  const close = () => {
    if (!window[trackstarModalId]) {
      console.error('Trackstar is not initialized');
      return;
    }
    window[trackstarModalId].close();
  };

  useEffect(() => {
    if (window.Trackstar) {
      window.Trackstar.init({
        ...config,
        // hand the consumer a `close` so they can dismiss the modal (e.g. from
        // onSuccess) without reaching for the window global
        onSuccess: (authCode, integrationName) =>
          config.onSuccess(authCode, integrationName, close),
        onLoad: () => {
          config.onLoad && config.onLoad();
        },
        onClose: () => config.onClose && config.onClose(),
        getLinkToken: () => config.getLinkToken && config.getLinkToken(),
      });
    }
  }, [trackstarReady, error, config]);

  const open = ({
    integrationId,
  }: {
    integrationId?: string;
  }) => {
    if (error) {
      throw new Error(`Error loading Trackstar script: ${error}`);
    }
    if (!window[trackstarModalId]) {
      console.error('Trackstar is not initialized');
      return;
    }
    if (!window[trackstarModalId].state?.isLoaded) {
      console.error('Trackstar has not been loaded, did you call Trackstar.init()?');
      return;
    }
    // Open modal
    window[trackstarModalId].open({ integrationId });
  };

  return {
    error,
    open,
    close,
  };
}
