import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row,
  Table,
  Col,
  Card,
  CustomInput,
  Input,
  Badge,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';

import Select from 'react-select';
import RcPagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_US';

import {
  Settings,
  Filter,
  Trash,
  Save,
  ArrowDownCircle,
  ArrowUpCircle,
  Circle
} from 'react-feather';

import product1 from '../../../assets/images/stock-products/product-1.png';
import product2 from '../../../assets/images/stock-products/product-2.png';
import product3 from '../../../assets/images/stock-products/product-3.png';
import product4 from '../../../assets/images/stock-products/product-4.png';

export default function LivePreviewExample() {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  const statusOptions = [
    { value: 'any', label: 'All statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'processing', label: 'Processing' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <>
      <Card className="card-box shadow-none mb-5">
        <div className="d-flex justify-content-between px-4 py-3">
          <div
            className={clsx(
              'search-wrapper search-wrapper--alternate search-wrapper--grow',
              { 'is-active': searchOpen }
            )}>
            <span className="icon-wrapper text-black">
              <FontAwesomeIcon icon={['fas', 'search']} />
            </span>
            <Input
              type="search"
              onFocus={openSearch}
              onBlur={closeSearch}
              placeholder="Search orders..."
            />
          </div>
          <div className="d-flex align-items-center">
            <UncontrolledDropdown>
              <DropdownToggle
                outline
                color="primary"
                className="d-flex align-items-center justify-content-center d-40 mr-2 p-0 rounded-pill">
                <Filter className="w-50" />
              </DropdownToggle>
              <DropdownMenu right className="dropdown-menu-xxl p-0">
                <div className="p-3">
                  <Row>
                    <Col md="12">
                      <small className="font-weight-bold pb-2 text-uppercase text-primary d-block">
                        Status
                      </small>
                      <Select
                        placeholder="Select..."
                        options={statusOptions}
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
                <div className="p-3 text-center bg-secondary">
                  <Button color="primary" size="sm">
                    Filter results
                  </Button>
                </div>
                <div className="divider" />
                <div className="p-3">
                  <Row>
                    <Col md="6">
                      <Nav className="nav-neutral-danger flex-column p-0">
                        <NavItem>
                          <NavLinkStrap
                            className="d-flex rounded-sm justify-content-center"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            <div className="nav-link-icon">
                              <Trash />
                            </div>
                            <span>Cancel</span>
                          </NavLinkStrap>
                        </NavItem>
                      </Nav>
                    </Col>
                    <Col md="6">
                      <Nav className="nav-neutral-success flex-column p-0">
                        <NavItem>
                          <NavLinkStrap
                            className="d-flex rounded-sm justify-content-center"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            <div className="nav-link-icon">
                              <Save />
                            </div>
                            <span>Save filter</span>
                          </NavLinkStrap>
                        </NavItem>
                      </Nav>
                    </Col>
                  </Row>
                </div>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown>
              <DropdownToggle
                outline
                color="primary"
                className="d-flex align-items-center justify-content-center d-40 p-0 rounded-pill">
                <Settings className="w-50" />
              </DropdownToggle>
              <DropdownMenu
                right
                className="dropdown-menu-lg overflow-hidden p-0">
                <div className="font-weight-bold px-4 pt-3">Results</div>
                <Nav className="nav-neutral-first nav-pills-rounded flex-column p-2">
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <Circle />
                      </div>
                      <span className="font-size-md">
                        <b>10</b> results per page
                      </span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <Circle />
                      </div>
                      <span className="font-size-md">
                        <b>20</b> results per page
                      </span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
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
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <ArrowUpCircle />
                      </div>
                      <span className="font-size-md">Ascending</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
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
        <div className="divider" />
        <div className="p-4">
          <div className="table-responsive-md">
            <Table className="table-alternate-spaced mb-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{ width: '50px' }}
                    className="pb-4 text-center">
                    <CustomInput
                      type="checkbox"
                      id="CustomCheckbox123"
                      className="ml-3"
                      label="&nbsp;"
                    />
                  </th>
                  <th
                    style={{ width: '110px' }}
                    className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark text-center"
                    scope="col">
                    Order
                  </th>
                  <th
                    style={{ width: '300px' }}
                    className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                    scope="col">
                    Client
                  </th>
                  <th
                    className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                    scope="col">
                    Product
                  </th>
                  <th
                    className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                    scope="col">
                    Status
                  </th>
                  <th
                    className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                    scope="col">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center text-black-50">
                    <CustomInput
                      type="checkbox"
                      id="CustomCheckbox1"
                      className="ml-3"
                      label="&nbsp;"
                    />
                  </td>
                  <td className="text-center">
                    <span className="font-weight-bold">#954</span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper avatar-initials mr-3">
                        <div className="avatar-icon text-white bg-neutral-dark text-dark font-size-sm d-50 font-weight-bold">
                          SW
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Shanelle Wynn
                        </a>
                        <span className="text-black-50 d-block">
                          Customer since 2019
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="#/" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="hover-scale-lg rounded-sm"
                          src={product1}
                          style={{ width: 90 }}
                        />
                      </a>
                      <div className="pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Apple TV Gen. 4
                        </a>
                        <span className="text-black-50 d-block">
                          In stock: <b>23</b>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge
                      className="px-4 py-1 h-auto text-success border-1 border-success"
                      color="neutral-success">
                      Completed
                    </Badge>
                  </td>
                  <td className="font-size-lg font-weight-bold">
                    <small>$</small>
                    <span>2,495</span>
                  </td>
                  <td className="text-right">
                    <Button
                      color="primary"
                      className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'search']}
                        className="font-size-sm"
                      />
                    </Button>
                    <Button
                      color="first"
                      className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['far', 'edit']}
                        className="font-size-sm"
                      />
                    </Button>
                    <Button
                      color="danger"
                      className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'times']}
                        className="font-size-sm"
                      />
                    </Button>
                  </td>
                </tr>
                <tr className="divider"></tr>
                <tr>
                  <td className="text-center text-black-50">
                    <CustomInput
                      type="checkbox"
                      id="CustomCheckbox2"
                      className="ml-3"
                      label="&nbsp;"
                    />
                  </td>
                  <td className="text-center">
                    <span className="font-weight-bold">#955</span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper avatar-initials mr-3">
                        <div className="avatar-icon text-white bg-neutral-dark text-dark font-size-sm d-50 font-weight-bold">
                          BC
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Brax Childs
                        </a>
                        <span className="text-black-50 d-block">
                          Customer since 2019
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="#/" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="hover-scale-lg rounded-sm"
                          src={product2}
                          style={{ width: 90 }}
                        />
                      </a>
                      <div className="pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          iPhone 11 PRO Max
                        </a>
                        <span className="text-black-50 d-block">
                          In stock: <b>5</b>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge
                      className="px-4 py-1 h-auto text-success border-1 border-success"
                      color="neutral-success">
                      Completed
                    </Badge>
                  </td>
                  <td className="font-size-lg font-weight-bold">
                    <small>$</small>
                    <span>$999</span>
                  </td>
                  <td className="text-right">
                    <Button
                      color="primary"
                      className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'search']}
                        className="font-size-sm"
                      />
                    </Button>
                    <Button
                      color="first"
                      className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['far', 'edit']}
                        className="font-size-sm"
                      />
                    </Button>
                    <Button
                      color="danger"
                      className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'times']}
                        className="font-size-sm"
                      />
                    </Button>
                  </td>
                </tr>
                <tr className="divider"></tr>
                <tr>
                  <td className="text-center text-black-50">
                    <CustomInput
                      type="checkbox"
                      id="CustomCheckbox3"
                      className="ml-3"
                      label="&nbsp;"
                    />
                  </td>
                  <td className="text-center">
                    <span className="font-weight-bold">#956</span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper avatar-initials mr-3">
                        <div className="avatar-icon text-white bg-neutral-dark text-dark font-size-sm d-50 font-weight-bold">
                          AW
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Amin Waller
                        </a>
                        <span className="text-black-50 d-block">
                          Customer since 2018
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="#/" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="hover-scale-lg rounded-sm"
                          src={product3}
                          style={{ width: 90 }}
                        />
                      </a>
                      <div className="pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Apple Macbook PRO 3
                        </a>
                        <span className="text-black-50 d-block">
                          In stock: <b>23</b>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge
                      className="px-4 py-1 h-auto text-danger border-1 border-danger"
                      color="neutral-success">
                      Failed
                    </Badge>
                  </td>
                  <td className="font-size-lg font-weight-bold">
                    <small>$</small>
                    <span>1999</span>
                  </td>
                  <td className="text-right">
                    <Button
                      color="primary"
                      className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'search']}
                        className="font-size-sm"
                      />
                    </Button>
                    <Button
                      color="first"
                      className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['far', 'edit']}
                        className="font-size-sm"
                      />
                    </Button>
                    <Button
                      color="danger"
                      className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'times']}
                        className="font-size-sm"
                      />
                    </Button>
                  </td>
                </tr>
                <tr className="divider"></tr>
                <tr>
                  <td className="text-center text-black-50">
                    <CustomInput
                      type="checkbox"
                      id="CustomCheckbox4"
                      className="ml-3"
                      label="&nbsp;"
                    />
                  </td>
                  <td className="text-center">
                    <span className="font-weight-bold">#957</span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper avatar-initials mr-3">
                        <div className="avatar-icon text-white bg-neutral-dark text-dark font-size-sm d-50 font-weight-bold">
                          GP
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Gerald Parker
                        </a>
                        <span className="text-black-50 d-block">
                          Customer since Feb 2020
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="#/" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="hover-scale-lg rounded-sm"
                          src={product4}
                          style={{ width: 90 }}
                        />
                      </a>
                      <div className="pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Professional Headphones
                        </a>
                        <span className="text-black-50 d-block">
                          In stock: <b>126</b>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge
                      className="px-4 py-1 h-auto text-success border-1 border-success"
                      color="neutral-success">
                      Completed
                    </Badge>
                  </td>
                  <td className="font-size-lg font-weight-bold">
                    <small>$</small>
                    <span>89</span>
                  </td>
                  <td className="text-right">
                    <Button
                      color="primary"
                      className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'search']}
                        className="font-size-sm"
                      />
                    </Button>
                    <Button
                      color="first"
                      className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['far', 'edit']}
                        className="font-size-sm"
                      />
                    </Button>
                    <Button
                      color="danger"
                      className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'times']}
                        className="font-size-sm"
                      />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center pt-3 mb-5">
          <RcPagination
            defaultPageSize={3}
            defaultCurrent={2}
            total={60}
            locale={localeInfo}
          />
        </div>
      </Card>
    </>
  );
}
