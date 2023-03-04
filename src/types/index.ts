export interface ClientConfig {
  onSuccess: (publicToken: string) => void;
  onClose?: () => void;
  onLoad?: () => void;
}

export interface TrackstarConfig {
  onClose?: () => void;
  onLoad?: () => void;
}

interface TrackstarState {
  isLoaded: boolean;
}

export interface Trackstar {
  init: (options: TrackstarConfig) => void;
  open: ({
    integrationId,
    linkToken, // Token used to verify user's account.
  }: {
    integrationId?: string;
    linkToken: string;
  }) => void;
  state: TrackstarState;
}

declare global {
  interface Window {
    Trackstar: Trackstar;
  }
}
