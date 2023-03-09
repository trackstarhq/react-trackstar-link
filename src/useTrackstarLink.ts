import { useEffect } from 'react';
import useScript from 'react-script-hook';

import { ClientConfig } from './types';

export default function useTrackstarLink(config: ClientConfig) {
  const [loading, error] = useScript({
    src: "https://link.trackstarhq.com/main.js",
    checkForExisting: true,
  });

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
    if (!window.Trackstar) {
      console.error('Trackstar is not initialized');
      return;
    }
    if (!window.Trackstar.state?.isLoaded) {
      console.error('Trackstar has not been loaded, did you call Trackstar.init()?');
      return;
    }
    // Open modal
    window.Trackstar.open({ integrationId });
  };

  return {
    error,
    open,
  };
}
