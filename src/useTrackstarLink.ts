import { useEffect, useState } from 'react';
import useScript from 'react-script-hook';

import { ClientConfig } from './types';

export default function useTrackstarLink(config: ClientConfig) {
  const [loading, error] = useScript({
    src: "https://frolicking-arithmetic-1c197f.netlify.app/main.js",
    checkForExisting: true,
  });
  const [trackstarWindowId, setTrackstarWindowId] = useState("");

  useEffect(() => {
    const trackstarWindowId = window.TrackstarWindowId;
    setTrackstarWindowId(trackstarWindowId);
    if (window[trackstarWindowId]) {
      window[trackstarWindowId].init({
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
    if (!window[trackstarWindowId]) {
      console.error('Trackstar is not initialized');
      return;
    }
    if (!window[trackstarWindowId].state?.isLoaded) {
      console.error('Trackstar has not been loaded, did you call Trackstar.init()?');
      return;
    }
    // Open modal
    window[trackstarWindowId].open({ integrationId });
  };

  return {
    error,
    open,
  };
}
