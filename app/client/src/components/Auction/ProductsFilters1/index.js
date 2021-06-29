import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import {
  Row,
  Col,
  Card,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';

import Chart from 'react-apexcharts';
import Select from 'react-select';
import hero8 from '../../../assets/images/hero-bg/hero-7.jpg';
import { connect } from 'react-redux';

import {
  Settings,
  Filter,
  ArrowDownCircle,
  ArrowUpCircle,
  Circle
} from 'react-feather';

//Action
import { getProduct } from '../../../Action/appAction';
import { ClimbingBoxLoader } from 'react-spinners';

import CommerceHeader from '../../Homepage/Homepage1/CommerceHeader.js';
import HomepageFooter from '../../Homepage/Homepage6';

import AuctionList from '../AuctionList';

function LivePreviewExample({ getProduct, product }) {
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
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image bg-composed-filter-rm opacity-8"
            style={{ backgroundImage: 'url(' + hero8 + ')' }}
          />
          <div className="bg-composed-wrapper--content">
            <Container className="text-black text-center py-0 py-lg-5 z-over">
              <Row className="py-5">
                <Col lg="10" xl="7" className="mx-auto pb-5">
                  <div className="font-size-xs text-first pb-3 text-uppercase font-weight-bold">
                    Auction
                  </div>
                  <h3 className="display-2 font-weight-bold mb-3">
                    All Auction
                  </h3>
                  <p className="text-black-50 line-height-2 font-size-xl px-3 pb-5 px-xl-5 mb-0">
                    All components from the General dashboard template can be
                    used in the individual applications pages, without
                    modifications.
                  </p>
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
        </div>
      </div>
      <Container className="py-5">
        <Card className="shadow-xxl px-2 mb-5">
          <div className="nav-line d-flex align-items-center justify-content-between nav-tabs-primary">
            <div>
              <UncontrolledDropdown>
                <DropdownToggle
                  size="sm"
                  color="primary"
                  className="d-40 btn-pill btn-icon p-0 d-flex align-items-center justify-content-center">
                  <Filter className="w-50" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-xxl p-0">
                  <div className="p-3">
                    <Row>
                      <Col md="6">
                        <small className="font-weight-bold pb-2 text-uppercase text-primary d-block">
                          Category
                        </small>
                        <Select
                          placeholder="Select..."
                          options={categoriesOptions}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: '0.29rem',
                            borderWidth: 1,
                            colors: {
                              ...theme.colors,
                              primary25: 'rgba(60,68,177,0.15)',
                              primary50: 'rgba(60,68,177,0.15)',
                              primary: '#3c44b1'
                            }
                          })}
                        />
                      </Col>
                      <Col md="6">
                        <small className="font-weight-bold pb-2 text-uppercase text-primary d-block">
                          Stock
                        </small>
                        <Select
                          placeholder="Select..."
                          options={stockOptions}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: '0.29rem',
                            borderWidth: 1,
                            colors: {
                              ...theme.colors,
                              primary25: 'rgba(60,68,177,0.15)',
                              primary50: 'rgba(60,68,177,0.15)',
                              primary: '#3c44b1'
                            }
                          })}
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className="divider" />
                  <div className="p-3 text-center rounded-bottom bg-secondary">
                    <Button color="primary" size="sm">
                      Filter results
                    </Button>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <Nav className="nav-line border-0">
              <NavItem className="px-3">
                {/* <NavLinkStrap
                  className={clsx('px-0 py-3 m-0 h-auto d-block', {
                    active: activeTab === '1'
                  })}
                  onClick={() => {
                    toggle('1');
                  }}>
                  <span className="font-size-sm font-weight-bold">Latest</span>
                  <div className="divider left-0 w-100" />
                </NavLinkStrap> */}
              </NavItem>
              <NavItem className="px-3">
                {/* <NavLinkStrap
                  className={clsx('px-0 py-3 m-0 h-auto d-block', {
                    active: activeTab === '2'
                  })}
                  onClick={() => {
                    toggle('2');
                  }}>
                  <span className="font-size-sm font-weight-bold">Popular</span>
                  <div className="divider left-0 w-100" />
                </NavLinkStrap> */}
              </NavItem>
              <NavItem className="px-3">
                <NavLinkStrap
                  className={clsx('px-0 py-3 m-0 h-auto d-block', {
                    active: activeTab === '1'
                  })}
                  onClick={() => {
                    toggle('');
                  }}>
                  <span className="font-size-sm font-weight-bold">
                    New Arrivals
                  </span>
                  <div className="divider left-0 w-100" />
                </NavLinkStrap>
              </NavItem>
            </Nav>
            <div>
              <UncontrolledDropdown>
                <DropdownToggle
                  size="sm"
                  color="primary"
                  className="d-40 btn-pill btn-icon p-0 d-flex align-items-center justify-content-center">
                  <Settings className="w-50" />
                </DropdownToggle>
                <DropdownMenu
                  right
                  className="dropdown-menu-lg overflow-hidden p-0">
                  <div className="font-weight-bold px-4 pt-3">Results</div>
                  <Nav className="nav-neutral-first nav-pills-rounded flex-column p-2">
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Circle />
                        </div>
                        <span className="font-size-md">
                          <b>10</b> results per page
                        </span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Circle />
                        </div>
                        <span className="font-size-md">
                          <b>20</b> results per page
                        </span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Circle />
                        </div>
                        <span className="font-size-md">
                          <b>30</b> results per page
                        </span>
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                  <div className="divider" />
                  <div className="font-weight-bold px-4 pt-4">Order</div>
                  <Nav className="nav-neutral-first nav-pills-rounded flex-column p-2">
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <ArrowUpCircle />
                        </div>
                        <span className="font-size-md">Ascending</span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <ArrowDownCircle />
                        </div>
                        <span className="font-size-md">Descending</span>
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
        </Card>
        <TabContent className="mb-5" activeTab={activeTab}>
          <TabPane tabId="1">
            <AuctionList product={product} />
          </TabPane>
        </TabContent>
      </Container>
      <HomepageFooter />
    </>
  );
}
const mapStateToProps = (state) => ({
  product: state.appReducer.product
});
export default connect(mapStateToProps, { getProduct })(LivePreviewExample);
