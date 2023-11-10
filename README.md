# CscMobile
It is an Android application for local NGO partners and governmental officials to use to enhance their participation and dialogue with regards to public services improvement.

## Getting Start

### Prerequisites

- Make sure your environment is set up to run React Native applications. Follow the [React Native](https://facebook.github.io/react-native/docs/getting-started.html) instructions for getting started.
- Apps using Realm 10.15.0.
- React Native 0.63.2.
- Node version 16.0 or later.
- [Firebase console](https://console.firebase.google.com) account and add firebase to app(Android)

#### Firebase Analytic google-services.json
- Create [Firebase Console Account](https://firebase.google.com/)
- Create a project
- Add Android app to the project
- Download google-services.json
- Place the file to ```scorecard_mobile/android/app/google-servies.json```
- **Important**: You can read more on [react-native-firebase](https://rnfirebase.io/) and [Analytic](https://rnfirebase.io/analytics/usage)

#### Run the application
- Go to the repository
```
$cd scorecard_mobile
```
- Install dependencies
```
$npm install
```
- To start Metro, run below command inside your React Native project
```
npx react-native start
```
- To start the application run
```
$npx react-native run-android
```

#### Build for Release
- If no existed keystore, you can create a new one, or use the exsited keystore and follow
[Build for release](https://reactnative.dev/docs/signed-apk-android)