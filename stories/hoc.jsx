import React from 'react';

import { TrackstarConnectButton } from '../src/index.ts';

function App() {
  const onClose = (error, metadata) => console.log('onClose', error, metadata);
  const onLoad = (eventName, metadata) =>
    console.log('onLoad', eventName, metadata);
  const onSuccess = (token, metadata) =>
    console.log('onSuccess', token, metadata);

  return (
    <TrackstarConnectButton
      className="CustomButton"
      style={{ padding: '20px', fontSize: '16px', cursor: 'pointer' }}
      onClose={onClose}
      onLoad={onLoad}
      onSuccess={onSuccess}
      getLinkToken={async () => '<TEST_LINK_TOKEN>'}
    >
      Open Link and connect your CRM!
    </TrackstarConnectButton>
  );
}

export default App;
