import styled from 'styled-components';
import { Icon, IconProps } from './Icon';

export interface IconRotableProps extends IconProps {
  degree?: number;
}

export const IconRotable = styled(Icon)<IconRotableProps>`
  transform: rotate(${(props) => (props.degree ? props.degree.toString() : 0)}deg);
`;
