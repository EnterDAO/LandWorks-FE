import React, { FC } from 'react';

import flowImageSrc from 'assets/img/process-flow.svg';
import { Box } from 'design-system';
import {
  Section,
  SectionTitle,
  SpecificSectionProps,
  SubSection,
  SubSectionTitle,
} from 'modules/grants-program/styled';

import { NumberedList, StyledList, StyledTypography } from './styled';

export const ProcessSection: FC<SpecificSectionProps> = ({ id }) => {
  return (
    <Section id={id}>
      <SectionTitle>Process</SectionTitle>

      <SubSection>
        <SubSectionTitle>Builders would need to apply for a grant by stating:</SubSectionTitle>

        <StyledList>
          <li>
            Category of choice (NFT gallery / Event Venue / Fashion Venue / Company HQ / Sharded Minds themed scene)
          </li>
          <li>
            Specification and functionalities of the scene (description of your vision and how you plan to execute it)
          </li>
          <li>Initial design/mock up of the scene (images / models)</li>
          <li>Delivery date (estimate)</li>
          <li>Tier and amount requested from the fund </li>
          <li>Email / Twitter / Discord</li>
          <li>Wallet for payout (on the Ethereum blockchain)</li>
          <li>Confirmation that you have read and agree with the terms and conditions of the program.</li>
        </StyledList>
        <br />
        <StyledTypography>
          Link to application form:{' '}
          <a href="https://d1zs47v7suw.typeform.com/to/hs05sYCZ">https://d1zs47v7suw.typeform.com/to/hs05sYCZ</a>
        </StyledTypography>
        <NumberedList>
          <li>
            After an application is submitted the jury panel will evaluate it and provide a go/no go decision. This
            includes the vote of the EnterDAO community as well.
          </li>
          <li>
            The evaluation period will be up to 20 days and might include a discussion with the builder to further
            clarify details regarding the submission. Builders will be notified about the decision of the jury panel in
            any case.
          </li>
          <li>
            If the application is approved by the jury panel then the builders will be paid upon delivery and successful
            test of the scene.
          </li>
          <li>
            This effort is made to put more resources into the hands of our community creators. In such, If the
            application is denied by the jury panel the builder is still free to build a scene and open-source it
            through LandWorks, however the builder will not receive a grant for it.
          </li>
          <li>
            The jury will evaluate the application in a first come, first serve manner, meaning that the application
            process will close as soon as the jury has approved applications which are exhausting the full amount of the
            grant prize pool.
          </li>
          <li>
            <p>
              Each approved scene should be uploaded in the{' '}
              <a href="https://github.com/EnterDAO/landworks-grants-program">EnterDAO GitHub</a> repository which we
              have created for all scenes part of the program.
            </p>
          </li>
          <li>
            All scenes will also be available in LandWorks’s scene pool later on as it is currently under development.
          </li>
        </NumberedList>

        <Box component="img" width={1} src={flowImageSrc} alt="Process flow diagram" />
      </SubSection>
    </Section>
  );
};
