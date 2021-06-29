import React from 'react';
import Products1 from '../../components/Products/Products1';
import ProductsPageTitleActions from '../../components/Products/ProductsPageTitleActions';
import { PageTitle } from '../../layout-components';

export default function Products() {
  return (
    <>
      <PageTitle
        titleHeading="Products"
        titleDescription="Multiple types of products listings available.">
        <ProductsPageTitleActions />
      </PageTitle>

      <Products1 />
    </>
  );
}
