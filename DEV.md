# Development Environment

## Prerequisites

### node.js and npm

Install node.js, npm, yarn, then `yarn install`.

### xcode-select

Install XCode command-line tools.

```
xcode-select --install
```

### create-react-native-app

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app). See the [create-react-native](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md) documentation for available tools.

```
npm i -g create-react-native-app
create-react-native-app 33-minutes-app
```

### Expo

33-Minutes is an Expo app. Expo apps are React Native apps which contain the Expo SDK. See [expo.io](https://docs.expo.io/versions/v28.0.0/) for more information.

Create an account on [expo.io](https://expo.io), verify your email.

Download Expo XDE from https://github.com/expo/xde/releases.

Install `exp`.

```
npm install -g exp && exp path
```

## Working with Expo

### `yarn start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
yarn start --reset-cache
```

## Publishing

### expo.io

Publish to Expo.io with `exp publish`. The app is available with the [expo client](https://expo.io/tools).

### Apple AppStore

Create an .ipa file with `exp build:ios`.

Download it and upload with [Application Loader](https://help.apple.com/itc/apploader/) available from XCode.
