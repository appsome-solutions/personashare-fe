import React, { FC, useCallback, useState } from 'react';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import { useUserContext } from 'global/UserContext/UserContext';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useFirebase } from 'global/Firebase';
import { GET_SPOT, UPDATE_SPOT } from 'global/graphqls/Spot';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { AgregatedSpot, Entity } from 'global/graphqls/schema';
import { Overlay } from 'components/Overlay/Overlay';
import { Spinner } from 'components/Spinner/Spinner';
import { Button, message, Tag, Tooltip } from 'antd';
import { Icon } from 'components/Icon';
import { InputWithSuffixIcon } from 'components/InputWithSuffixIcon/InputWithSuffixIcon';
import AddSvg from 'assets/add-24px.svg';
import EmailIconSvg from 'assets/email.svg';
import 'antd/dist/antd.css';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { APP_ROUTES } from '../../../global/AppRouter/routes';
import { useTranslation } from 'react-i18next';

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

const CheckIcon = styled(CheckCircleOutlined)`
  margin-right: 2px;
`;

const ClockIcon = styled(ClockCircleOutlined)`
  margin-right: 2px;
`;

export type InvitationsProps = {
  uuid: string;
  onSpotCreationOrUpdate?: (arg: (arg0: any, values: SendInvitationPayload, arg2: any) => void) => void;
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

const initialValues: SendInvitationPayload = {
  emails: [],
  currentEmail: '',
};

const currentYear = new Date().getFullYear();

const baseUrl = process.env.REACT_APP_BASE_URL || 'https://persona-share.netlify.app';

const withProvider = (Component: any) => {
  return ({ uuid, onSpotCreationOrUpdate }: InvitationsProps) => {
    const { user } = useUserContext();
    const { loading: areSpotDataLoading, data: spotData } = useQuery<{ spot: AgregatedSpot }>(GET_SPOT, {
      variables: { uuid },
      skip: !uuid,
    });
    const { data, loading } = useQuery<GetCardType>(GET_PERSONA, {
      variables: { uuid: user?.defaultPersona },
    });
    const [updateSpot] = useMutation<Entity>(UPDATE_SPOT);

    if (loading || areSpotDataLoading || !data) {
      return (
        <Overlay>
          <Spinner />
        </Overlay>
      );
    }

    return (
      <Component
        updateSpot={updateSpot}
        spotData={spotData}
        data={data}
        onSpotCreationOrUpdate={onSpotCreationOrUpdate}
      />
    );
  };
};

type ManagerListEditModeType = {
  spotData: { spot: AgregatedSpot };
  data: GetCardType;
  updateSpot: (arg: any) => {};
  onSpotCreationOrUpdate: (arg: (arg0: any, values: SendInvitationPayload, arg2: any) => void) => void;
};

export const ManagerListEditMode: FC<InvitationsProps> = withProvider(
  ({ spotData, data, updateSpot, onSpotCreationOrUpdate }: ManagerListEditModeType) => {
    const { sendMail } = useFirebase();
    const { user } = useUserContext();
    const spot = spotData?.spot;

    const userName = data?.persona.card.name;
    const invitedManagerEmails = spot ? spot?.invitedManagerEmails : [];
    const [inputVisible, setInputVisible] = useState(true);
    const { t } = useTranslation();

    const handleSubmit = useCallback(
      (spot, values: SendInvitationPayload, setSubmitting) => {
        const invitationLink = `${baseUrl}${APP_ROUTES.SPOT_INVITATION(spot.uuid)}`;
        if (!userName) {
          return;
        }

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

        return Promise.all(result)
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
                    status: 'waiting',
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
      },
      [userName, invitedManagerEmails]
    );

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

    const messageErrorHandler = (values: any) => {
      if (user?.kind === 'free' && values.emails?.length > 2) {
        return message.info(`${t('EDIT_MANAGER_LIMIT_FREE')}`);
      } else {
        return message.info(`${t('EDIT_MANAGER_LIMIT_PREMIUM')}`);
      }
    };

    const addEmailHandler = (values: any, setFieldValue: any, setFieldError: any, errors: any) => {
      if (user?.kind === 'free' && values.emails?.length > 2) {
        return messageErrorHandler(values);
      } else if (user?.kind === 'premium' && values.emails?.length > 5) {
        return messageErrorHandler(values);
      } else {
        return addEmail(values, setFieldValue, setFieldError, errors);
      }
    };

    return (
      <>
        <CardBody className={CardBody}>
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <Formik initialValues={initialValues} onSubmit={() => {}} validationSchema={sendInvitationSchema}>
            {({ values, setFieldValue, setFieldError, errors }) => (
              <Form id="spotInvitations">
                {
                  // I know this is shitty code but this whole component needs to be refactored
                  onSpotCreationOrUpdate((newSpot, _formikValues, setSubmitting) => {
                    return handleSubmit(newSpot, values, setSubmitting);
                  })
                }
                {invitedManagerEmails.map((EmailInvitation, index) => {
                  if (EmailInvitation.status === 'accepted') {
                    return (
                      <>
                        <Tag
                          key={EmailInvitation.email}
                          color="green"
                          closable={index !== -1}
                          onClose={() => removeEmail(EmailInvitation.email, values, setFieldValue)}
                        >
                          <CheckIcon />
                          {EmailInvitation.email}
                        </Tag>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <Tag
                          key={EmailInvitation.email}
                          closable={index !== -1}
                          onClose={() => removeEmail(EmailInvitation.email, values, setFieldValue)}
                        >
                          <ClockIcon />
                          {EmailInvitation.email}
                        </Tag>
                      </>
                    );
                  }
                })}
                {values.emails &&
                  values.emails.map((email: string, index) => {
                    const isLongTag = email.length > 20;
                    const tagElem = (
                      <Tag
                        key={email}
                        closable={index !== -1}
                        onClose={() => removeEmail(email, values, setFieldValue)}
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
                    <InputField
                      name="currentEmail"
                      placeholder="Email"
                      type="text"
                      size="small"
                      svgLink={EmailIconSvg}
                    />
                    <IconWrapper>
                      <IconBox>
                        <Icon
                          svgLink={AddSvg}
                          width="32px"
                          height="32px"
                          onClick={() => addEmailHandler(values, setFieldValue, setFieldError, errors)}
                        />
                      </IconBox>
                    </IconWrapper>
                  </ButtonWrapper>
                )}
                {!inputVisible && (
                  <Button size="small" type="dashed" onClick={showInput}>
                    + New Email
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </CardBody>
      </>
    );
  }
);
