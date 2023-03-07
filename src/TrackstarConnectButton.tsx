import React from 'react';

import { ClientConfig } from './types';
import useTrackstarLink from './useTrackstarLink';

type TrackstarConnectButtonProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  getLinkToken: () => Promise<string>; // Retrieves and returns a linkToken
} & ClientConfig;

export default function TrackstarConnectButton({
  children = 'Connect WMS',
  style,
  className,
  getLinkToken,
  ...config
}: TrackstarConnectButtonProps) {
  if (!getLinkToken) {
    throw new Error('Prop `getLinkToken` callback must be present.');
  }
  const { error, open } = useTrackstarLink(config);

  return (
    <button
      disabled={Boolean(error)}
      type="button"
      className={className}
      style={{
        padding: '10px 20px',
        outline: 'none',
        background: '#FFFFFF',
        border: '2px solid #F1F1F1',
        borderRadius: '4px',
        cursor: 'pointer',
        ...style,
      }}
      onClick={async () => open({ linkToken: await getLinkToken() })}
    >
      {children}
    </button>
  );
}

TrackstarConnectButton.displayName = 'TrackstarConnectButton';
