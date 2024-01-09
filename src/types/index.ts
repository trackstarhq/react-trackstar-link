export interface ClientConfig {
  onSuccess: (authCode: string) => void;
  onClose?: () => void;
  onLoad?: () => void;
  getLinkToken: () => Promise<string>;
  integrationAllowList?: string[];
  integrationBlockList?: string[];
  integrationsWithEndpoints: string[];
  buttonId?: string;
  sandbox?: boolean;
}

interface TrackstarState {
  isLoaded: boolean;
}

export interface Trackstar {
  init: (options: ClientConfig) => void;
  open: ({
    integrationId,
  }: {
    integrationId?: string;
  }) => void;
  state: TrackstarState;
}

declare global {
  interface Window {
    Trackstar: Trackstar;
    [trackstarModalId: string]: Trackstar;
  }
}
