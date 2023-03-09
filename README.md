# react-trackstar-link

### This package provides:

1. A [React](https://reactjs.org/) button component that launches the [Trackstar](https://www.trackstarhq.com/) connect modal.
2. A Hook that can be used to launch the modal manually.

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

The `trackstar-link` modal can be triggered using two methods:

1. Through the `TrackstarConnectButton` component.
2. Through the `useTrackstarLink` hook.

Here are some example uses of each:

```jsx
function App() {
  return (
    <TrackstarConnectButton
      getLinkToken={async () => await api.post('link/token')}
      onSuccess={(authCode, integrationName) => console.log('authCode token: ', authCode, 'integrationName :', integrationName)}
      onClose={() => console.log('closed')}
      onLoad={() => console.log('loaded')}
    >
      Connect your WMS!
    </TrackstarConnectButton>
  );
}
```

```js
function App() {
  const { open } = useTrackstarLink({
    onSuccess: (authCode, integrationName) => console.log('authCode token: ', authCode, 'integrationName: ', integrationName),
    onClose: () => console.log('closed'),
    onLoad: () => console.log('loaded'),
  });

  return <button onClick={() => open({})}>Connect your WMS!</button>;
}
```

### Issues/Questions
Contact us at `support@trackstarhq.com`.
