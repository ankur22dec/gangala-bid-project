import React from 'react';

const ExampleWrapperSeamless = (props) => {
  const { sectionHeading, children } = props;

  return (
    <div className="example-card-seamless mb-5">
      {sectionHeading && (
        <h5 className="display-4 mb-4 font-weight-bold">{sectionHeading}</h5>
      )}
      {children}
    </div>
  );
};

export default ExampleWrapperSeamless;
