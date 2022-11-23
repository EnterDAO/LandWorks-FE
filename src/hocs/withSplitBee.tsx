import { ComponentType } from 'react';
import splitbee from '@splitbee/web';

interface SplitBeeProps {
  splitBeeEvent?: string;
  splitBeeData?: Record<string, string | number | boolean | undefined | null>;
}

const withSplitBee =
  (defaultEvent: string) =>
  <P extends { onClick?: (e: any) => void }>(WrappedComponent: ComponentType<P>): ComponentType<P & SplitBeeProps> => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithSplitBee = ({
      splitBeeEvent = defaultEvent,
      splitBeeData,
      onClick,
      ...otherProps
    }: P & SplitBeeProps) => {
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
