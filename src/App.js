import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./page/home";
import Dashboard from "./admin/page/dashboard/dashboard.page";
import { Detail } from "./page/detail/detail";
import Chairing from "./page/chair/chairing";
import SignIn from "./page/sign-in/sign-in.page";
import SignUp from "./page/sign-up/sign-up.page";
import Guard, { GuardBooking } from "./HOC/guard.hoc";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/detail/:maPhim" component={Detail} />
        <Route path="/chairing/:maLichChieu">
          <GuardBooking>
            <Chairing />
          </GuardBooking>
        </Route>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/admin/:feature">
          <Guard>
            <Dashboard />
          </Guard>
        </Route>
        <Route path="/admin">
          <Guard>
            <Dashboard />
          </Guard>
        </Route>
        {/* Page not found */}
        <Route path="">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
