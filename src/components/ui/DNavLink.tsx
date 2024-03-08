/* eslint-disable react/jsx-props-no-spreading */
import type { NavLinkProps } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import React, { forwardRef } from 'react';
import clsx from 'clsx';

const DNavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => (
  <NavLink {...props} ref={ref} className={clsx('dnav-link', props.className)} />
));

export default DNavLink;
