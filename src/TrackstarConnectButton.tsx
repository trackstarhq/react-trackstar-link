import React from 'react';

import { ClientConfig } from './types';
import useTrackstarLink from './useTrackstarLink';

type TrackstarConnectButtonProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
} & ClientConfig;

export default function TrackstarConnectButton({
  children = 'Connect WMS',
  style,
  className,
  ...config
}: TrackstarConnectButtonProps) {
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
      onClick={async () => open({})}
    >
      {children}
    </button>
  );
}

TrackstarConnectButton.displayName = 'TrackstarConnectButton';
