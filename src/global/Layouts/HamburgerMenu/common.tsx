import { Link, LinkProps } from 'react-router-dom';
import React from 'react';

export interface StyledLinkProps {
  isActive?: boolean;
}

// this prevents one console error
export const LinkWithoutIsActiveInDom = ({ isActive, children, ...restProps }: StyledLinkProps & LinkProps) => (
  <Link {...restProps}> {children} </Link>
);
