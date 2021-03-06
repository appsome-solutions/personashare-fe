import styled from 'styled-components';
import { Button as AntdButton } from 'antd';

export const Button = styled(AntdButton)`
  && {
    color: ${(props) => props.theme.colors.utils.text.light};
    background-color: ${(props) => props.theme.colors.main.primary};
    height: 36px;
    cursor: pointer;
    border-radius: 4px;
    padding: 8px 0;

    &&:disabled {
      cursor: not-allowed;
      background-color: ${(props) => props.theme.colors.functional.disabled};
    }
    &&:active,
    &&:hover {
      color: ${(props) => props.theme.colors.utils.text.light};
    }
  }
`;
