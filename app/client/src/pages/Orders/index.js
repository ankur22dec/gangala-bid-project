import React from 'react';

import { PageTitle } from '../../layout-components';

import Orders1 from '../../components/Orders/Orders1';
import OrdersPageTitleActions from '../../components/Orders/OrdersPageTitleActions';
export default function Orders() {
  return (
    <>
      <PageTitle
        titleHeading="Orders"
        titleDescription="Manage your orders with ease using this template.">
        <OrdersPageTitleActions />
      </PageTitle>

      <Orders1 />
    </>
  );
}
