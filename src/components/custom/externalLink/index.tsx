import React from 'react';

export type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ExternalLink: React.FC<ExternalLinkProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <a className={className} rel="noopener noreferrer" target="_blank" {...rest}>
      {children}
    </a>
  );
};

export default ExternalLink;
