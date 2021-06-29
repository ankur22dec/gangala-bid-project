import React from 'react';
import DetailAuction from '../AuctionDetailPage';
import { ExampleWrapperSeamless, PageTitle } from '../../../layout-components';
import { useTranslation } from 'react-i18next';

export default function AuctionDetailTitle() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <PageTitle
        titleHeading={t('newauction.Auction Detail')}
        titleDescription={t('newauction.pageDescription')}
      />

      <ExampleWrapperSeamless>
        <DetailAuction />
      </ExampleWrapperSeamless>
    </>
  );
}
