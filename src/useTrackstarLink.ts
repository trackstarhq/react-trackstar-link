import { useEffect, useState } from 'react';
import useScript from 'react-script-hook';

import { ClientConfig } from './types';

export default function useTrackstarLink(config: ClientConfig) {
  const [loading, error] = useScript({
    src: "https://frolicking-arithmetic-1c197f.netlify.app/main.js",
    checkForExisting: true,
  });
  const trackstarModalId = config.buttonId ? "Trackstar" + config.buttonId : "Trackstar" + 0;

  useEffect(() => {
    if (window.Trackstar) {
      window.Trackstar.init({
        ...config,
        onLoad: () => {
          config.onLoad && config.onLoad();
        },
        onClose: () => config.onClose && config.onClose(),
        getLinkToken: () => config.getLinkToken && config.getLinkToken(),
      });
    }
  }, [loading]);

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
  };
}
