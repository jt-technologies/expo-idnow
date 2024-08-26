const {
  withInfoPlist,
  withProjectBuildGradle,
} = require('@expo/config-plugins')
const {
  mergeContents,
} = require('@expo/config-plugins/build/utils/generateCode')

/**
 * Sets the Info.plist configuration for the IDnow SDK
 *
 * @param {import('@expo/config-plugins').InfoPlist} infoPlist
 * @returns {import('@expo/config-plugins').InfoPlist}
 */
const setInfoPlistConfig = infoPlist => {
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
 * Add a new maven repository to the project's build.gradle
 * @param {string} buildGradleContent
 * @returns {string}
 */
const setBuildGradleConfig = buildGradleContent => {
  const newMavenRepositories = `
        maven {
          url 'https://raw.githubusercontent.com/idnow/de.idnow.android/master'
        }
        jcenter() {
          // JCenter is now read-only. Therefore, no new versions are published there any more.
          // We only fetch the necessary dependencies for IDnow from JCenter to avoid loading old dependencies.
          content {
            includeModule("com.github.barteksc", "android-pdf-viewer")
          }
        }
  `
  return mergeContents({
    src: buildGradleContent,
    newSrc: newMavenRepositories,
    tag: '@j-tec/expo-idnow',
    anchor: /maven\s*\{\s*url\s*'https:\/\/www.jitpack.io'\s*\}\s*/,
    offset: 1,
    comment: '//',
  }).contents
}

/**
 * Expo  Plugins
 * @see https://docs.expo.dev/config-plugins/plugins-and-mods/
 *
 * @type {import('@expo/config-plugins').ConfigPlugin}
 */
const withIDnowSDK = expoConfig => {
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

  return expoConfig
}

module.exports = withIDnowSDK
