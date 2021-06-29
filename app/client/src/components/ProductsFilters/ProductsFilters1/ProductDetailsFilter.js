import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { Container } from 'reactstrap';
import { getProductDetails } from '../../../Action/appAction';
import CommerceHeader from '../../Homepage/Homepage1/CommerceHeader.js';
import ShowProductDetails from '../../Products/Products1/ShowProductDetails';

function ProductDetailsFilter(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  let params = useParams();
  useEffect(() => {
    if (params && params.id) {
      dispatch(getProductDetails(params.id));
    }
    setproductLoading(true);
  }, [false]);

  const SuspenseLoading = () => {
    return (
      <>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4">
            <CircleLoader color={'#fe9901'} loading={true} />
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
  const [activeTab, setActiveTab] = useState('1');

  if (!productLoading) return <SuspenseLoading />;

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
                                    <div className="font-size-xs text-first pb-3 text-uppercase font-weight-bold">Products</div>
                                    <h3 className="display-2 font-weight-bold mb-3">Product Details</h3>
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
        <ShowProductDetails />
      </Container>
      {/* <HomepageFooter /> */}
    </>
  );
}

export default ProductDetailsFilter;
