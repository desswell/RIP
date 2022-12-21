import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Catalog_curses from "./pages/Catalog_curses";
import About from "./pages/About";
import Main_Page from "./pages/main";
import CurseId from "./pages/pages";
import ShoppingCartPage from "./pages/shoppingCartPage";
import UserInfo from "./pages/UserInfo";
import "./style css/navbar.css"
import "./style css/breadscrumbs.css"
import'axios'
import {Registration} from "./pages/registration";
import {AuthPage} from './pages/login'
import { NavigationBar } from "./Components/navbar";
import {useDispatch} from "react-redux";
import {ChangeAuthAction, useIsAuth} from "./slices/shoppingCartSlice";


function App() {
    const dispatch = useDispatch()
    const isAuth = useIsAuth()
    if (localStorage.getItem('login') !== null && !isAuth) dispatch(ChangeAuthAction)
    return (
  <BrowserRouter basename="/">
    <NavigationBar/>
    <Route>
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
        <Route path="/SighIn">
            <AuthPage/>
        </Route>
        <Route path="/registration">
            <Registration/>
        </Route>
        <Route path="/userinfo">
            <UserInfo/>
        </Route>
    </Route>
  </BrowserRouter>
  )
}

export default App;