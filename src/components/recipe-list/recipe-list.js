import { Link } from "react-router-dom"
import { React, useEffect, useState, useRef } from 'react'
import './recipe-list.scss';
import chemex from '../../assets/chemex.svg';
import frenchpress from '../../assets/french-press.svg';
import drip from '../../assets/drip-v60.svg';
import aeropress from '../../assets/aeropress.svg';
import turtle from '../../assets/turtle.svg';
import rabbit from '../../assets/rabbit.svg';
import snail from '../../assets/snail.svg';
import app from '../../firebase';
import { getFirestore, collection, query, orderBy, onSnapshot } from "firebase/firestore";


export const RecipeList = () => {

    const [toggleMenu, toggleMenuSet] = useState(false);
    const [recipesArr, setRecipesArr] = useState([]);
    const [searchBar, setSearchBar] = useState('');
    const [filters, setFilters] = useState([]);
    const [time, setTime] = useState();

    const db = getFirestore(app);

    const newestBtn = useRef();
    const oldestBtn = useRef();
    const likesBtn = useRef()


    const getRecipes = async(sorting) => {
            const colRef = collection(db, 'recipes');

            if(sorting == null) {
                const getDocuments = onSnapshot(colRef, (snapshot) => {
                    const docArr = snapshot.docs.map((doc) => ( { data: doc.data(), id: doc.id}));
                    setRecipesArr(docArr.sort(() => Math.random() - 0.5));
                });
                return getDocuments;
            } else {
                const q = query(colRef, sorting);
                const getDocuments = onSnapshot(q, (snapshot) => {
                    setRecipesArr(snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id})))
                });
                return getDocuments;
            }
    }
    
    useEffect(()=>{
        getRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    function setFilter(el, name) {
        if(el.checked) {
            setFilters(prvState => [...prvState, name])
        } else {
            setFilters(prvState => prvState.filter(e => e !== name))
        }
    }


    function generateList(){
                let filteredArr = [];

                if(filters.length !== 0) {
                    recipesArr.forEach(e => {
                        return filters.every(el => Object.values(e.data).includes(el)) ? filteredArr.push(e) : null;
                    })
                } else {
                    filteredArr = [...recipesArr]
                }
                
                const searchArr = filteredArr.filter(e => e.data.title.toLowerCase().includes(searchBar.toLowerCase()) || e.data.description.toLowerCase().includes(searchBar.toLowerCase()) || e.data.author.toLowerCase().includes(searchBar.toLowerCase()));

                return (searchBar !== '' ? searchArr : filteredArr).map( el => {
                    function categoryImage () {
                        switch (el.data.category) {
                            case "aeropress":
                                return aeropress
                            case "chemex":
                                return chemex
                            case "frenchpress":
                                return frenchpress
                            case "drip":
                                return drip
                            default:
                                return chemex
                    }}

                        return (
                            <li key={el.id} className="recipe">
                                <div className="recipe-info">
                                    <p className="username">
                                        <i className="fa-solid fa-user"></i><span>{el.data.author}</span>
                                    </p>
            
                                    <div className="info">
                                        <div className="likes">
                                            <i className="fa-regular fa-heart"></i>
                                            <span> {el.data.likes}</span>
                                        </div>
                                        <div className="time">
                                            <p>{el.data.time}</p>
                                        </div>
                                        <img src={categoryImage()} alt={el.data.category}/>
                                    </div>
                                </div>
            
                                <h2>{el.data.title}</h2>
                                <p>{el.data.description}</p>
                            </li>
                        )
                })
            }

            function unCheck(id) {
                const arr = ['turtle', 'rabbit', 'snail'];
                
                for(const e of arr) {
                    if(e === id && document.getElementById(e).checked === true) {
                        document.getElementById(e).checked = true; 
                    } else {
                        document.getElementById(e).checked = false;
                    }
                }
            }

    return (
        <div className="container">
        <div className="content">
            <header className="page-2">
                <Link to="/">
                    <h1 className="logo">Alt<span>BREW</span></h1>
                </Link>
            </header>
            <form className="searchbar page-2">
                <input onChange={(e)=>setSearchBar(e.target.value)}/>
            </form>
            <form onClick={() => {
                    newestBtn.current.checked = false;
                    oldestBtn.current.checked = false;
                    likesBtn.current.checked = false;
                    getRecipes();
                }} className="random page-2">
                <p>Random <i className="fa-solid fa-mug-hot"></i></p>
            </form>
            <section className="list-content" >
                <ul className="recipe-list">
                {generateList()}
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
                                    <input type="checkbox"  onChange={(e)=>setFilter(e.target, 'light')} id="light-roast"/>
                                    <label className="l-roast" htmlFor="light-roast">
                                        <span className="bean"></span> Light
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(e)=>setFilter(e.target, 'medium')} id="medium-roast"/>
                                    <label className="m-roast" htmlFor="medium-roast">
                                        <span className="bean"></span> Medium
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(e)=>setFilter(e.target, 'medium/dark')} id="medium-dark-roast"/>
                                    <label className="md-roast" htmlFor="medium-dark-roast">
                                        <span className="bean"></span> Medium/Dark
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(e)=>setFilter(e.target, 'dark')} id="dark-roast"/>
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
                                    <input type="checkbox"  onChange={(e)=>setFilter(e.target, 'chemex')} id="chemex-checkbox"/>
                                    <label htmlFor="chemex-checkbox">
                                        <img src={chemex} alt="chemex"/>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(e)=>setFilter(e.target, 'drip')} id="drip-checkbox"/>
                                    <label htmlFor="drip-checkbox">
                                        <img src={drip} alt="drip"/>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(e)=>setFilter(e.target, 'aeropress')} id="aeropress-checkbox"/>
                                    <label htmlFor="aeropress-checkbox">
                                        <img src={aeropress} alt="aeropress"/>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox"  onChange={(e)=>setFilter(e.target, 'frenchpress')} id="french-p-checkbox"/>
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
                                    <input type="radio" name='sorting' ref={newestBtn} id="newest" onChange={()=> getRecipes(orderBy('posted', 'desc'))}/>
                                    <label htmlFor="newest">
                                        <i className="fa-solid fa-arrow-up"></i> Newest
                                    </label>
                                </div>
                                <div>
                                    <input type="radio" name='sorting' ref={oldestBtn} id="oldest" onChange={()=> getRecipes(orderBy('posted', 'asc'))}/>
                                    <label htmlFor="oldest">
                                        <i className="fa-solid fa-arrow-down"></i> Oldest
                                    </label>
                                </div>
                                <div>
                                    <input type="radio" name='sorting' ref={likesBtn} id="love" onChange={()=> getRecipes(orderBy('likes', 'desc'))}/>
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
                                    <input type="checkbox" name='time' id="rabbit" onClick={(e)=>unCheck(e.currentTarget.id)}/>
                                    <label htmlFor="rabbit">
                                        <img src={rabbit} alt="fast"/> 1 - 2 min
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" name='time' id="turtle" onClick={(e)=>unCheck(e.currentTarget.id)}/>
                                    <label htmlFor="turtle">
                                        <img src={turtle} alt="slow"/> 2 - 4 min
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" name='time' id="snail" onClick={(e)=>unCheck(e.currentTarget.id)}/>
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