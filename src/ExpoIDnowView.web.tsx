import * as React from 'react';

import { ExpoIDnowViewProps } from './ExpoIDnow.types';

export default function ExpoIDnowView(props: ExpoIDnowViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
