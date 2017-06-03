# Gun AsyncStorage

Interop layer between [Gun.js](https://gun.js.org) and React Native's [AsyncStorage](http://facebook.github.io/react-native/docs/asyncstorage.html). In other words, allows you to use Gun.js in React Native apps!

## Installation

```
npm install gun-asyncstorage
```

## Usage

In `index.ios.js` or `index.android.js` import this before importing anything else related to Gun:

```js
import 'gun-asyncstorage';
```

And that's it, all data that is written to the Gun instance will be stored (and recovered) from AsyncStorage.
