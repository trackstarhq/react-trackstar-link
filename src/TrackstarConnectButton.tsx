import React from 'react';

import { ClientConfig } from './types';
import useTrackstarLink from './useTrackstarLink';

type TrackstarConnectButtonProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
} & ClientConfig;

export default function TrackstarConnectButton({
  children = 'trackstar-default',
  style,
  className,
  ...config
}: TrackstarConnectButtonProps) {
  const { error, open } = useTrackstarLink(config);
  const formattedTypes = {
    'wms': 'WMS',
    'cart': 'Cart',
    'freight': 'Freight Forwarder',
  };
  // update README if this changes. also eevee/TrackstarModal
  var childrenToRender = children;
  if (children === 'trackstar-default' && config.integrationType && config.integrationType in formattedTypes) {
    const integrationType = config.integrationType as keyof typeof formattedTypes;
    const formattedType = formattedTypes[integrationType];
    childrenToRender = `Connect ${formattedType}`;
  }
  if (childrenToRender === 'trackstar-default') {
    childrenToRender = 'Connect WMS';
  }


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
      {childrenToRender}
    </button>
  );
}

TrackstarConnectButton.displayName = 'TrackstarConnectButton';
