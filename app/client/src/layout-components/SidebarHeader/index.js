/* eslint-disable no-unused-vars */
import React from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UncontrolledTooltip } from 'reactstrap';

import { connect } from 'react-redux';

import {
  setSidebarToggle,
  setSidebarToggleMobile
} from '../../reducers/ThemeOptions';

const SidebarHeader = (props) => {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const toggleSidebar = () => {
    setSidebarToggle(true);
  };
  const {
    sidebarToggleMobile,
    setSidebarToggleMobile,

    sidebarToggle,
    setSidebarToggle
  } = props;

  return (
    <>
      <div style={{ marginTop: '-34px' }} className="app-sidebar--header">
        <button
          onClick={toggleSidebar}
          className="btn btn-sm collapse-sidebar-btn"
          id="CollapseSidebarTooltip">
          <FontAwesomeIcon icon={['far', 'dot-circle']} size="lg" />
        </button>
        <UncontrolledTooltip
          target="CollapseSidebarTooltip"
          container=".app-sidebar"
          placement="right">
          Collapse sidebar
        </UncontrolledTooltip>
        <button
          className={clsx(
            'navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn',
            { 'is-active': sidebarToggleMobile }
          )}
          onClick={toggleSidebarMobile}>
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggle: (enable) => dispatch(setSidebarToggle(enable)),
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeader);
