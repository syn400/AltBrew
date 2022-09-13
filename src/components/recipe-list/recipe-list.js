import { Link } from "react-router-dom"
import { React, useState } from 'react'
import './recipe-list.scss';
import chemex from '../../assets/chemex.svg';
import frenchpress from '../../assets/french-press.svg';
import drip from '../../assets/drip-v60.svg';
import aeropress from '../../assets/aeropress.svg';
import turtle from '../../assets/turtle.svg';
import rabbit from '../../assets/rabbit.svg';
import snail from '../../assets/snail.svg';



export const RecipeList = () => {

    const [toggleMenu, toggleMenuSet] = useState(false);

    return (
        <div className="container">
        <div className="content">
            <header className="page-2">
                <Link to="/">
                    <h1 className="logo">Alt<span>BREW</span></h1>
                </Link>
            </header>
            <form className="searchbar page-2">
                <input type="search"/>
                <button>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            <form className="random page-2">
                <p>Random <i className="fa-solid fa-mug-hot"></i></p>
            </form>
            <section className="list-content" >

                <ul className="recipe-list">
                    <li className="recipe">
                        <div className="recipe-info">
                            <p className="username">
                                <i className="fa-solid fa-user"></i><span>user</span>
                            </p>

                            <div className="info">
                                <div className="likes">
                                    <i className="fa-regular fa-heart"></i>
                                    <span>1250</span>
                                </div>
                                <div className="time">
                                    <p>1:20</p>
                                </div>
                                <img src={chemex} alt="chemex"/>
                            </div>
                        </div>

                        <h2>title</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam, saepe quos? Ex aspernatur</p>
                    </li>
                </ul>
                
                <div className={toggleMenu ? "filters" : "filters mobile"}>
                    <div className="mobile-show" onClick={()=>toggleMenuSet(!toggleMenu)}>
                        <p>{toggleMenu ? 'Save filters' : 'Filters and sort' }</p>
                    </div>
                    <div className="content mobile">
                        <div className="bean-roast">
                            <h2>Choose bean roast</h2>
    
                            <div className="roast-checkbox">
                                <div>
                                    <input type="checkbox" id="light-roast"/>
                                    <label className="l-roast" htmlFor="light-roast">
                                        <span className="bean"></span> Light
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="medium-roast"/>
                                    <label className="m-roast" htmlFor="medium-roast">
                                        <span className="bean"></span> Medium
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="medium-dark-roast"/>
                                    <label className="md-roast" htmlFor="medium-dark-roast">
                                        <span className="bean"></span> Medium/Dark
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="dark-roast"/>
                                    <label className="d-roast" htmlFor="dark-roast">
                                        <span className="bean"></span> Dark
                                    </label>
                                </div>
                            </div>
    
                        </div>
                        <div className="method">
                            <h2>Method</h2>
    
                            <div className="method-checkbox">
                                <div>
                                    <input type="checkbox" id="chemex-checkbox"/>
                                    <label htmlFor="chemex-checkbox">
                                        <img src={chemex} alt="chemex"/>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="drip-checkbox"/>
                                    <label htmlFor="drip-checkbox">
                                        <img src={drip} alt="drip"/>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="aeropress-checkbox"/>
                                    <label htmlFor="aeropress-checkbox">
                                        <img src={aeropress} alt="aeropress"/>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="french-p-checkbox"/>
                                    <label htmlFor="french-p-checkbox">
                                        <img src={frenchpress} alt="French press"/>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="sort-by">
                            <h2>Sort by</h2>
    
                            <div className="sort-checkbox">
                                <div>
                                    <input type="checkbox" id="newest"/>
                                    <label htmlFor="newest">
                                        <i className="fa-solid fa-arrow-up"></i> Newest
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="oldest"/>
                                    <label htmlFor="oldest">
                                        <i className="fa-solid fa-arrow-down"></i> Oldest
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="love"/>
                                    <label htmlFor="love">
                                        <i className="fa-solid fa-heart"></i> Most loved
                                    </label>
                                </div>
                                 
                            </div>
                        </div>
                        <div>
                            <h2>Brew time</h2>
    
                            <div className="time-checkbox">
                                <div>
                                    <input type="checkbox" id="rabbit"/>
                                    <label htmlFor="rabbit">
                                        <img src={rabbit} alt="fast"/> 1 - 2 min
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="turtle"/>
                                    <label htmlFor="turtle">
                                        <img src={turtle} alt="slow"/> 2 - 4 min
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="snail"/>
                                    <label htmlFor="snail">
                                        <img src={snail} alt="slowest"/> + 4 min
                                    </label>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <footer>© 2022 Konrad Synowiec - syn400, Wszystkie prawa zastrzeżone.</footer> 
    </div>
    )
}