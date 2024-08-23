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
  s.dependency 'IDnowSDK', '~> 8.4.0'

  s.source_files = "**/*.{h,m,swift}"
end
