import { Switch } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import { Router, Route } from "react-router";

import history from "../../config/history";
import PrivateRoute from "../../helpers/privateRoutes"; // Private Routes, Will only accessible after Login

import AuthRoute from "../../helpers/authRoutes"; // Auth Routes, Will only accessible before login.
import Spinner from "../../components/Spinner/Spinner";
import AddProperty from "modules/AddProperty";
import { checkAuthorization, getLocalUser, refreshUser } from "helpers/helpers";

// Lazy loading of all the components.
const Dashboard = lazy(() => import('../Dashboard'));
const Matches = lazy(() => import('../Matches'));
const RequestedMatches = lazy(() => import('../Matches/Requested Matches'));
const IncomingMatches = lazy(() => import('../Matches/Incoming Matches'));
const DeclinedMatches = lazy(() => import('../Matches/Declined Matches'));
const Rooms = lazy(() => import('../Rooms'));
const Room = lazy(() => import('../Room'));
const Logout = lazy(() => import("../Dashboard/logout"));
const Login = lazy(() => import("../Login/index"));
const Register = lazy(() => import("../Register"));

const ForgotPassword = lazy(() => import("../ForgotPassword"));
const ResetPassword = lazy(() => import("../ResetPassword"));
const VerifyEmail = lazy(() => import("../VerifyEmail"));

const SetupAccount = lazy(() => import("../Setup"));

const User = lazy(() => import('../User'));
// Root routes
const App = () => {
  useEffect(() => {

    if (checkAuthorization()) {
      (async () => {
        const user = getLocalUser();
        await refreshUser(user.id, user.type);
      })();
    }

  });


  return (
    <Router history={history}>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/register" component={Register} />
          <AuthRoute path="/forgot-password" component={ForgotPassword} />
          <AuthRoute path="/reset-password" component={ResetPassword} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/user/:id" component={User} />
          <PrivateRoute exact path="/matches" component={Matches} />
          <PrivateRoute exact path="/requested-matches" component={RequestedMatches} />
          <PrivateRoute exact path="/incoming-matches" component={IncomingMatches} />
          <PrivateRoute exact path="/declined-matches" component={DeclinedMatches} />
          <PrivateRoute exact path="/rooms" component={Rooms} />
          <PrivateRoute exact path="/room/:id" component={Room} />
          <PrivateRoute exact path="/setup-account" component={SetupAccount} />
          <PrivateRoute exact path="/add-property" component={AddProperty} />
          <Route path="/api/verify-email">
            <VerifyEmail />
          </Route>
          <PrivateRoute path="/logout" component={Logout} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
