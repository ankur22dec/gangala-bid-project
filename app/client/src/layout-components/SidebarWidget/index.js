import React from 'react';

import { Badge, Button } from 'reactstrap';

import { NavLink } from 'react-router-dom';

import product1 from '../../assets/images/stock-products/product-4.png';
import product2 from '../../assets/images/stock-products/product-5.png';
import product3 from '../../assets/images/stock-products/product-6.png';

import Chart from 'react-apexcharts';
const SidebarWidget = () => {
  const chartSidebarWidgetOptions = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      color: '#1bc943',
      curve: 'smooth',
      width: 2
    },
    colors: ['#1bc943'],
    fill: {
      color: '#1bc943',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.3,
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
        width: 0
      }
    },
    tooltip: {
      enabled: false
    },
    yaxis: {
      min: 0
    }
  };
  const chartSidebarWidgetData = [
    {
      name: 'Transactions',
      data: [47, 45, 54, 38, 56, 24, 65]
    }
  ];

  return (
    <>
      <div className="app-sidebar--widget">
        <div className="sidebar-header align-items-center font-weight-bold d-flex justify-content-between text-primary">
          <span className="text-white">Recent Orders</span>
          <div>
            <NavLink
              to="/Orders"
              className="text-capitalize font-weight-normal text-first"
              title="View all orders">
              See all
            </NavLink>
          </div>
        </div>
        <div className="app-sidebar-spacer">
          <div className="d-flex justify-content-between my-2">
            <div className="d-flex align-items-center">
              <div className="font-size-lg bg-white-10 rounded-sm">
                <img
                  alt="..."
                  className="card-img-top rounded-sm"
                  src={product1}
                  style={{ width: 50 }}
                />
              </div>
              <div className="text-left ml-2">
                <div className="d-flex align-items-center justify-content-between">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="text-white font-weight-bold">
                    Apple Macbook PRO
                  </a>
                  <Badge color="secondary" className="ml-2 text-white">
                    $1349
                  </Badge>
                </div>
                <div className="text-white opacity-4 font-size-xs">
                  25 mins ago
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between my-2">
            <div className="d-flex align-items-center">
              <div className="font-size-lg bg-white-10 rounded-sm">
                <img
                  alt="..."
                  className="card-img-top rounded-sm"
                  src={product3}
                  style={{ width: 50 }}
                />
              </div>
              <div className="text-left ml-2">
                <div className="d-flex align-items-center justify-content-between">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="text-white font-weight-bold">
                    iWatch Gen. 4
                  </a>
                  <Badge color="secondary" className="ml-2 text-white">
                    $199
                  </Badge>
                </div>
                <div className="text-white opacity-4 font-size-xs">
                  1 days ago
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between my-2">
            <div className="d-flex align-items-center">
              <div className="font-size-lg bg-white-10 rounded-sm">
                <img
                  alt="..."
                  className="card-img-top rounded-sm"
                  src={product2}
                  style={{ width: 50 }}
                />
              </div>
              <div className="text-left ml-2">
                <div className="d-flex align-items-center justify-content-between">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="text-white font-weight-bold">
                    Flexy Headphones Max
                  </a>
                  <Badge color="secondary" className="ml-2 text-white">
                    $99
                  </Badge>
                </div>
                <div className="text-white opacity-4 font-size-xs">
                  2 days ago
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar-widget-footer">
          <div className="sidebar-widget-btn">
            <Button
              tag={NavLink}
              to="/Orders"
              className="px-4 py-2 text-uppercase font-size-xs shadow-none"
              color="first"
              size="sm">
              <span className="px-1">All orders</span>
            </Button>
          </div>
          <div className="sidebar-chart-wrapper">
            <Chart
              options={chartSidebarWidgetOptions}
              series={chartSidebarWidgetData}
              type="area"
              height={90}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarWidget;
