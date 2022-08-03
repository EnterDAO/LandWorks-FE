import React, { FC } from 'react';

import { Typography } from 'design-system';
import { Section, SectionTitle, SpecificSectionProps } from 'modules/grants-program/styled';

export const TermsAndConditionsSection: FC<SpecificSectionProps> = ({ id }: SpecificSectionProps) => {
  return (
    <Section id={id}>
      <SectionTitle>Terms and conditions</SectionTitle>
      <Typography component="ol" sx={{ pl: 4 }}>
        <li>Winners will be decided by a panel of judges on the basis of the scoring factors.</li>
        <li>All builds (including zip files) submitted by the entries will be open-sourced to the public.</li>
        <li>EnterDAO reserves the right to modify, suspend or terminate the competition without notice.</li>
        <li>EnterDAO reserves the right to promote and modify the scenes created as a result of this program.</li>
        <li>
          All applications in the program will be shared with the EnterDAO community as the EnterDAO community is part
          of the jury board.
        </li>
        <li>All applications in the program can be used for promotional purposes by EnterDAO.</li>
      </Typography>
    </Section>
  );
};
