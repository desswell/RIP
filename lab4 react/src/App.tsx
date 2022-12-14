import React from 'react';
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import Catalog_curses from "./pages/Catalog_curses";
import About from "./pages/About";
import Main_Page from "./pages/main";
import CurseId from "./pages/pages";
import ShoppingCartPage from "./pages/shoppingCartPage";
import Breadcrumbs from "./BreadCrumbs";
import "./style css/navbar.css"
import "./style css/breadscrumbs.css"
import'axios'
import { FaShoppingCart } from "react-icons/fa";
import { BtnLogIn } from "./Components/UserIn";



function App() {
  return (
  <BrowserRouter basename="/">
    <div className="h-50 p-100">
      <ul className="menu-main">
      <Link to="/">Главная </Link>
      <Link to="/curses">Курсы </Link>
      <Link to="/about">О сайте </Link>
          <div className="float-right">
              <BtnLogIn />
          </div>
          <div className="float-right">
          <Link to="/ShCart">
          <FaShoppingCart size={20}/>
          </Link>
          </div>
      </ul>
        <div className="breadcrumbs">
            {<Breadcrumbs/>}
        </div>
    </div>
    <Switch>
        <Route exact path="/">
          <Main_Page/>
        </Route>
        <Route exact path="/curses">
          <Catalog_curses/>
        </Route>
        <Route exact path="/curses/:id">
            <CurseId/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/ShCart">
            <ShoppingCartPage/>
        </Route>
    </Switch>
  </BrowserRouter>
  )
}

export default App;