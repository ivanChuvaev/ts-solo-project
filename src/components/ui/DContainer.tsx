/* eslint-disable react/jsx-props-no-spreading */
import type { ComponentPropsWithoutRef } from 'react';
import React, { forwardRef } from 'react';
import clsx from 'clsx';

const DContainer = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>((props, ref) => (
  <div {...props} ref={ref} className={clsx('dcontainer', props.className)} />
));

export default DContainer;
