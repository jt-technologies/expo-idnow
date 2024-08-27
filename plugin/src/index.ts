import {
  withAndroidManifest,
  withInfoPlist,
  withProjectBuildGradle,
  type AndroidManifest,
  type ConfigPlugin,
  type InfoPlist,
} from '@expo/config-plugins'
import { mergeContents } from '@expo/config-plugins/build/utils/generateCode'

const setInfoPlistConfig = (infoPlist: InfoPlist): InfoPlist => {
  if (!infoPlist.NSLocationWhenInUseUsageDescription)
    infoPlist.NSLocationWhenInUseUsageDescription =
      'Allow Location Access for Video Identification'
  if (!infoPlist.NSCameraUsageDescription)
    infoPlist.NSCameraUsageDescription =
      'Allow Camera Access for Video Identification'
  if (!infoPlist.NSMicrophoneUsageDescription)
    infoPlist.NSMicrophoneUsageDescription =
      'Allow Microphone Access for Video Identification'

  return infoPlist
}

/**
 * Add Required Maven Repositories
 * @see https://github.com/idnow/de.idnow.android?tab=readme-ov-file#how-to-import-the-sdk
 */
const setBuildGradleConfig = (buildGradleContent: string): string => {
  /**
   * Substitute the android-pdf-viewer dependency.
   * @see https://github.com/jitpack/jitpack.io/issues/4039#issuecomment-2298913452
   */
  const dependencySubstitution = `
    configurations.all {
        resolutionStrategy {
            dependencySubstitution {
                substitute module('com.github.barteksc:android-pdf-viewer:2.6.0') using module('com.github.mhiew:android-pdf-viewer:3.2.0-beta.3')
            }
        }
    }
  `
  const withDependencySubstitution = mergeContents({
    src: buildGradleContent,
    newSrc: dependencySubstitution,
    tag: '@j-tec/expo-idnow dependency substitution',
    anchor: /allprojects\s*\{/,
    offset: 1,
    comment: '//',
  }).contents

  const newMavenRepositories = `
        maven {
          url 'https://raw.githubusercontent.com/idnow/de.idnow.android/master'
        }
  `
  return mergeContents({
    src: withDependencySubstitution,
    newSrc: newMavenRepositories,
    tag: '@j-tec/expo-idnow maven repositories',
    anchor: /maven\s*\{\s*url\s*'https:\/\/www.jitpack.io'\s*\}\s*/,
    offset: 0,
    comment: '//',
  }).contents
}

/**
 * Add Required Permissions
 * @see https://github.com/idnow/de.idnow.android?tab=readme-ov-file#androidmanifest
 */
const setAndroidPermissions = (
  androidManifest: AndroidManifest['manifest'],
): any => {
  const permissions = [
    'ACCESS_NETWORK_STATE',
    'INTERNET',
    'WRITE_EXTERNAL_STORAGE',
    'CAMERA',
    'FLASHLIGHT',
    'MODIFY_AUDIO_SETTINGS',
    'RECORD_AUDIO',
    'BLUETOOTH',
    'BLUETOOTH_ADMIN',
    'BLUETOOTH_CONNECT',
  ]

  const androidPermissions = []
  for (const permission of permissions) {
    if (
      androidManifest['uses-permission']?.findIndex(
        item =>
          item['$']['android:name'] === `android.permission.${permission}`,
      ) === -1
    ) {
      androidPermissions.push({
        $: {
          'android:name': `android.permission.${permission}`,
        },
      })
    }
  }

  return {
    ...androidManifest,
    ['uses-permission']: [
      ...(androidManifest['uses-permission'] ?? []),
      ...androidPermissions,
    ],
  }
}

/**
 * Expo  Plugins
 * @see https://docs.expo.dev/config-plugins/plugins-and-mods/
 * @see https://github.com/expo/expo/tree/main/packages/expo-module-scripts
 */
const withIDnowSDK: ConfigPlugin = expoConfig => {
  expoConfig = withInfoPlist(expoConfig, config => {
    config.modResults = setInfoPlistConfig(config.modResults)
    return config
  })

  expoConfig = withProjectBuildGradle(expoConfig, config => {
    config.modResults.contents = setBuildGradleConfig(
      config.modResults.contents,
    )
    return config
  })

  expoConfig = withAndroidManifest(expoConfig, config => {
    config.modResults.manifest = setAndroidPermissions(
      config.modResults.manifest,
    )
    return config
  })

  return expoConfig
}

export default withIDnowSDK
