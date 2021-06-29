import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../../Action/appAction';
import { ClimbingBoxLoader } from 'react-spinners';

import ProductsFilters1 from '../../components/Auction/ProductsFilters1';
function Customers() {
  useEffect(() => {
    const runAction = async () => {
      setproductLoading(false);
      await getProduct();
      setproductLoading(true);
    };
    runAction();
  }, []);
  const SuspenseLoading = () => {
    return (
      <>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4">
            <ClimbingBoxLoader color={'#3c44b1'} loading={true} />
          </div>
          <div className="text-muted font-size-xl text-center pt-3">
            {/* Please wait while we load the live preview examples */}
            Loading...
            <span className="font-size-lg d-block text-dark">
              {/* This live preview instance can be slower than a real production
              build! */}
            </span>
          </div>
        </div>
      </>
    );
  };
  const [productLoading, setproductLoading] = useState(false);
  if (!productLoading) return <SuspenseLoading />;
  return (
    <>
      <ProductsFilters1 />
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.appReducer.product
});
export default connect(mapStateToProps, {})(Customers);
