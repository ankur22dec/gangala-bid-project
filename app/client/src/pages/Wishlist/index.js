import React from 'react';

import { PageTitle } from '../../layout-components';
import { useTranslation } from 'react-i18next';

import WishList from './Wishlist';
export default function Wishlist() {
    const { t, i18n } = useTranslation();
    return (
        <>
            <PageTitle
                titleHeading={t("wishlist.pageHeading")}
                titleDescription={t("wishlist.pageDescription")}>

            </PageTitle>
            <WishList />
        </>
    );
}
