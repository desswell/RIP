import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import {curses_data} from "./data/curses";
import {NavLink} from "react-router-dom";

const DynamicUserBreadcrumb = ({ match }) => (
    <span>{curses_data[match.params.id - 1].title}</span>
);
const routes = [
    { path: '/curses/:id', breadcrumb: DynamicUserBreadcrumb },
    { path: '/about', breadcrumb: 'О нас/' },
    { path: '/', breadcrumb: 'Главная страница / ' },
    { path: '/curses', breadcrumb: 'Курсы / ' },
];

const Breadcrumbs = ({ breadcrumbs }) => (
    <div>
        {breadcrumbs.map(({
                              match,
                              breadcrumb
                          }) => (
            <span key={match.url}>
        <NavLink to={match.url}>{breadcrumb}</NavLink>
      </span>
        ))}
    </div>
);

export default withBreadcrumbs(routes)(Breadcrumbs);