import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';

const SettingsPageTitleActions = () => {
  return (
    <>
      <Button size="large" outline className="font-weight-bold" color="danger">
        <span className="btn-wrapper--icon">
          <FontAwesomeIcon icon={['fas', 'times']} />
        </span>
        <span className="btn-wrapper--label">Close Account</span>
      </Button>
    </>
  );
};

export default SettingsPageTitleActions;
