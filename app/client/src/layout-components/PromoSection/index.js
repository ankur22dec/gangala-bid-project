import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UncontrolledPopover, UncontrolledTooltip, Button } from 'reactstrap';

const PromoSection = () => {
  return (
    <>
      <div className="promo-section-wrapper">
        <div className="promo-section-buttons-wrapper">
          <div className="promo-section-buttons">
            <span id="StayUpdatedTooltip">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                id="sharePopover"
                className="d-50 transition-none bg-neutral-first text-first p-0 d-inline-block shadow-none text-center rounded-sm">
                <FontAwesomeIcon
                  icon={['fas', 'share-square']}
                  className="font-size-lg"
                />
              </a>
            </span>
            <a
              className="d-50 transition-none bg-neutral-danger text-danger my-1 p-0 d-inline-block shadow-none text-center rounded-sm"
              href="https://docs.uifort.com/bamburgh-react-commerce-application-reactstrap-pro-docs"
              rel="noopener noreferrer"
              target="_blank"
              id="ViewDocsTooltip">
              <FontAwesomeIcon
                icon={['far', 'life-ring']}
                className="font-size-lg"
              />
            </a>
            <a
              className="d-50 transition-none bg-neutral-success text-success p-0 d-inline-block shadow-none text-center rounded-sm"
              href="https://uifort.com/template/bamburgh-react-commerce-application-reactstrap-pro"
              rel="noopener noreferrer"
              target="_blank"
              id="ProductLandingTooltip">
              <FontAwesomeIcon
                icon={['fas', 'info-circle']}
                className="font-size-lg"
              />
            </a>
            <UncontrolledTooltip
              target="StayUpdatedTooltip"
              container=".promo-section-buttons"
              placement="left"
              popperClassName="text-nowrap">
              Stay up to date
            </UncontrolledTooltip>
            <UncontrolledTooltip
              target="ProductLandingTooltip"
              container=".promo-section-buttons"
              placement="left"
              popperClassName="text-nowrap">
              View product details
            </UncontrolledTooltip>
            <UncontrolledTooltip
              target="ViewDocsTooltip"
              container=".promo-section-buttons"
              placement="left"
              popperClassName="text-nowrap">
              View documentation
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <UncontrolledPopover
        trigger="legacy"
        target="sharePopover"
        placement="left"
        container=".promo-section-wrapper"
        popperClassName="py-3"
        className="popover-share-box popover-custom-wrapper popover-custom-xl">
        <div className="px-5 font-size-lg pb-3 text-center pt-1 font-weight-bold">
          Subscribe to stay up to date with our latest releases and updates!
        </div>
        <div className="text-center">
          <Button
            tag="a"
            className="m-2 d-40 p-0 rounded-sm"
            color="facebook"
            href="https://www.facebook.com/UiFort"
            rel="nofollow"
            target="_blank"
            id="btnFacebookTooltip">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'facebook']}
                className="font-size-lg"
              />
            </span>
          </Button>
          <UncontrolledTooltip
            target="btnFacebookTooltip"
            container=".promo-section-wrapper">
            Facebook
          </UncontrolledTooltip>
          <Button
            tag="a"
            className="m-2 d-40 p-0 rounded-sm"
            color="twitter"
            href="https://twitter.com/uifort1"
            rel="nofollow"
            target="_blank"
            id="btnTwitterTooltip">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'twitter']}
                className="font-size-lg"
              />
            </span>
          </Button>
          <UncontrolledTooltip
            target="btnTwitterTooltip"
            container=".promo-section-wrapper">
            Twitter
          </UncontrolledTooltip>
          <Button
            tag="a"
            className="m-2 d-40 p-0 rounded-sm"
            color="instagram"
            href="https://www.instagram.com/uifort1"
            rel="nofollow"
            target="_blank"
            id="btnInstagramTooltip">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'instagram']}
                className="font-size-lg"
              />
            </span>
          </Button>
          <UncontrolledTooltip
            target="btnInstagramTooltip"
            container=".promo-section-wrapper">
            Instagram
          </UncontrolledTooltip>
          <Button
            tag="a"
            className="m-2 d-40 p-0 rounded-sm"
            color="discord"
            href="https://discord.gg/mddFBQX"
            rel="nofollow"
            target="_blank"
            id="btnDiscordTooltip">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'discord']}
                className="font-size-lg"
              />
            </span>
          </Button>
          <UncontrolledTooltip
            target="btnDiscordTooltip"
            container=".promo-section-wrapper">
            Discord
          </UncontrolledTooltip>
          <Button
            tag="a"
            className="m-2 d-40 p-0 rounded-sm"
            color="dribbble"
            href="https://dribbble.com/UiFort"
            rel="nofollow"
            target="_blank"
            id="btnDribbbleTooltip">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'dribbble']}
                className="font-size-lg"
              />
            </span>
          </Button>
          <UncontrolledTooltip
            target="btnDribbbleTooltip"
            container=".promo-section-wrapper">
            Dribbble
          </UncontrolledTooltip>
          <Button
            tag="a"
            className="m-2 d-40 p-0 rounded-sm"
            color="github"
            href="https://github.com/uifort"
            rel="nofollow"
            target="_blank"
            id="btnGithubTooltip">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'github']}
                className="font-size-lg"
              />
            </span>
          </Button>
          <UncontrolledTooltip
            target="btnGithubTooltip"
            container=".promo-section-wrapper">
            Github
          </UncontrolledTooltip>
        </div>
        <div className="divider my-3" />
        <div className="text-center">
          <Button
            tag="a"
            size="sm"
            outline
            color="primary"
            href="https://uifort.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Powerful admin dashboard templates & ui kits that are easy to use and customize.">
            <span className="btn-wrapper--label">Visit UiFort.com</span>
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['fas', 'arrow-right']} />
            </span>
          </Button>
        </div>
      </UncontrolledPopover>
    </>
  );
};

export default PromoSection;
