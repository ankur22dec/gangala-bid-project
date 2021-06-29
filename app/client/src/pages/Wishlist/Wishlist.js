/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import BlockUi from 'react-block-ui';
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import { Button, Card, Col, Container, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import {
  addToCart,
  addToWishList,
  getWishList,
  getWishlistProducts,
  removeFromWishList
} from '../../Action/appAction';
function Wishlist() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  let history = useHistory();
  const user = useSelector((state) => state.appReducer.user);
  const cart = useSelector((state) => state.appReducer.cart);
  const isAuth = useSelector((state) => state.appReducer.isAuth);
  const wishlist = useSelector((state) => state.appReducer.wishlist);
  const userWishlist = useSelector((state) => state.appReducer.wishlist);

  const [cartIds, setCartIds] = useState([]);
  const [blocking, setblocking] = useState(false);
  const wishlistProducts = useSelector(
    (state) => state.appReducer.wishlistWithProducts
  );
  const addAuction = (data) => {
    dispatch(addToCart(data));
  };
  useEffect(() => {
    if (user && user._id) {
      dispatch(getWishlistProducts(user._id));
      dispatch(getWishList(user._id));
    }
  }, [user]);
  useEffect(() => {
    let arr = [];
    for (let i in cart) {
      arr.push(cart[i]._id);
    }
    setCartIds(arr);
    // console.log("cart", cart);
    return () => setCartIds(arr);
  }, [cart]);
  const addToWishListLocal = (id) => {
    if (user && user._id) {
      // alert(id)
      // console.log(user);
      dispatch(addToWishList(id, user._id));
    } else {
      let action = confirm(
        'You Need to login first. Can we movie you to the login page ?'
      );
      if (action) {
        history.push('/PageLoginIllustration');
      }
    }
  };
  const removeFromWishListLocal = (id) => {
    if (user && user._id) {
      // alert(id)
      // console.log(user);
      dispatch(removeFromWishList(id, user._id));
      dispatch(getWishlistProducts(user._id));
      dispatch(getWishList(user._id));
    } else {
      let action = confirm(
        'You Need to login first. Can we movie you to the login page ?'
      );
      if (action) {
        history.push('/PageLoginIllustration');
      }
    }
  };
  const gotoProductDetailsPage = (productID) => {
    history.push('/productdetails/' + productID);
  };
  if (user && user._id) {
    return (
      <BlockUi
        className="app-inner-content-layout"
        tag="div"
        blocking={blocking}
        loader={<DotLoader color={'var(--first)'} loading={blocking} />}>
        <Container>
          {/* <div>{JSON.stringify(wishlistProducts[0])}</div> */}
          {wishlistProducts.length < 1 &&
            <>
              <div className="h1 text-center">{t("wishlist.Your_wishlist_is_empty")}</div>
              <div className="text-center">
                <Button
                  size="md"
                  style={{
                    backgroundColor: '#fe9901',
                    color: '#3b3e66'
                  }}
                  onClick={() => history.push("/Shop/1")}>
                  {t("wishlist.Goto_Products_Page")}
                </Button>
              </div>
            </>
          }
          {wishlistProducts.map((product, key) => {
            return (
              <Card className="mb-5" key={key}>
                <Row>
                  <Col
                    lg="3"
                    className="d-flex align-items-center justify-content-center">
                    <div className="divider-v divider-v-md d-none d-lg-block" />
                    <a
                      href="#/"
                      onClick={(e) => {
                        e.preventDefault();
                        gotoProductDetailsPage(product.productID._id);
                      }}
                      className="card-img-wrapper card-box-hover rounded">
                      <img
                        alt="..."
                        className="img-fluid hover-scale-lg"
                        src={product.productID.main_image_link}
                      />
                    </a>
                  </Col>
                  <Col lg="9">
                    <div className="divider-v divider-v-md d-none d-lg-block" />
                    <div className="py-4">
                      <div className="font-weight-bold font-size-xxl">
                        <a
                          href="#/"
                          onClick={(e) => {
                            e.preventDefault();
                            gotoProductDetailsPage(product.productID._id);
                          }}>
                          {product.productID.name}
                        </a>
                      </div>
                      <div className="d-flex flex-wrap pt-2 pb-3">
                        <Rating
                          initialRating={product.productID.rating_avg}
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
                      <div className="font-weight-bold font-size-xxl">
                        <span style={{ fontSize: '1.2rem' }}>₹</span>{' '}
                        {product.productID.list_price
                          ? product.productID.list_price
                          : '0'}
                      </div>
                      <div className="font-size-sm text-black-50 pb-3 pr-2">
                        {product.productID.description_sale
                          ? product.productID.description_sale.length > 100
                            ? product.productID.description_sale.substring(
                              0,
                              100
                            ) + '...'
                            : product.productID.description_sale
                          : ''}
                      </div>
                      <div className="mt-3">
                        <Button
                          size="sm"
                          disabled={cartIds.includes(product.productID._id)}
                          style={{
                            backgroundColor: '#fe9901',
                            color: '#3b3e66'
                          }}
                          onClick={() => addAuction(product.productID)}>
                          {cartIds.includes(product.productID._id)
                            ? t("wishlist.Auction_Created")
                            : t("wishlist.Add_to_Auction")}
                        </Button>
                        &nbsp;
                        <Button
                          size="sm"
                          style={{
                            backgroundColor: '#0a0a0a',
                            color: '#fe9901'
                          }}
                          onClick={() =>
                            wishlist.includes(product.productID._id)
                              ? removeFromWishListLocal(product.productID._id)
                              : addToWishListLocal(product.productID._id)
                          }>
                          {!wishlist.includes(product.productID._id)
                            ? t("wishlist.Add_To_WishList")
                            : t("wishlist.Remove_from_wishlist")}
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </Container>
      </BlockUi>
    );
  } else {
    return <div>{t("wishlist.You_are_not_authorised")}</div>;
  }
}

export default Wishlist;
