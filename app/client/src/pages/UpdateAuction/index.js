import React from 'react';

import { PageTitle } from '../../layout-components';

import Settings1 from '../../components/UpdateAuction/Settings1';
export default function UpdateAuction() {
  return (
    <>
      <PageTitle
        titleHeading="Auction"
        titleDescription="Confrim your Personal details and Auciton"></PageTitle>

      <Settings1 />
    </>
  );
}
