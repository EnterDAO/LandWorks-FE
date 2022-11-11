import { ComponentType } from 'react';
import splitbee from '@splitbee/web';

const withSplitBee =
  (defaultEvent: string) =>
  <P extends { onClick?: (e: any) => void }>(WrappedComponent: ComponentType<P>) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithSplitBee = ({
      splitBeeEvent = defaultEvent,
      splitBeeData,
      onClick,
      ...otherProps
    }: P & { splitBeeEvent?: string; splitBeeData?: Record<string, string | number | boolean | undefined | null> }) => {
      const handleClick: P['onClick'] = (e: any): void => {
        splitbee.track(splitBeeEvent, splitBeeData);

        if (onClick) {
          onClick(e);
        }
      };

      return <WrappedComponent onClick={handleClick} {...(otherProps as P)} />;
    };

    ComponentWithSplitBee.displayName = `withSplitBee(${displayName})`;

    return ComponentWithSplitBee;
  };

export default withSplitBee;
