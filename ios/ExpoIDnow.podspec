require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'ExpoIDnow'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.platforms      = { :ios => '13.4', :tvos => '13.4' }
  s.swift_version  = '5.4'
  s.source         = { git: 'https://github.com/j-tec/expo-idnow' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_COMPILATION_MODE' => 'wholemodule'
  }

  s.vendored_frameworks = [
    'Frameworks/FaceTecSDK.xcframework',
    'Frameworks/IDNowSDKCore.xcframework'
  ]

  s.private_header_files = [
    'Frameworks/FaceTecSDK.xcframework/ios-arm64/FaceTecSDK.framework/Headers/*.h',
    'Frameworks/FaceTecSDK.xcframework/ios-arm64_x86_64-simulator/FaceTecSDK.framework/Headers/*.h',
    'Frameworks/IDNowSDKCore.xcframework/ios-arm64/IDNowSDKCore.framework/Headers/*.h',
    'Frameworks/IDNowSDKCore.xcframework/ios-arm64_x86_64-simulator/IDNowSDKCore.framework/Headers/*.h'
  ]

  s.preserve_paths = [
    "Frameworks/FaceTecSDK.xcframework/**/*",
    "Frameworks/IDNowSDKCore.xcframework/**/*"
  ]

  # This library is required by IDnowSDK
  s.dependency 'XS2AiOS'

  s.source_files = "**/*.{h,m,swift}"
end
