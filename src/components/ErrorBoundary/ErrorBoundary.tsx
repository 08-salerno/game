/* eslint-disable no-console */
import React, { ErrorInfo } from 'react';

export type ErrorBoundaryProps = Record<string, unknown> & {
    showIfError?: React.Component | React.FC | React.ReactNode | React.ReactElement
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
  { error: Error | null }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error });
    console.error('ErrorBoundary catch', error);
    console.trace(errorInfo);
  }

  render(): React.ReactNode {
    const { error } = this.state;
    const { children, showIfError } = this.props;

    if (error) {
      if (showIfError) {
        return (
            <>
                {typeof showIfError === 'function' ? showIfError({}) : showIfError}
            </>
        );
      }
      return (
        <>
            Что-то сломалось. Попробуйте перезагрузить страницу.
        </>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
