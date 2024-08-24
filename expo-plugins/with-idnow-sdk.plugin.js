const { withInfoPlist } = require('@expo/config-plugins')

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
 * Expo  Plugins
 * @see https://docs.expo.dev/config-plugins/plugins-and-mods/
 *
 * @type {import('@expo/config-plugins').ConfigPlugin}
 */
const withIDnowSDK = expoConfig => {
  return (expoConfig = withInfoPlist(expoConfig, config => {
    config.modResults = setInfoPlistConfig(config.modResults)
    return config
  }))
}

module.exports = withIDnowSDK
