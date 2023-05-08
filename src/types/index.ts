export interface ClientConfig {
  onSuccess: (authCode: string) => void;
  onClose?: () => void;
  onLoad?: () => void;
  getLinkToken: () => Promise<string>;
  integrationAllowList?: string[];
  integrationBlockList?: string[];
}

export interface TrackstarConfig {
  onClose?: () => void;
  onLoad?: () => void;
  getLinkToken: () => Promise<string>;
  integrationAllowList?: string[];
  integrationBlockList?: string[];
}

interface TrackstarState {
  isLoaded: boolean;
}

export interface Trackstar {
  init: (options: TrackstarConfig) => void;
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
  }
}
