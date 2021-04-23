import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavbarText.css";

const NavbarPage = () => {
  const BoleanBotton = () => {
    const navigation = document.querySelector('.navigation')
    document.querySelector('.toggle').onclick = function(){
      this.classList.toggle('active');
      navigation.classList.toggle('active')
    }
  }
  return (
    <div className="body">
      <div className="navigation">
        <div className="toggle" onClick={BoleanBotton}></div>
      </div>
    </div>
  );
};
export default NavbarPage;
