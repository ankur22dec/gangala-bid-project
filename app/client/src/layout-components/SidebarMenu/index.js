import React, { useState } from 'react';
import {
  Award,
  ChevronRight,
  Home,
  MessageCircle,
  Settings,
  User,
  Heart
} from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AuctionIcon from '../../assets/images/icons_Light/auction.png';
import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import { useTranslation } from 'react-i18next';

const SidebarMenu = (props) => {
  const { t, i18n } = useTranslation();
  const { setSidebarToggleMobile, user } = props;

  const toggleSidebarMobile = () => setSidebarToggleMobile(true);

  const [pagesOpen, setPagesOpen] = useState(false);
  const togglePages = (event) => {
    setPagesOpen(!pagesOpen);
    event.preventDefault();
  };

  return (
    <>
      <PerfectScrollbar>
        <div className="sidebar-navigation">
          <div className="sidebar-header">
            <span className="text-primary">{t("sidebar.Navigation")}</span>
          </div>
          <ul>
            <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple text-primary"
                to="/Homepage">
                <span className="sidebar-icon">
                  <Home style={{ color: '#fe9901' }} />
                </span>
                {t("sidebar.Homepage")}
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRight />
                </span>
              </NavLink>
            </li>
            {user && user.seller && (
              <li>
                <NavLink
                  onClick={toggleSidebarMobile}
                  activeClassName="active"
                  className="nav-link-simple text-primary"
                  to="/Profile">
                  <span className="sidebar-icon">
                    <User style={{ color: '#fe9901' }} />
                  </span>
                  {t('sidebar.My_Profile')}
                  <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                    <ChevronRight />
                  </span>
                </NavLink>
              </li>
            )}
            {user && !user.seller && (
              <li>
                <NavLink
                  onClick={toggleSidebarMobile}
                  activeClassName="active"
                  className="nav-link-simple text-primary"
                  to="/Userprofile">
                  <span className="sidebar-icon">
                    <User style={{ color: '#fe9901' }} />
                  </span>
                  {t('sidebar.My_Profile')}
                  <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                    <ChevronRight />
                  </span>
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink
                  onClick={toggleSidebarMobile}
                  activeClassName="active"
                  className="nav-link-simple text-primary"
                  to="/Wishlist">
                  <span className="sidebar-icon">
                    <Heart style={{ color: '#fe9901' }} />
                  </span>
                  {t("sidebar.Wishlist")}
                  <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                    <ChevronRight />
                  </span>
                </NavLink>
              </li>
            )}

            {/* <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple text-primary"
                to="/Dashboard">
                <span className="sidebar-icon">
                  <img src={DashboardIcon} alt="Dashboard" />
                </span>
                Dashboard
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRight />
                </span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple text-primary"
                to="/Orders">
                <span className="sidebar-icon">
                  <img src={PurchaseIcon} alt="..." />
                </span>
                My Purchases
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRight />
                </span>
              </NavLink>
            </li> */}
            <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple text-primary"
                to="/ChatBot">
                <span className="sidebar-icon">
                  {/* <img src={LiveChatIcon} alt="..." /> */}
                  <MessageCircle style={{ color: '#fe9901' }} />
                </span>
                {t("sidebar.Chat_Bot")}
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRight />
                </span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple text-primary"
                to="/Chat">
                <span className="sidebar-icon">
                  <img src={LiveChatIcon} alt="..." />
                </span>
                Chats
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRight />
                </span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple text-primary"
                to="/Acution">
                <span className="sidebar-icon">
                  <Briefcase />
                </span>
                My Auction
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRight />
                </span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple text-primary"
                to="/Customers">
                <span className="sidebar-icon">
                  <Users />
                </span>
                My Reservation
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRight />
                </span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple text-primary"
                to="/Transactions">
                <span className="sidebar-icon">
                  <Filter />
                </span>
                My Assets
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRight />
                </span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple text-primary"
                to="/Transactions">
                <span className="sidebar-icon">
                  <Filter />
                </span>
                My Wishlist
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRight />
                </span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple text-primary"
                to="/Checkout">
                <span className="sidebar-icon">
                  <Filter />
                </span>
                Checkout
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRight />
                </span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple text-primary"
                to="/Wallets">
                <span className="sidebar-icon">
                  <Briefcase />
                </span>
                Wallets
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRight />
                </span>
              </NavLink>
            </li> */}
            <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple text-primary"
                to="/NewAcution">
                <span className="sidebar-icon">
                  <Settings style={{ color: '#fe9901' }} />
                  <img src={AuctionIcon} />
                </span>
                {t("sidebar.New_Auction")}
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRight />
                </span>
              </NavLink>
            </li>
          </ul>
          {/* <div className="sidebar-header text-primary">
            <span>Others</span>
          </div> */}
          {/* <ul>
            <li>
              <a
                href="#/"
                onClick={togglePages}
                className={clsx({ active: pagesOpen })}>
                <span className="sidebar-icon">
                  <Columns />
                </span>
                <span className="sidebar-item-label text-primary">
                  User Pages
                </span>
                <span className="sidebar-icon-indicator">
                  <ChevronRight />
                </span>
              </a>
              <Collapse isOpen={pagesOpen}>
                <ul>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/PageLoginIllustration">
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/seller-registration">
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/PageRecoverIllustration">
                      Recover Password
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/PageError404">
                      Error 404
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul> */}
        </div>
      </PerfectScrollbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  user: state.appReducer.user
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
