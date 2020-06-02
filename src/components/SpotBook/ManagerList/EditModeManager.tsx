import React, { FC, useCallback, useState } from 'react';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import { useUserContext } from 'global/UserContext/UserContext';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useFirebase } from 'global/Firebase';
import { SpotType, UPDATE_SPOT } from 'global/graphqls/Spot';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { Entity } from '../../../global/graphqls/schema';
import { Overlay } from '../../Overlay/Overlay';
import { Spinner } from '../../Spinner/Spinner';
import { Button, Tag, Tooltip } from 'antd';
import { Icon } from '../../Icon';
import { InputWithSuffixIcon } from '../../InputWithSuffixIcon/InputWithSuffixIcon';
import AddSvg from 'assets/add-24px.svg';
import EmailIconSvg from '../../../assets/email.svg';
import { WideButton } from '../../Button';

const InputField = styled(InputWithSuffixIcon)`
  && {
    height: 32px;
    margin-right: 16px;
    width: auto;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 16px 0;
`;

const IconBox = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.main.primary};
`;

const CardBody = styled.div`
  padding: 17px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type InvitationsProps = {
  invitationLink: string;
  spot: SpotType['spot'];
};

const sendInvitationSchema = Yup.object({
  emails: Yup.array()
    .required()
    .of(Yup.string().email('Email must be valid')),
  currentEmail: Yup.string().email('Email must be valid'),
});

type SendInvitationPayload = Yup.InferType<typeof sendInvitationSchema>;

type AddEmail = (
  values: SendInvitationPayload,
  setFieldValue: FormikHelpers<SendInvitationPayload>['setFieldValue'],
  setFieldError: FormikHelpers<SendInvitationPayload>['setFieldError'],
  errors: FormikErrors<SendInvitationPayload>
) => void;

export type RemoveEmail = (
  email: string,
  values: SendInvitationPayload,
  setFieldValue: FormikHelpers<SendInvitationPayload>['setFieldValue']
) => void;

const currentYear = new Date().getFullYear();

export const ManagerListEditMode: FC<InvitationsProps> = ({ invitationLink, spot }) => {
  const { sendMail } = useFirebase();
  const { user } = useUserContext();
  const { data, loading } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: user?.defaultPersona },
  });
  const [updateSpot] = useMutation<Entity>(UPDATE_SPOT);
  const userName = data?.persona.card.name;
  const invitedManagerEmails = spot?.invitedManagerEmails;
  const [inputVisible, setInputVisible] = useState(true);

  const initialValues: SendInvitationPayload = {
    emails: spot.invitedManagerEmails.map((el) => el.email),
    currentEmail: '',
  };

  const handleSubmit = useCallback(
    (values: SendInvitationPayload, { setSubmitting }) => {
      if (userName) {
        setSubmitting(true);
        const result = values.emails.map((email) =>
          sendMail({
            to: email,
            template: {
              name: 'spot_invitation',
              data: {
                subject: `Invitation to the ${spot.card.name}`,
                spotName: spot.card.name,
                invitationLink,
                currentYear,
                userName,
              },
            },
          })
        );

        Promise.all(result)
          .then(() => {
            updateSpot({
              variables: {
                uuid: spot.uuid,
                spot: {
                  card: {
                    ...spot.card,
                    __typename: undefined,
                  },
                  page: {
                    ...spot.page,
                    __typename: undefined,
                  },
                  invitedManagerEmails: values.emails.map((el) => ({
                    email: el,
                    status: 'sent',
                  })),
                },
              },
            });
            setSubmitting(false);
          })
          .catch((e) => {
            console.error(e);
            setSubmitting(false);
          });
      }
    },
    [userName, invitationLink, invitedManagerEmails]
  );

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }

  const addEmail: AddEmail = (values, setFieldValue, setFieldError, errors) => {
    const { currentEmail, emails } = values;

    if (emails.includes(currentEmail)) {
      setFieldError('currentEmail', 'Email already included!');
      return;
    }

    if (!currentEmail || errors.currentEmail) {
      return;
    }
    setFieldValue('emails', [...emails, currentEmail]);
    setFieldValue('currentEmail', '');
    setInputVisible(false);
  };

  const removeEmail: RemoveEmail = (emailToRemove, values, setFieldValue) => {
    if (values.emails.includes(emailToRemove)) {
      setFieldValue(
        'emails',
        values.emails.filter((email) => email !== emailToRemove)
      );
    }
  };

  const showInput = () => {
    setInputVisible(true);
  };

  return (
    <>
      <CardBody className={CardBody}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={sendInvitationSchema}>
          {({ values, setFieldValue, setFieldError, errors, isValid }) => (
            <Form id="spotInvitations">
              {values.emails &&
                values.emails.map((email: string, index) => {
                  const isLongTag = email.length > 20;
                  const tagElem = (
                    <Tag
                      key={email}
                      closable={index !== -1}
                      // afterClose={() => removeEmail(email, values, setFieldValue)}
                    >
                      {isLongTag ? `${email.slice(0, 20)}...` : email}
                    </Tag>
                  );
                  return isLongTag ? (
                    <Tooltip title={email} key={email}>
                      {tagElem}
                    </Tooltip>
                  ) : (
                    tagElem
                  );
                })}
              {inputVisible && (
                <ButtonWrapper>
                  <InputField name="currentEmail" placeholder="Email" type="text" size="small" svgLink={EmailIconSvg} />
                  <IconWrapper>
                    <IconBox>
                      <Icon
                        svgLink={AddSvg}
                        color="white"
                        width="32px"
                        height="32px"
                        onClick={() => addEmail(values, setFieldValue, setFieldError, errors)}
                      />
                    </IconBox>
                  </IconWrapper>
                </ButtonWrapper>
              )}
              {!inputVisible && (
                <Button size="small" type="dashed" onClick={showInput}>
                  + New Tag
                </Button>
              )}
              <WideButton htmlType="submit" disabled={!isValid}>
                SEND INVITATION
              </WideButton>
            </Form>
          )}
        </Formik>
      </CardBody>
    </>
  );
};
