import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import {NavLink} from "react-router-dom";
import {UseCurse} from "./hooks/IDCurses";


function jojo(match) {
    const {curse} = UseCurse(match.params.id)
    return <span>{curse.title}</span>
}

const DynamicUserBreadcrumb = ({ match }) => (
    <div>
        {
            jojo(match)
        }
    </div>
);
const routes = [
    { path: '/curses/:id', breadcrumb: DynamicUserBreadcrumb },
    { path: '/about', breadcrumb: 'О нас' },
    { path: '/', breadcrumb: 'Главная страница' },
    { path: '/curses', breadcrumb: 'Курсы' },
    { path: '/ShCart', breadcrumb: 'Корзина'},
    { path: '/SighIn', breadcrumb: 'Вход'},
    { path: '/registration', breadcrumb: 'Регистрация'},
    { path: '/stateOrder', breadcrumb: 'Состояние заказа'}
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