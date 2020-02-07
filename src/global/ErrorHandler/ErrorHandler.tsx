import React, { ReactNode, Component } from 'react';
import { Alert } from 'antd';
import { withTranslation } from 'helpers/withTranslation';

interface ErrorHandlerState {
  errorOccurred: boolean;
}

interface ErrorHandlerClassProps {
  children: ReactNode;
  t: (key: string) => string;
}

class ErrorHandlerClass extends Component<ErrorHandlerClassProps, ErrorHandlerState> {
  public state = { errorOccurred: false };

  componentDidCatch(): void {
    this.setState({ errorOccurred: true });
  }

  render(): ReactNode {
    // to have errors on development:
    if (process.env.NODE_ENV === 'development') {
      return this.props.children;
    }

    if (this.state.errorOccurred) {
      setTimeout(() => window.location.reload(), 5000);
    }

    const { t } = this.props;

    return this.state.errorOccurred ? (
      <Alert
        type="error"
        message={t('Global_ErrorHandler_ErrorTitle')}
        description={t('Global_ErrorHandler_ErrorDescription')}
        banner
        showIcon
      />
    ) : (
      this.props.children
    );
  }
}

export const ErrorHandler = withTranslation(ErrorHandlerClass);
