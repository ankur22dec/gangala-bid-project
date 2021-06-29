import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';

const OrdersPageTitleActions = () => {
  return (
    <>
      <Button color="primary">
        <span className="btn-wrapper--icon">
          <FontAwesomeIcon icon={['fas', 'plus']} />
        </span>
        <span className="btn-wrapper--label">Add Order</span>
      </Button>
    </>
  );
};

export default OrdersPageTitleActions;
