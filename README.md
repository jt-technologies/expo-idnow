# j-tec/expo-idnow

IDnow Video Ident Expo Module

# Documentation

- [IDnow Repository](https://github.com/idnow)

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

## Add the package to your npm dependencies

```
npm install @jt-technologies/expo-idnow
```

## Expo Configuration

IDnow SDK for Android requires _**minSdkVersion: 23**_ [see here](https://github.com/idnow/de.idnow.android?tab=readme-ov-file#requirements)

`app.json`:

```json
{
  "expo": [
    [
      "expo-build-properties",
      {
        "android": {
          "minSdkVersion": 23,
          "targetSdkVersion": 34,
          "kotlinVersion": "1.9.0"
        }
      }
    ]
  ]
}
```

## Expo Plugin Configuration:

`app.json`:

```json
{
    "expo": {
        ...
        "plugins": [
            ...
            ["@jt-technologies/expo-idnow"],
        ]
    }
}
```

### Alternatively set all required permissions manually

`app.json`:

```
{
    "expo": {
        "ios": {
             "CFBundleDevelopmentRegion": "de",
             "NSMicrophoneUsageDescription": "Allow Location Access for Video Identification",
             "NSCameraUsageDescription": "Allow Camera Access for Video Identification",
             "NSMicrophoneUsageDescription": "Allow Microphone Access for Video Identification"
        }
        ...
        "android": {
            "permissions": [
                "android.permissions.ACCESS_NETWORK_STATE",
                "android.permissions.INTERNET",
                "android.permissions.WRITE_EXTERNAL_STORAGE",
                "android.permissions.CAMERA",
                "android.permissions.FLASHLIGHT",
                "android.permissions.MODIFY_AUDIO_SETTINGS",
                "android.permissions.RECORD_AUDIO",
                "android.permissions.BLUETOOTH",
                "android.permissions.BLUETOOTH_ADMIN",
                "android.permissions.BLUETOOTH_CONNECT"
            ]
        },
        ...

    }
}
```
