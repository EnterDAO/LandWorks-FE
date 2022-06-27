/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component } from 'react';

import { Text } from 'components/custom/typography';
import { ReactComponent as Error500Svg } from 'resources/svg/error-500.svg';

type State = {
  error?: Error;
};

export default class ErrorBoundary extends Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: undefined,
    };
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
    });
  }

  handleRefresh = () => {
    window.location.href = `${window.location.href}`;
  };

  render() {
    if (this.state.error) {
      return (
        <div>
          <div style={{ marginTop: '5rem', textAlign: 'center' }}>
            <Error500Svg />
          </div>

          <Text type="h2" weight="semibold" color="primary" align="center" style={{ margin: '1rem 0' }}>
            500
          </Text>

          <Text type="p2" weight="semibold" color="secondary" align="center" style={{ margin: '1rem 0' }}>
            Sorry, something went wrong.
          </Text>

          <button
            type="button"
            className="button-primary button-small"
            style={{ margin: '1rem auto' }}
            onClick={this.handleRefresh}
          >
            Refresh page
          </button>
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}
