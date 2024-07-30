import { Button } from "@mui/material"
import { MainCard } from "../components/MainCard"
import "../styles/MainPage.css"
import logo from "../assets/logo.png"
import configureLogo from "../assets/configureLogo.png"
import pcLogo from "../assets/pcLogo.png"
import { MainSpecProductCard } from "../components/MainSpecProductCard"
import Login from "../components/Login.jsx"
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

export const MainPage = () => {
    return (
        <>
            <div className="main-page">
                <Header/>
                <div className="logo-grid">
                    <div className="logo">
                        <img className="logo-img" src={logo} alt=""/>
                        <div className="logo-text">PC STORE</div>
                    </div>
                </div>

                <div className="main-content">
                    <Link to='/configurator' style={{textDecoration: "none", marginRight: "20px"}}>
                        <MainCard title={"Конфигуратор"} imageAlt={"Конфигуратор"} imageSrc={configureLogo}/>
                    </Link>
                    <Link to='/pc' style={{textDecoration:"none", marginLeft: "20px"}}>
                        <MainCard title={"Готовые ПК"} imageAlt={"Готовые пк"} imageSrc={pcLogo}/>
                    </Link>

                </div>
                {/*<div className="special-products">*/}
                {/*    <MainSpecProductCard name="Компьютер 1" price="100"/>*/}
                {/*    <MainSpecProductCard name="Компьютер 2" price="100"/>*/}
                {/*    <MainSpecProductCard name="Компьютер 3" price="100"/>*/}
                {/*</div>*/}
                <div className="information-block">
                    <div className="information">
                        <div className="inf-big-block inf-block">
                            <h2 className="side-card-title">Мощные компьютеры для любых задач</h2>
                            <p className="side-card-description">Найдите идеальное решение для работы, игр или творчества с нашими высокопроизводительными ПК.</p>
                            <div className="side-card-image">
                                <img src="src/assets/pc1.jpg" style={{width: "600px", borderRadius:"20px"}} alt="pc1"></img>
                            </div>
                        </div>
                        <div className="inf-small-block inf-block">
                            <h2 className="side-card-title">Современные комплектующие</h2>
                            <p className="side-card-description">От процессоров до видеокарт – выбирайте среди самых надежных и передовых комплектующих.</p>
                            <div className="side-card-image">
                                <img src="src/assets/pc2.jpg" style={{width: "270px", borderRadius: "10px"}}
                                     alt="pc2"></img>
                            </div>
                        </div>
                        <div className="inf-small-block inf-block">
                            <h2 className="side-card-title">Выгодные цены</h2>
                            <p className="side-card-description">У нас вы найдете высокое качество по доступной стоимости.</p>
                            <div className="side-card-image">
                                <img src="src/assets/pc3.png" style={{width: "270px", borderRadius: "10px", marginTop: "60px"}}
                                     alt="pc3"></img>
                            </div>
                        </div>
                        <div className="inf-big-block inf-block">
                            <h2 className="side-card-title">Гарантия качества и поддержка</h2>
                            <p className="side-card-description">Наши товары поставляются с гарантией качества. Мы заботимся о вашем комфорте и уверены в наших продуктах.</p>
                            <div className="side-card-image">
                                <img src="src/assets/pc4.jpg" style={{width: "600px", borderRadius: "20px"}}
                                     alt="pc4"></img>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )


}