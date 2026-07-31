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
      integrationType="wms"
      getLinkToken={async () => {
        const response = await fetch('https://my-company.backend.com/link-token',
          {
            method: 'POST',
          }
        );
        const { linkToken } = await response.json();
        return linkToken;
      }}
      onSuccess={async (authCode) =>
        // the endpoint you implemented in step 2.2
        await fetch('https://my-company.backend.com/store-token',
          {
            method: 'POST',
            body: JSON.stringify({
              customer_id: someCustomerId,
              auth_code: authCode,
            }),
          }
        )
      }
      onClose={() => console.log('closed')}
      onLoad={() => console.log('loaded')}
    >
      Connect your WMS
    </TrackstarConnectButton>
  );
}
```
### Optional Props

Use optional `integrationsWithEndpoints`, `integrationAllowList` and `integrationBlockList` props to determine the specific integrations to display.
To only show integrations that support the `get_returns` and `create_return` endpoints use
```jsx
integrationsWithEndpoints={['get_returns', 'create_return']}
```
The other two props take in a string array of integration names.
To only show ShipBob and Ongoing integrations use
```jsx
integrationAllowList={['shipbob', 'ongoing']}
```
To show all integrations *except* ShipBob and Ongoing use
```jsx
integrationBlockList={['shipbob', 'ongoing']}
```
The `integrationAllowList` and `integrationBlockList` props are mutually exclusive. If both props are given values, all integrations will be displayed.
Integration IDs that can be used in these props can be found in the table here: https://docs.trackstarhq.com/introduction#warehouse-management-systems

Set the `sandbox` prop to `true` to include a sandbox WMS in the list of integrations. This is useful for testing.

Set the `integrationType` prop to change the type of integration to connect to.
The default is `wms`. The other options are `cart` and `freight`.

Use the `buttonId` prop to use multiple instances of `<TrackstarConnectButton`. This is useful to have several buttons with different `integrationAllowList`'s to display. Each `<TrackstarConnectButton` will need its own unique string for `buttonId`.

### Disabling endpoints on the connection

To restrict which endpoints a connection created through this link can use, set `disabled_functions` (and optionally `enabled_functions`) when your backend creates the link token. These are not component props: they're set on the link token so your end customer can't change them in the browser. They apply on top of any endpoints your org already disables org-wide.

```js
// your backend, when minting the link token
const response = await fetch('https://api.trackstarhq.com/link/token', {
  method: 'POST',
  headers: { 'x-trackstar-api-key': YOUR_API_KEY },
  body: JSON.stringify({
    disabled_functions: ['get_orders'],   // turn these off for the new connection
    enabled_functions: ['get_returns'],   // re-enable an org-disabled endpoint for this connection
  }),
});
```

### Issues/Questions
Contact us at `support@trackstarhq.com`.
