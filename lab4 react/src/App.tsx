import React from 'react';
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import Catalog_curses from "./pages/Catalog_curses";
import About from "./pages/About";
import Main_Page from "./pages/main";
import CurseId from "./pages/pages";
import Breadcrumbs from "./BreadCrumbs";


function App() {
  return (
  <BrowserRouter basename="/">
    <div className="h-50 p-20">
      <div className="container text-3xl">
      <Link to="/">Главная </Link>
      <Link to="/curses">Курсы </Link>
      <Link to="/about">О сайте </Link>
      </div>
        <div className="text-blue-800">
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
    </Switch>
  </BrowserRouter>
  )
}

export default App;