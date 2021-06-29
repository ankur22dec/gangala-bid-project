import React from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Nav, NavItem } from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { connect } from 'react-redux';

const Footer = (props) => {
  const { footerShadow, footerBgTransparent } = props;
  const { t, i18n } = useTranslation();
  return (
    <>
      <div
        className={clsx('app-footer text-black-50', {
          'app-footer--shadow': footerShadow,
          'app-footer--opacity-bg': footerBgTransparent
        })}>
        <div className="app-footer--first">
          <Nav>
            <NavItem>
              <NavLinkStrap tag={Link} to="/Homepage" className="rounded-sm">
                {t("footer.Home")}
              </NavLinkStrap>
            </NavItem>
            <NavItem>
              <NavLinkStrap tag={Link} to="/Shop/1" className="rounded-sm">
                {t('footer.Products')}
              </NavLinkStrap>
            </NavItem>
            <NavItem>
              <NavLinkStrap className="rounded-sm">
                <a
                  style={{ color: '#7a7b97' }}
                  href="https://portal.gangala.in/tou"
                  target="_blank">
                  {t("footer.Terms_And_Conditions")}
                </a>
              </NavLinkStrap>
            </NavItem>
            <NavItem>
              <NavLinkStrap className="rounded-sm">
                <a
                  style={{ color: '#7a7b97' }}
                  href="https://portal.gangala.in/tou"
                  target="_blank">
                  {t("footer.Privacy_Policy")}
                </a>
              </NavLinkStrap>
            </NavItem>
          </Nav>
        </div>
        <div className="app-footer--second">
          <span>{t("footer.Copyright")} </span> © {t("footer.Copyright1")}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  footerFixed: state.ThemeOptions.footerFixed,
  footerShadow: state.ThemeOptions.footerShadow,
  footerBgTransparent: state.ThemeOptions.footerBgTransparent
});

export default connect(mapStateToProps)(Footer);
