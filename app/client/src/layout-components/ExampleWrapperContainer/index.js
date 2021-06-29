import React from 'react';

import { Container } from 'reactstrap';

const ExampleWrapperContainer = (props) => {
  const { sectionHeading, children } = props;

  return (
    <div className="example-card-container mb-5">
      <Container>
        {sectionHeading && (
          <h5 className="display-4 mb-4 font-weight-bold">{sectionHeading}</h5>
        )}
        {children}
      </Container>
    </div>
  );
};

export default ExampleWrapperContainer;
