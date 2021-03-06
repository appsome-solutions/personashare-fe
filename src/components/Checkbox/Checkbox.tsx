import styled from 'styled-components';
import { Checkbox as AntCheckbox } from 'antd';

type FormFieldProps = {
  isValid?: boolean;
};

export const Checkbox = styled(AntCheckbox)<FormFieldProps>`
  &&& {
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${(props) => props.theme.colors.main.primary};
    }
    .ant-checkbox-inner {
      width: 20px;
      height: 20px;
      box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.02), 0px 1px 3px rgba(50, 50, 93, 0.15);
      border-radius: 4px;
      background-color: ${(props) => props.theme.colors.utils.background.light};
      ${(props) => props.isValid === false && `border: 1px solid ${props.theme.colors.functional.error};`};
    }
  }
`;
