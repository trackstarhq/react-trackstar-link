# react-trackstar-link

### This package provides:

A [React](https://reactjs.org/) button component that launches the [Trackstar](https://www.trackstarhq.com/) connect modal.

### Installing:

_npm_:

```bash
npm install @trackstar/react-trackstar-link
```

_yarn_:

```bash
yarn add @trackstar/react-trackstar-link
```

### Usage

The `trackstar-link` modal can be triggered using the `TrackstarConnectButton` component.

```jsx
import { TrackstarConnectButton } from '@trackstar/react-trackstar-link';

function App() {

  const someCustomerId = "12345";
  return (
    <TrackstarConnectButton
      getLinkToken={async () => {
        const response = await fetch('https://my-company.backend.com/link-token',
          {
            method: 'POST',
          }
        );
        const { linkToken } = await response.json();
        return linkToken;
      }}
      onSuccess={(authCode) => 
        await fetch('https://my-company.backend.com/store-token', {
          method: 'POST',
          body: JSON.stringify({
            customer_id: someCustomerId,
            auth_code: authCode,
          }),
        })
      }
      onClose={() => console.log('closed')}
      onLoad={() => console.log('loaded')}
    >
      Connect your WMS
    </TrackstarConnectButton>
  );
}
```

### Issues/Questions
Contact us at `support@trackstarhq.com`.
