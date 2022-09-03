import React from 'react';
import chemex from '../../../assets/chemex.svg'
import frenchpress from '../../../assets/french-press.svg'
import drip from '../../../assets/drip-v60.svg'
import aeropress from '../../../assets/aeropress.svg'

export const Body = () => {
  return (
    <div className="container">
        <div className="content">
            <header>
                <h1 className="logo">Alt<span>BREW</span></h1>
                <h2 className="greeting">So… What're we doing today?</h2>
            </header>
            <section className="category-container"> 
                <div className="chemex-btn">
                    <img src={chemex} alt="chemex" />
                </div>
                <div className="drip-btn">
                    <img src={drip} alt="drip"/>
                </div>        
                <div className="aeropress-btn">
                    <img src={aeropress} alt="aeropress"/>
                </div>
                <div className="frenchpress-btn">
                    <img src={frenchpress} alt="frenchpress"/>
                </div>
            </section>
            <form className="searchbar">
                <input type="text"/>
                <button>
                    <i className="fa-solid fa-magnifying-glass"/>
                </button>
            </form>
            <form className="random" >
                <p>Random <i className="fa-solid fa-mug-hot"/></p>
            </form>
        </div>
        <footer>© 2022 Konrad Synowiec - syn400, Wszystkie prawa zastrzeżone.</footer> 
    </div>
  )
}