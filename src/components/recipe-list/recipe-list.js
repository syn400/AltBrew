import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { React, useEffect, useState, useRef} from 'react'
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
import { motion } from "framer-motion"


export const RecipeList = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    
    const [method, setMethod] = useState([]);
    const [toggleMenu, toggleMenuSet] = useState(false);
    const [recipesArr, setRecipesArr] = useState([]);
    const [searchBar, setSearchBar] = useState(searchParams.get('search') !== null ? searchParams.get('search') : '');
    const [time, setTime] = useState([]);
    const [roast, setRoast] = useState([]);

    const db = getFirestore(app);
    const history = useNavigate();

    const newestBtn = useRef();
    const oldestBtn = useRef();
    const likesBtn = useRef()

    const rabbitBtn = useRef();
    const snailBtn = useRef();
    const turtleBtn = useRef();

    useEffect(() => {
        if(searchParams.get('category') !== null) {
            const category = searchParams.get('category');

            if(category === 'frenchpress') {
                setFilter(document.getElementById(`french-p-checkbox`), 'frenchpress', 'method');
            } else {
                setFilter(document.getElementById(`${category}-checkbox`), category, 'method');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
    
    function setFilter(el, name, filter) {
        if(el.checked) {
            filter === 'method' ? setMethod(prvState => [...prvState, name]) : setRoast(prvState => [...prvState, name]);
        } else {
            filter === 'method' ? setMethod(prvState => prvState.filter(e => e !== name)) : setRoast(prvState => prvState.filter(e => e !== name));
        }
    }


    function generateList(){
                let filteredArr = [];

                if(method.length !== 0 || roast.length !== 0 || time.length !== 0) {
                    recipesArr.forEach(e => {
                        let a = e.data.time.split(':');
                        let toSeconds = (+a[0]) * 60 + (+a[1]); 

                        if(method.length !== 0 && roast.length === 0 && time.length === 0) {
                            return method.some(r => Object.values(e.data).includes(r)) ? filteredArr.push(e) : null;

                        } else if(method.length === 0 && roast.length !== 0 && time.length === 0) {
                            return roast.some(r => Object.values(e.data).includes(r)) ? filteredArr.push(e) : null;

                        } else if(method.length === 0 && roast.length === 0 && time.length !== 0) {
                            return toSeconds >= time[0] && toSeconds <= time[1]  ? filteredArr.push(e) : null;

                        } else if(method.length !== 0 && roast.length !== 0 && time.length === 0) {
                            return method.some(r => Object.values(e.data).includes(r)) 
                                && roast.some(r => Object.values(e.data).includes(r)) ? filteredArr.push(e) : null;

                        } else if(method.length !== 0 && roast.length !== 0 && time.length !== 0) {
                            return method.some(r => Object.values(e.data).includes(r)) 
                                && roast.some(r => Object.values(e.data).includes(r)) 
                                && toSeconds >= time[0] && toSeconds <= time[1]  ? filteredArr.push(e) : null;

                        } else if(method.length === 0 && roast.length !== 0 && time.length !== 0) {
                            return roast.some(r => Object.values(e.data).includes(r)) 
                                && toSeconds >= time[0] && toSeconds <= time[1]  ? filteredArr.push(e) : null;

                        } else if(method.length !== 0 && roast.length === 0 && time.length !== 0) {
                            return method.some(r => Object.values(e.data).includes(r)) 
                                && toSeconds >= time[0] && toSeconds <= time[1]  ? filteredArr.push(e) : null;

                        }
                    });
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
                        switch (id) {
                            case 'snail':
                                setTime([240, 99999])
                                break;
                            case 'turtle':
                                setTime([120, 240])
                                break;
                            case 'rabbit':
                                setTime([60, 120])
                                break;
                            default:
                                break;
                        }
                        document.getElementById(e).checked = true;

                    } else {
                        document.getElementById(e).checked = false;
                    }
                }
                
                if(!snailBtn.current.checked && !turtleBtn.current.checked && !rabbitBtn.current.checked) {
                    setTime([]);
                }
            }

    return (
        <motion.div 
        initial={{ opacity: .5 }}
        animate={{ opacity: 1 }}
        className="container">
        <div className="content">
            <header className="page-2">
                <Link to="/">
                    <h1 className="logo">Alt<span>BREW</span></h1>
                </Link>
            </header>
            <form onSubmit={(e) => e.preventDefault()} className="searchbar page-2">
                <input defaultValue={searchParams.get('search') !== null ? searchParams.get('search') : ''} onChange={(e)=>setSearchBar(e.target.value)}/>
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
                                    <input type="checkbox"  onChange={(e)=>setFilter(e.target, 'light', 'roast')} id="light-roast"/>
                                    <label className="l-roast" htmlFor="light-roast">
                                        <span className="bean"></span> Light
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(e)=>setFilter(e.target, 'medium', 'roast')} id="medium-roast"/>
                                    <label className="m-roast" htmlFor="medium-roast">
                                        <span className="bean"></span> Medium
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(e)=>setFilter(e.target, 'medium/dark', 'roast')} id="medium-dark-roast"/>
                                    <label className="md-roast" htmlFor="medium-dark-roast">
                                        <span className="bean"></span> Medium/Dark
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(e)=>setFilter(e.target, 'dark', 'roast')} id="dark-roast"/>
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
                                    <input type="checkbox" defaultChecked={searchParams.get('category') === 'chemex'} onChange={(e)=>setFilter(e.target, 'chemex', 'method')} id="chemex-checkbox"/>
                                    <label htmlFor="chemex-checkbox">
                                        <img src={chemex} alt="chemex"/>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" defaultChecked={searchParams.get('category') === 'drip'} onChange={(e)=>setFilter(e.target, 'drip', 'method')} id="drip-checkbox"/>
                                    <label htmlFor="drip-checkbox">
                                        <img src={drip} alt="drip"/>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" defaultChecked={searchParams.get('category') === 'aeropress'} onChange={(e)=>setFilter(e.target, 'aeropress', 'method')} id="aeropress-checkbox"/>
                                    <label htmlFor="aeropress-checkbox">
                                        <img src={aeropress} alt="aeropress"/>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" defaultChecked={searchParams.get('category') === 'frenchpress'}  onChange={(e)=>setFilter(e.target, 'frenchpress', 'method')} id="french-p-checkbox"/>
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
                                    <input type="checkbox" name='time' ref={rabbitBtn} id="rabbit" onClick={(e)=>unCheck(e.currentTarget.id)}/>
                                    <label htmlFor="rabbit">
                                        <img src={rabbit} alt="fast"/> 1 - 2 min
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" name='time' ref={turtleBtn} id="turtle" onClick={(e)=>unCheck(e.currentTarget.id)}/>
                                    <label htmlFor="turtle">
                                        <img src={turtle} alt="slow"/> 2 - 4 min
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" name='time' ref={snailBtn} id="snail" onClick={(e)=>unCheck(e.currentTarget.id)}/>
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
    </motion.div>
    )
}