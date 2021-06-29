import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Nouislider from 'nouislider-react';
import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Card,
  CardHeader,
  Col,
  Collapse,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row
} from 'reactstrap';
import {
  addToWishList,
  getCart,
  getProduct,
  getWishList,
  removeFromWishList,
  setMinMaxRange,
  addToCart,
} from '../../../Action/appAction';

function LivePreviewExample(props) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  //Redux Data 

  const cart = useSelector(state => state.appReducer.cart);
  const auth = useSelector(state => state.appReducer.isAuth);
  const minPrice = useSelector(state => state.appReducer.productMin);
  const maxPrice = useSelector(state => state.appReducer.productMax);
  const user = useSelector(state => state.appReducer.user);
  const wishlist = useSelector(state => state.appReducer.wishlist);
  const product = useSelector(state => state.appReducer.product);
  //Redux Data


  let history = useHistory();
  const params = useParams();
  const [pageNumber, setPageNumber] = useState('1');
  const [minPriceRange, setMinPriceRange] = useState(minPrice ? minPrice : 0);
  const [maxPriceRange, setMaxPriceRange] = useState(
    maxPrice ? maxPrice : 30000
  );

  useEffect(() => {
    if (params && params.id) {
      setPageNumber(params.id);
    }
    if (user && user._id) {
      dispatch(getWishList(user._id));
    }
    dispatch(getCart());
  }, []);

  const onUpdateMinMaxPrice = (isNull = 1) => {
    let min = minPriceRange;
    let max = maxPriceRange;
    if (isNull == null) {
      min = null;
      max = null;
      if (pageNumber == 1) {
        dispatch(getProduct(0, null, null));
      }
    } else {
      if (pageNumber == 1) {
        dispatch(getProduct(0, min, max));
      }
    }

    dispatch(setMinMaxRange(min, max));
    history.push('/Shop/1');
  };
  const moveToNext = (page = 0) => {
    if (page === 0) {
      let next = parseInt(pageNumber) + 1;
      history.push('/Shop/' + next);
    } else {
      history.push('/Shop/' + page);
    }
  };
  const moveToPrevious = (page = 0) => {
    if (page === 0) {
      let next = parseInt(pageNumber) - 1;
      history.push('/Shop/' + next);
    } else {
      history.push('/Shop/' + page);
    }
  };
  const [check, setcheck] = useState(
    Array(product.length)
      .fill()
      .map((v, i) => ({ valid: false }))
  );

  const gotoProductDetailsPage = (productID) => {
    // productdetails
    history.push('/productdetails/' + productID);
  };
  const addToWishListLocal = (id) => {
    if (user && user._id) {
      // alert(id)
      // console.log(user);
      dispatch(addToWishList(id, user._id));
    } else {
      let action = confirm(
        t("products.loginError")
      );
      if (action) {
        
        history.push('/PageLoginIllustration');
      }
    }
  };
  const [isPrice, setPrice] = useState(true);
  const togglePrice = () => setPrice(!isPrice);

  const [isBrand, setBrand] = useState(true);
  const toggleBrand = () => setBrand(!isBrand);

  const [isColor, setColor] = useState(true);
  const toggleColor = () => setColor(!isColor);

  const [isCpu, setCpu] = useState(false);
  const toggleCpu = () => setCpu(!isCpu);
  useEffect(() => {
    if (product.length > 0 && cart && cart.length > 0) {
      let data = [...check];
      product.forEach((p, i) => {
        if (cart.some((c) => c._id === p._id)) {
          data[i].valid = true;
        }
      });
      setcheck(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const removeFromWishListLocal = (id) => {
    if (user && user._id) {
      dispatch(removeFromWishList(id, user._id));
    } else {
      let action = confirm(
        t("products.loginError")
      );
      if (action) {
        history.push('/PageLoginIllustration');
      }
    }
  };

  console.log(product);
  return (
    <>
      <MetaTags>
        <title>{t("products.title")}</title>
        <meta name="description" content={t("products.description")} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={t("products.keywords")} />
      </MetaTags>
      <Row>
        <Col xl="4">
          <Card className="card-box mb-5 accordion">
            <Card
              className={clsx(
                'border-0 bg-transparent shadow-none rounded-0 card-box',
                { 'panel-open': isPrice }
              )}>
              <Card className="border-0 bg-transparent shadow-none rounded-top">
                <CardHeader className="rounded-top">
                  <div className="panel-title">
                    <div className="accordion-toggle rounded-top overflow-hidden">
                      <Button
                        color="link"
                        size="lg"
                        className="border-bottom-0 d-flex align-items-center justify-content-between"
                        onClick={togglePrice}>
                        <span className="font-weight-bold">{t("products.Price")}</span>
                        <FontAwesomeIcon
                          icon={['fas', 'angle-up']}
                          className="font-size-xl accordion-icon"
                        />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <Collapse isOpen={isPrice}>
                  <div className="px-5 pt-5 pb-4">
                    <Nouislider
                      connect
                      range={{ min: 0, max: 30000 }}
                      start={[minPriceRange, maxPriceRange]}
                      step={1}
                      tooltips
                      onUpdate={(r) => {
                        setMinPriceRange(r[0]);
                        setMaxPriceRange(r[1]);
                        // console.log(r)
                      }}
                    />
                  </div>
                </Collapse>
                <Button color="primary" onClick={() => onUpdateMinMaxPrice()}>
                  {minPrice != null ? t('products.Applied') : t('products.Apply')}
                </Button>
                {minPrice != null && (
                  <Button
                    color="warning"
                    className="mt-2"
                    onClick={() => onUpdateMinMaxPrice(null)}>
                    {t('products.Clear')}
                  </Button>
                )}
              </Card>
            </Card>
          </Card>
        </Col>
        <Col xl="8">
          {product.map((p, i) => (
            <Card className="mb-5" key={i}>
              <Row>
                <Col
                  lg="4"
                  className="d-flex align-items-center justify-content-center">
                  <div className="divider-v divider-v-md d-none d-lg-block" />
                  <a
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault();
                      gotoProductDetailsPage(p._id);
                    }}
                    className="card-img-wrapper card-box-hover rounded">
                    <img
                      alt="..."
                      className="img-fluid hover-scale-lg"
                      src={p.main_image_link}
                    />
                  </a>
                </Col>
                <Col lg="8">
                  <div className="divider-v divider-v-md d-none d-lg-block" />
                  <div className="py-4">
                    <div className="font-weight-bold font-size-xxl">
                      <a
                        href="#/"
                        onClick={(e) => {
                          e.preventDefault();
                          gotoProductDetailsPage(p._id);
                        }}>
                        {p.name}
                      </a>
                    </div>
                    <div className="d-flex flex-wrap pt-2 pb-3">
                      <Rating
                        initialRating={p.rating_avg}
                        readonly={true}
                        stop={5}
                        emptySymbol={
                          <span className="text-black-50 mr-1 font-size-sm opacity-3">
                            <FontAwesomeIcon icon={['far', 'star']} />
                          </span>
                        }
                        fullSymbol={
                          <span className="text-warning mr-1 font-size-sm">
                            <FontAwesomeIcon
                              icon={['fas', 'star']}
                              color="#FFAE42"
                            />
                          </span>
                        }
                      />
                    </div>
                   <div>
                    <lable>{t("productDetails.Reference_Price")}</lable><br/>
                      <span style={{ fontSize: '1.2rem' }}>₹</span>{' '}
                      {p.list_price ? p.list_price.toLocaleString('en-US', {maximumFractionDigits:2}) : '0'}
                    </div>
                    <div className="font-size-sm text-black-50 pb-3 pr-2">
                      {p.description_sale
                        ? p.description_sale.length > 100
                          ? p.description_sale.substring(0, 100) + '...'
                          : p.description_sale
                        : ''}
                    </div>
                    <Button
                      size="sm"
                      // color="first"
                      style={{ backgroundColor: '#fe9901' }}
                      disabled={check[i].valid}
                      onClick={async () => {
                        await dispatch(addToCart(p));
                        history.push('/NewAcution');
                      }}>
                      {check[i].valid ? t("wishlist.Auction_Created") : t("wishlist.Add_to_Auction")}
                    </Button>{' '}
                    &nbsp;
                    <Button
                      size="sm"
                      // color="success"
                      style={{ backgroundColor: '#0a0a0a', color: '#fe9901' }}
                      onClick={() =>
                        wishlist.includes(p._id)
                          ? removeFromWishListLocal(p._id)
                          : addToWishListLocal(p._id)
                      }>
                      {!wishlist.includes(p._id)
                        ? t("wishlist.Add_To_WishList")
                        : t("wishlist.Remove_from_wishlist")}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
          <Row>
            <Col md="6">
              {/* <div className="d-flex align-items-center justify-content-center flex-wrap"> */}
              <Pagination size="lg" className="pagination-icons">
                {/* <PaginationItem disabled>
                <PaginationLink
                  first
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <FontAwesomeIcon icon={['fas', 'angle-double-left']} />
                </PaginationLink>
              </PaginationItem> */}
                <PaginationItem disabled={pageNumber > 1 ? false : true}>
                  <PaginationLink
                    previous
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault();
                      moveToPrevious();
                    }}>
                    <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    next
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault();
                      moveToNext();
                    }}>
                    <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                  </PaginationLink>
                </PaginationItem>

                {/* <PaginationItem>
                <PaginationLink
                  last
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <FontAwesomeIcon icon={['fas', 'angle-double-right']} />
                </PaginationLink>
              </PaginationItem> */}
              </Pagination>
              {/* </div> */}
            </Col>
            <Col md="6">{/* {parseInt(totalProducts)} */}</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default LivePreviewExample;
