import React from 'react';

import Flow from 'assets/img/process_flow.png';
import { SectionTitle, SubTitle } from 'modules/grants-program/styled';

import { NumberedList, StyledImage, StyledList, StyledTypography } from './styled';

export const Process: React.FC = () => {
  return (
    <div id={'gp-id-1'}>
      <SectionTitle>Process</SectionTitle>

      <SubTitle>Builders would need to apply for a grant by stating:</SubTitle>
      <StyledList>
        <li>Categoty</li>
        <li>Specification of the scene and what functionalities it will have</li>
        <li>Initial design/mock up of how the scene would look like</li>
        <li>Delivery date (estimate)</li>
        <li>The tier and amount requested from the fund </li>
        <li>Contact</li>
        <li>Wallet for payout (on the Ethereum blockchain)</li>
        <li>Their confirmation (not sure) hat their scene will be open-sourced for anyone to use</li>
      </StyledList>
      <br />
      <StyledTypography>
        Link to application form:{' '}
        <a href="https://d1zs47v7suw.typeform.com/to/hs05sYCZ">https://d1zs47v7suw.typeform.com/to/hs05sYCZ</a>
      </StyledTypography>
      <NumberedList>
        <li>After an application is submitted the jury panel will evaluate it and provide a go/no go decision. </li>
        <li>
          The evaluation period will be up to 20 days and might include a discussion with the builder to further clarify
          details regarding the submission. Builders will be notified about the decision of the jury panel in any case.
        </li>
        <li>
          If the application is approved by the jury panel then the builders will be paid upon delivery and successful
          test of the scene.
        </li>
        <li>
          This effort is made to put more resources into the hands of our community creators. In such, If the
          application is denied by the jury panel the builder is still free to build a scene and open-source it through
          LandWorks, however the builder will not receive a grant for it.
        </li>
        <li>
          The jury will evaluate the application in a first come, first serve manner, meaning that the application
          process will close as soon as the jury has approved applications which are exhausting the full amount of the
          grant prize pool.
        </li>
        <li>
          <p>
            Each approved scene should be uploaded in the{' '}
            <a href="https://github.com/EnterDAO/landworks-grants-program">EnterDAO GitHub</a> repository which we have
            created for all scenes part of the program.
          </p>
        </li>
        <li>
          All scenes will also be available in LandWorks’s scene pool later on as it is currently under development.
        </li>
      </NumberedList>

      <StyledImage src={Flow} alt="flow" />
    </div>
  );
};
