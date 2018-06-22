/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import { Link } from 'react-router-dom';


const Menu = () => {
  return (
    <div className="sidenav">
      <img alt="yolo" className="logo" src="../assets/images/logosdec.png" />
      <a href="/" >Home</a>
      <a href="/reports">Reportes</a>
      <a href="/statistics">Estadisticas</a>
      <a href="/">Manuales</a>
    </div>
  );
};


export default Menu;
