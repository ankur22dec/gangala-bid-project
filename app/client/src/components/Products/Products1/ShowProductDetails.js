import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { useTranslation } from 'react-i18next';

import {
  addToCart,
  addToWishList,
  getWishList,
  removeFromWishList
} from '../../../Action/appAction';

function ShowProductDetails(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const { t, i18n } = useTranslation();
  const productDetails = useSelector(
    (state) => state.appReducer.productsDetails
  );
  const wishlist = useSelector((state) => state.appReducer.wishlist);
  const user = useSelector((state) => state.appReducer.user);
  const cart = useSelector((state) => state.appReducer.cart);
  const params = useParams();
  const [cartIds, setCartIds] = useState([]);
  const [productId, setProductId] = useState('1');
  useEffect(() => {
    if (user && user._id) {
      dispatch(getWishList(user._id));
    }
  }, [user]);
  useEffect(() => {
    if (params && params.id) {
      setProductId(params.id);
      // console.log(productDetails)
    }
  }, []);
  useEffect(() => {
    let arr = [];
    for (let i in cart) {
      arr.push(cart[i]._id);
    }
    setCartIds(arr);
    // console.log("cart", cart);
    return () => setCartIds(arr);
  }, [cart]);
  const rupeeSymbol = (price) => {
    if (price) {
      return (
        <>
          <span style={{ fontSize: '1.5rem' }}>₹</span> {price.toLocaleString('en-US', {maximumFractionDigits:2})}
        </>
      );
    } else {
      return <>0</>;
    }
  };
  const addAuction = (data) => {
    dispatch(addToCart(data));
  };
  const addToWishListLocal = (id) => {
    if (user && user._id) {
      // alert(id)
      // console.log(user);
      dispatch(addToWishList(id, user._id));
    } else {
      let action = confirm(
        t("productDetails.loginError")
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
    } else {
      let action = confirm(
        t("productDetails.loginError")
      );
      if (action) {
        history.push('/PageLoginIllustration');
      }
    }
  };
  return (
    <>
      {productDetails != null && (
        <Row>
          <MetaTags>
            <title>Gangala | {productDetails.name}</title>
            <meta name="description" content={productDetails.description ? productDetails.description : productDetails.name} />
            <meta name="robots" content="index, follow" />
            <meta name="keywords" content={productDetails.name.split(/[ ,]+/).join(',')} />
          </MetaTags>
          <Col xl="12" md="12">
            <Card className="p-5">
              <Row>
                <Col md="4">
                  <img
                    src={productDetails.main_image_link}
                    className="img-fluid"
                  />
                </Col>
                <Col md="8">
                  <h4>{productDetails.name}</h4>

                  <Rating
                    initialRating={productDetails.rating_avg}
                    readonly={true}
                    stop={5}
                    emptySymbol={
                      <span className="text-black-50 mr-1 font-size-xl opacity-3">
                        <FontAwesomeIcon icon={['far', 'star']} />
                      </span>
                    }
                    fullSymbol={
                      <span className="text-warning mr-1 font-size-xl">
                        <FontAwesomeIcon
                          icon={['fas', 'star']}
                          color="#FFAE42"
                        />
                      </span>
                    }
                  />
                  <div>
                    <lable>{t("productDetails.Reference_Price")}</lable>
                    <h2 style={{ color: '#3b3e66', fontWeight: 'bold' }}>
                      {rupeeSymbol(productDetails.list_price)}
                    </h2>
                  </div>
                  <div className="mt-3">
                    <Button
                      size="sm"
                      disabled={cartIds.includes(productDetails._id)}
                      style={{ backgroundColor: '#fe9901', color: '#3b3e66' }}
                      onClick={() => {
                        addAuction(productDetails);
                        history.push('/NewAcution');
                      }}>
                      {cartIds.includes(productDetails._id)
                        ? t("productDetails.Auction_Created")
                        : t("productDetails.Add_to_Auction")}
                    </Button>
                    &nbsp;
                    <Button
                      size="sm"
                      style={{ backgroundColor: '#0a0a0a', color: '#fe9901' }}
                      onClick={() =>
                        wishlist.includes(productDetails._id)
                          ? removeFromWishListLocal(productDetails._id)
                          : addToWishListLocal(productDetails._id)
                      }>
                      {!wishlist.includes(productDetails._id)
                        ? t("productDetails.Add_To_WishList")
                        : t("productDetails.Remove_from_wishlist")}
                    </Button>
                  </div>
                  <div className="mt-4">
                    <h4>{t("productDetails.Description")}</h4>
                    <p>{productDetails.description}</p>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default ShowProductDetails;
