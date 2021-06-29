import React from 'react';
import FormsSteppers1 from '../../components/FormsSteppers/FormsSteppers1';
import { ExampleWrapperSeamless, PageTitle } from '../../layout-components';
import { useTranslation } from 'react-i18next';

export default function FormsSteppers() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <PageTitle
        titleHeading={t("newauction.Auction")}
        titleDescription={t("newauction.pageDescription")}
      />

      <ExampleWrapperSeamless>
        <FormsSteppers1 />
      </ExampleWrapperSeamless>
    </>
  );
}
