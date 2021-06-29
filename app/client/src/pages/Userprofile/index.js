import React from 'react';

import { PageTitle } from '../../layout-components';

import UserProfile from '../PageProfile/userProfile';
export default function Userprofile() {
  return (
    <>
      <PageTitle
        titleHeading="Profile"
        titleDescription="User Profile"></PageTitle>
      <UserProfile />
    </>
  );
}
