import styled from 'styled-components';
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  flex,
  FlexProps,
  flexbox,
  FlexboxProps,
  BorderProps,
  position,
  PositionProps,
  compose,
  border,
} from 'styled-system';

export type BoxProps = SpaceProps & LayoutProps & FlexProps & BorderProps & PositionProps;

export const Box = styled.div<BoxProps>(compose(space, layout, flex, flexbox, border, position), {
  boxSizing: 'border-box',
});

export const Flex = styled(Box)<FlexboxProps>(flexbox, {
  display: 'flex',
});
