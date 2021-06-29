import { AnimatePresence, motion } from 'framer-motion';
import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
//redux
import {
  authUser,
  getCountry,
  getMe,
  getSellerProduct
} from './Action/appAction';
// Example Pages
import CommerceHeader from './components/Homepage/Homepage1/CommerceHeader';
// Layout Blueprints
import {
  LeftSidebar,
  MinimalLayout,
  PresentationLayout
} from './layout-blueprints';

const Orders = lazy(() => import('./pages/Orders'));
const Products = lazy(() => import('./pages/Products'));
const Payment = lazy(() => import('./pages/Payment'));
const ShowProductDetails = lazy(() =>
  import('./components/ProductsFilters/ProductsFilters1/ProductDetailsFilter')
);
const ChatBot = lazy(() => import('./pages/ChatBot'));
const PageProfile = lazy(() => import('./pages/PageProfile'));
// import UserProfile from './pages/PageProfile/userProfile';
const Userprofile = lazy(() => import('./pages/Userprofile'));
const ProductsFilters = lazy(() => import('./pages/ProductsFilters'));
const UpdateAuction = lazy(() => import('./pages/UpdateAuction'));
const Auctions = lazy(() => import('./pages/Auctions'));
const NewPassword = lazy(() => import('./pages/NewPassword'));
const PageLoginIllustration = lazy(() =>
  import('./pages/PageLoginIllustration')
);
const PageRegisterIllustration = lazy(() =>
  import('./pages/PageRegisterIllustration')
);
const PageRecoverIllustration = lazy(() =>
  import('./pages/PageRecoverIllustration')
);
const Wishlist = lazy(() => import('./pages/Wishlist'));

const PageError404 = lazy(() => import('./pages/PageError404'));

const Homepage = lazy(() => import('./pages/Homepage'));
const FormsSteppers = lazy(() => import('./pages/FormsSteppers'));
const AuctionDetailTitle = lazy(() =>
  import('./pages/FormsSteppers/AuctionDetailTitle')
);

const Routes = ({ authUser, getCountry, getSellerProduct, getMe }) => {
  useEffect(() => {
    authUser();
    getSellerProduct();
    getMe();
    getCountry();
  }, []);
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  const SuspenseLoading = () => {
    return (
      <>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4">
            <CircleLoader color={'#fe9901'} loading={true} />
          </div>
          <div className="text-muted font-size-xl text-center pt-3">
            {/* Please wait while we load the live preview examples */}
            Loading...
            <span className="font-size-lg d-block text-dark">
              {/* This live preview instance can be slower than a real production
              build! */}
            </span>
          </div>
        </div>
      </>
    );
  };
  return (
    <AnimatePresence>
      <Suspense fallback={<SuspenseLoading />}>
        <Switch>
          <Redirect exact from="/" to="/Homepage" />
          <Route path={['/Homepage', '/Shop', '/productdetails']}>
            <LeftSidebar>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <div className="header-top-section pb-2">
                      <CommerceHeader />
                    </div>
                    <Route path="/Homepage" component={Homepage} />
                    {/* <Route exact path="/Shop/:id" component={Products} /> */}

                    <Route path="/Shop/:id" component={ProductsFilters} />
                    <Route
                      path="/productdetails/:id"
                      component={ShowProductDetails}
                    />
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </LeftSidebar>
          </Route>

          <Route
            path={[
              '/Shop',
              '/Customers',
              '/NewAcution',
              '/ChatBot',
              '/Profile',
              '/Auctions',
              '/Userprofile',
              '/productdetails',
              '/Wishlist',
              '/payment'
            ]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}>
                  <div className="header-top-section pb-2">
                    <CommerceHeader />
                  </div>
                  <Route path="/updateAuction/:id" component={UpdateAuction} />
                  <Route exact path="/ChatBot/:msg" component={ChatBot} />
                  <Route exact path="/payment" component={Payment} />
                  <Route exact path="/ChatBot" component={ChatBot} />
                  <Route exact path="/Profile" component={PageProfile} />
                  <Route exact path="/Userprofile" component={Userprofile} />
                  <Route exact path="/Auctions" component={Auctions} />
                  <Route exact path="/Wishlist" component={Wishlist} />
                  <Route path="/Orders" component={Orders} />
                  <Route exact path="/Shop" component={Products} />
                  <Route path="/NewAcution" component={FormsSteppers} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={['/form', '/AuctionDetail']}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}>
                  {/* <Route path="/form" component={Settings} /> */}
                  <div className="header-top-section pb-2">
                    <CommerceHeader />
                  </div>
                  <Route path="/form" component={FormsSteppers} />
                  <Route
                    path="/AuctionDetail/:id"
                    component={AuctionDetailTitle}
                  />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route
            path={[
              '/reset',
              '/PageLoginIllustration',
              '/seller-registration',
              '/PageRecoverIllustration',
              '/PageError404'
            ]}>
            <MinimalLayout>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}>
                  <div className="header-top-section pb-2">
                    <CommerceHeader />
                  </div>
                  <Route path="/reset/:token" component={NewPassword} />
                  <Route
                    path="/PageLoginIllustration"
                    component={PageLoginIllustration}
                  />
                  <Route
                    path="/seller-registration"
                    component={PageRegisterIllustration}
                  />
                  <Route
                    path="/PageRecoverIllustration"
                    component={PageRecoverIllustration}
                  />
                  <Route path="/PageError404" component={PageError404} />
                </motion.div>
              </Switch>
            </MinimalLayout>
          </Route>
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  authUser,
  getCountry,
  getSellerProduct,
  getMe
})(Routes);
