export interface ClientConfig {
  onSuccess: (authCode: string) => void;
  onClose?: () => void;
  onLoad?: () => void;
  getLinkToken: () => Promise<string>;
  keyId?: number;
}

export interface TrackstarConfig {
  onClose?: () => void;
  onLoad?: () => void;
  getLinkToken: () => Promise<string>;
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
    [trackstarModalId:string]: Trackstar;
  }
}
