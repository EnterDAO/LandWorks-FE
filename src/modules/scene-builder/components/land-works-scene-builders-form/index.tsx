import React, { useEffect } from 'react';

import { StyledRoot } from './styled';

const SceneBuildersForm: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <StyledRoot
      data-tf-widget="S4r8lyP4"
      data-tf-iframe-props="title=Scene Builders Signup"
      data-tf-medium="snippet"
    ></StyledRoot>
  );
};

export default SceneBuildersForm;
