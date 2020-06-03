import React, { FC } from 'react';
import styled from 'styled-components';

import { Card } from '../Card/Card';
import { Flex } from '../FlexBox/FlexBox';
import { WideButton } from '../Button';

type FormProps = {
  title: string;
  buttonLabel: string;
  formId: string;
};

const Title = styled.h5`
  line-height: 28px;
  margin-bottom: 24px;
  text-align: center;
  color: ${(props) => props.theme.colors.utils.text.dark};
`;

const FormButton = styled(WideButton)`
  margin-top: 24px;
`;

export const FormComponent: FC<FormProps> = ({ title, buttonLabel, formId, children }) => (
  <Card mb="45px">
    <Flex justifyContent="center" flexDirection="column" px="12px" py="27px">
      <Title>{title}</Title>
      {children}
      <FormButton htmlType="submit" form={formId}>
        {buttonLabel}
      </FormButton>
    </Flex>
  </Card>
);
