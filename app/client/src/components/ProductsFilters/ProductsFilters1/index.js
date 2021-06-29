import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { Container } from 'reactstrap';
//Action
import { getProduct } from '../../../Action/appAction';
import CommerceHeader from '../../Homepage/Homepage1/CommerceHeader.js';
import Products1 from '../../Products/Products1';

function LivePreviewExample({
  product,
  totalProduct,
  getProduct,
  minPrice,
  maxPrice
}) {
  let history = useHistory();
  const par = useParams();
  useEffect(() => {
    const runAction = async () => {
      setproductLoading(false);
      await getProduct(par.id - 1, minPrice, maxPrice);
      setproductLoading(true);
    };
    runAction();
    return () => {
      runAction();
    };
  }, []);

  const SuspenseLoading = () => {
    return (
      <>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4">
            <CircleLoader color={'#fe9901'} loading={true} />
          </div>
          <div className="text-muted font-size-xl text-center pt-3">
            Please waith while we load a page
            <span className="font-size-lg d-block text-dark"></span>
          </div>
        </div>
      </>
    );
  };
  const [productLoading, setproductLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  if (!productLoading) return <SuspenseLoading />;
  const categoriesOptions = [
    { value: 'all', label: 'All categories' },
    { value: 'laptop', label: 'Laptops' },
    { value: 'mobile', label: 'Mobile Phones' },
    { value: 'tablets', label: 'Tablets' },
    { value: 'audio', label: 'Audio Devices' },
    { value: 'video', label: 'Video Cameras' }
  ];

  const stockOptions = [
    { value: 'any', label: 'Any' },
    { value: 'out', label: 'Out of Stock' },
    { value: 'in', label: 'In Stock' }
  ];

  const chartHomepage1AOptions = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    tooltip: {
      enabled: false
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      color: '#4191ff',
      curve: 'smooth',
      width: 3
    },
    colors: ['#4191ff'],
    fill: {
      color: '#4191ff',
      opacity: 0.1,
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      crosshairs: {
        width: 1
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartHomepage1AData = [
    {
      name: 'USD Price:',
      data: [81, 76, 87, 91, 47, 38, 56, 24, 45, 65, 72, 93, 110, 115, 125]
    }
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-white">
        {/* <div className="header-top-section pb-2">
          <CommerceHeader />
        </div> */}
        {/* <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image bg-composed-filter-rm opacity-8"
            style={{ backgroundImage: 'url(' + hero8 + ')' }}
          />
          <div className="bg-composed-wrapper--content">
            <Container className="text-black text-center py-0 py-lg-5 z-over">
              <Row className="py-5">
                <Col lg="10" xl="7" className="mx-auto pb-5">
                  <div className="font-size-xs text-first pb-3 text-uppercase font-weight-bold">
                    Products
                  </div>
                  <h3 className="display-2 font-weight-bold mb-3">
                    Products Shop
                  </h3>
                </Col>
              </Row>
            </Container>
            <div className="shadow-container-blocks-2 opacity-4 z-below">
              <Chart
                options={chartHomepage1AOptions}
                series={chartHomepage1AData}
                type="area"
                height={300}
              />
            </div>
          </div>
        </div> */}
      </div>
      <Container className="py-5">
        <Products1 product={product} totalProducts={totalProduct} />
      </Container>
      {/* <HomepageFooter /> */}
    </>
  );
}
const mapStateToProps = (state) => ({
  product: state.appReducer.product,
  totalProduct: state.appReducer.totalProducts,
  minPrice: state.appReducer.productMin,
  maxPrice: state.appReducer.productMax
});
export default connect(mapStateToProps, { getProduct })(LivePreviewExample);
