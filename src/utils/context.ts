import { ConsumerProps, Context, createContext, useContext } from 'react';

const defaultValue = undefined;
type DefaultValue = undefined;

export const createSafeContext = <ContextValue>(): Context<ContextValue | DefaultValue> => {
  return createContext<ContextValue | DefaultValue>(defaultValue);
};

export const useSafeContext = <T>(context: Context<T | DefaultValue>): T => {
  const value = useContext(context);

  if (value === defaultValue) {
    throw new Error('no value provided for context');
  }

  return value as T;
};

export const createSafeConsumer = <T>(
  context: Context<T | DefaultValue>
): (({ children }: ConsumerProps<T>) => React.ReactNode) => {
  const SafeConsumer = ({ children }: ConsumerProps<T>) => {
    const value = useSafeContext(context);
    return children(value);
  };

  return SafeConsumer;
};
