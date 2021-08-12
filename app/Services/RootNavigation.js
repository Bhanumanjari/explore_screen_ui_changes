import * as React from 'react';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
}

export function reset(name, params = {}) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.reset({
      index: 0,
      routes: [{name, params}],
    });
  }
}
