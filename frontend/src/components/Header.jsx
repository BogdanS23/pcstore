import {Link} from "react-router-dom";
import Login from "./Login.jsx";
import miniLogo from "../assets/miniLogo.png";
import cart from "../assets/cart.png";

const Header = ({ isConfiguratorPage, isCartPage, isPCPage, isProfilePage}) => {
    return (
        <header className={isConfiguratorPage ? 'header-conf' : 'header'}
                style={{"display": "flex", "justifyContent": "flex-end", "gap": "10px"}}>

            {isConfiguratorPage || isCartPage || isPCPage || isProfilePage?
                <Link to="/" >
                    <img className='mini-logo' src={miniLogo} alt="logo"/>
                </Link> : null}
            {isConfiguratorPage ? (
                <div className="logo-conf">Конфигуратор</div>
            ) : null}
            {isProfilePage ? (
                <div className="logo-conf">Личный кабинет</div>
            ) : null}
            {isCartPage ? (
                <div className="logo-conf">Корзина</div>
            ) : null}
            {isPCPage ? (
                <div className="logo-conf">Готовые ПК</div>
            ) : null}
            <div className="cart-logo">
                <Link to="/cart">
                    <img src={cart} alt="cart"/>
                </Link>
            </div>

            <Login/>
        </header>
    );
}
export default Header;