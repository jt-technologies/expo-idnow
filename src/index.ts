import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from 'expo-modules-core'

// Import the native module. On web, it will be resolved to ExpoIDnow.web.ts
// and on native platforms to ExpoIDnow.ts
import ExpoIDnowModule from './ExpoIDnowModule'
import ExpoIDnowView from './ExpoIDnowView'
import { ChangeEventPayload, ExpoIDnowViewProps } from './ExpoIDnow.types'

// Get the native constant value.
export const PI = ExpoIDnowModule.PI

export function hello(): string {
  return ExpoIDnowModule.hello()
}

export async function setValueAsync(value: string) {
  return await ExpoIDnowModule.setValueAsync(value)
}

const emitter = new EventEmitter(
  ExpoIDnowModule ?? NativeModulesProxy.ExpoIDnow,
)

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void,
): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener)
}

export { ExpoIDnowView, ExpoIDnowViewProps, ChangeEventPayload }
