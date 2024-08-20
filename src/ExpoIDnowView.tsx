import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoIDnowViewProps } from './ExpoIDnow.types';

const NativeView: React.ComponentType<ExpoIDnowViewProps> =
  requireNativeViewManager('ExpoIDnow');

export default function ExpoIDnowView(props: ExpoIDnowViewProps) {
  return <NativeView {...props} />;
}
