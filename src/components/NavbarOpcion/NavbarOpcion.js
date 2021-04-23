import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavbarOpcion.css";

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
        <ul>
          <li>
            <a href="#">
              <span className="icon"></span>
              <span className="title">Home</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon"></span>
              <span className="title">Profile</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon"></span>
              <span className="title">Public</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon"></span>
              <span className="title">Sing Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavbarPage;
