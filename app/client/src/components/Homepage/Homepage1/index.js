import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MetaTags from 'react-meta-tags';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { Carousel, CarouselControl, CarouselItem } from 'reactstrap';
import hero1 from '../../../assets/images/hero-bg/BannerHome.jpg';
import hero2 from '../../../assets/images/hero-bg/BannerHome1.jpg';
import hero2sp from '../../../assets/images/hero-bg/BannerHome1sp.jpg';
import hero3 from '../../../assets/images/hero-bg/BannerHome2.jpg';
import hero3sp from '../../../assets/images/hero-bg/BannerHome2sp.jpg';
import hero1sp from '../../../assets/images/hero-bg/BannerHomesp.jpg';
import ConsultantGif from '../../../assets/images/hero-bg/consultant-english-version.gif';
import ProductGif from '../../../assets/images/hero-bg/products-english-version.gif';
import ServiceGif from '../../../assets/images/hero-bg/services-english-version.gif';

import ConsultantGifSB from '../../../assets/images/hero-bg/3SV.gif';
import ProductGifSB from '../../../assets/images/hero-bg/1SV.gif';
import ServiceGifSB from '../../../assets/images/hero-bg/2SV.gif';

import './Styles.css';

export default function LivePreviewExample() {
  const { t, i18n } = useTranslation();

  const heroImg = '../../../assets/images/hero-bg/';
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const items = [
    {
      src: i18n.language == 'sb' ? hero1sp : hero1,
      altText: t('homepage.BUY_SMART'),
      caption: t('homepage.SAVE_TIME_AND_MONEY')
    },
    {
      src: i18n.language == 'sb' ? hero2sp : hero2,
      altText: t('homepage.BUY_LOCAL'),
      caption: t('homepage.SUPPORT_THE_COMMUNITY')
    },
    {
      src: i18n.language == 'sb' ? hero3sp : hero3,
      altText: t('homepage.GET_BIDS_TO_BUY'),
      caption: t('homepage.BECAUSE_CONVENTIONAL_IS_BORING')
    }
  ];
  const [selectedOption, setSelectedOption] = React.useState('product');
  const [searchResult, setSearchResult] = React.useState([]);
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const onBlur = () => {
    setTimeout(() => {
      setFocused(false);
    }, 1000);
  };
  const onSearchChange = (text) => {
    if (selectedOption == 'product') {
      setSearchLoading(true);
      console.log(text.target.value);
      axios
        .get('api/product/search/' + text.target.value)
        .then((result) => {
          console.log(result.data.data);
          setSearchResult(result.data.data);
          setSearchLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setSearchLoading(false);
        });
    }
    setSearchText(text.target.value);
  };

  const handleSelectedOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}>
        <div
          style={{
            position: 'absolute',
            textAlign: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)'
          }}
          className="pt-4 d-md-block d-none">
          <div className="display-1 font-weight-bold text-white">
            {item.altText}
          </div>
          <div className="display-4 text-white">{item.caption}</div>
        </div>
        <div
          style={{
            position: 'absolute',
            textAlign: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)'
          }}
          className="pt-4 d-block d-md-none">
          <div className="display-3 font-weight-bold text-white">
            {item.altText}
          </div>
          <div className="h5 text-white">{item.caption}</div>
        </div>
        {/* <div style={{position:"relative"}}> */}
        <img src={item.src} alt={item.altText} className="img-fluid" />
        {/* </div> */}
        {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
      </CarouselItem>
    );
  });
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-white">
        <MetaTags>
          <title>{t('homepage.title')}</title>
          <meta name="description" content={t('homepage.description')} />
          <meta name="robots" content="index, follow" />
          <meta name="keywords" content={t('homepage.keywords')} />
        </MetaTags>

        <div className="row">
          <div className="col-md-12 px-0">
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
              {slides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
                style={{ zIndex: 6 }}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
                style={{ zIndex: 6 }}
              />
            </Carousel>
            {/* <div className="">sdafjkhsadkfhksdj</div> */}
            <div className="row search-bar desktop-search">
              <div className="col-md-6 mx-auto">
                <div
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.0)',
                    borderRadius: 50
                  }}
                  className="py-3">
                  <div
                    className="mx-auto"
                    style={{ padding: '40px , 40px , 40px , 40px' }}>
                    <RadioGroup
                      row
                      aria-label="category"
                      value={selectedOption}
                      onChange={handleSelectedOptionChange}
                      style={{ justifyContent: 'center' }}>
                      <FormControlLabel
                        value="product"
                        control={<Radio style={{ color: 'white' }} />}
                        label={t('homepage.Products')}
                        style={{ color: 'white' }}
                      />
                      <FormControlLabel
                        value="consultation"
                        control={<Radio style={{ color: 'white' }} />}
                        label={t('homepage.Consultation')}
                        style={{ color: 'white' }}
                      />
                      <FormControlLabel
                        value="service"
                        control={<Radio style={{ color: 'white' }} />}
                        label={t('homepage.Services')}
                        style={{ color: 'white' }}
                      />
                    </RadioGroup>
                  </div>
                  <div className="mx-auto mt-3 search-box-main">
                    <div style={{ display: 'inline-block', width: '100%' }}>
                      <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: 50 }}
                        placeholder={t('homepage.Search_Here')}
                        onChange={(val) => onSearchChange(val)}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                      {focused && selectedOption === 'product' && (
                        <div
                          style={{
                            position: 'absolute',
                            overflow: 'auto',
                            width: '50rem',
                            maxHeight: 300
                          }}>
                          {searchLoading ? (
                            <div className="text-center bg-white py-2">
                              <PulseLoader
                                color={'var(--warning)'}
                                loading={true}
                              />
                            </div>
                          ) : (
                            <ul className="list-group">
                              {searchResult.map((data, index) => {
                                return (
                                  <a
                                    href="#/"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      history.push(
                                        '/productdetails/' + data._id
                                      );
                                    }}
                                    key={index}>
                                    <li className="list-group-item text-dark">
                                      {data.name}
                                    </li>
                                  </a>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="search-bar mobile-search bg-light p-3">
              <div className="">
                <div
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.0)',
                    borderRadius: 50
                  }}>
                  <div
                    className="mx-auto"
                  // style={{ padding: '40px , 40px , 40px , 40px' }}
                  >
                    <RadioGroup
                      row
                      aria-label="category"
                      value={selectedOption}
                      onChange={handleSelectedOptionChange}
                      style={{ justifyContent: 'center' }}>
                      <FormControlLabel
                        value="product"
                        control={<Radio style={{ color: '#3b3e66' }} />}
                        label="Products"
                        style={{ color: '#3b3e66' }}
                      />
                      <FormControlLabel
                        value="consultation"
                        control={<Radio style={{ color: '#3b3e66' }} />}
                        label="Consultation"
                        style={{ color: '#3b3e66' }}
                      />
                      <FormControlLabel
                        value="service"
                        control={<Radio style={{ color: '#3b3e66' }} />}
                        label="Services"
                        style={{ color: '#3b3e66' }}
                      />
                    </RadioGroup>
                  </div>
                  <div className="search-box-main">
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          borderRadius: 50,
                          width: '90%',
                          marginLeft: '5%'
                        }}
                        placeholder="Search Here"
                        onChange={(val) => onSearchChange(val)}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                      {focused && selectedOption == 'product' && (
                        <div
                          style={{
                            position: 'absolute',
                            overflow: 'auto',
                            width: '100%',
                            maxHeight: 200,
                            zIndex: 6,
                            left: 0
                          }}>
                          {searchLoading ? (
                            <div className="text-center bg-white">
                              <CircularProgress color="secondary" />{' '}
                            </div>
                          ) : (
                            <div style={{ width: '90%' }} className="mx-auto">
                              <ul class="list-group">
                                {searchResult.map((data, index) => {
                                  return (
                                    <a
                                      href="#/"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        history.push(
                                          '/productdetails/' + data._id
                                        );
                                      }}
                                      key={index}>
                                      <li class="list-group-item text-dark">
                                        {data.name}
                                      </li>
                                    </a>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 py-5 bg-white">
          <h1 className="text-center font-weight-bold">
            {t('homepage.GET_THE_BEST_DEALS')}{' '}
            <span style={{ color: 'rgb(255, 156, 0)' }}>
              {t('homepage.LOCALLY')}
            </span>
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-6 p-4">
          <img src={i18n.language == "sb" ? ProductGifSB : ProductGif} className="img-fluid" />
        </div>
        <div className="col-md-4 justify-content-center align-items-center d-flex">
          <h1 className="display-1 font-weight-bold">
            {t('homepage.PRODUCTS')}
          </h1>
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="row bg-white flex-column-reverse flex-md-row">
        <div className="col-md-1"></div>
        <div className="col-md-4 justify-content-center align-items-center d-flex">
          <h1 className="display-1 font-weight-bold">
            {t('homepage.CONSULT')}
          </h1>
        </div>
        <div className="col-md-6 p-4">
          <img src={i18n.language == "sb" ? ConsultantGifSB : ConsultantGif} className="img-fluid" />
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-6 p-4">
          <img src={i18n.language == "sb" ? ServiceGifSB : ServiceGif} className="img-fluid" />
        </div>
        <div className="col-md-4 justify-content-center align-items-center d-flex">
          <h1 className="display-1 font-weight-bold">
            {t('homepage.SERVICES')}
          </h1>
        </div>
        <div className="col-md-1"></div>
      </div>
    </>
  );
}
