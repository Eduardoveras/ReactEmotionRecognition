import React from 'react';
import logo from '../../assets/images/logosdec.png';

const Menu = () => {
  return (
    <div className="sidenav">
      <img alt="yolo" className="logo" src={logo} />
      <a href="/login" >Login</a>
      <a href="/" >Home</a>
      <a href="/reports">Reportes</a>
      <a href="/statistics">Estadisticas</a>
      <a href="/">Manuales</a>
    </div>
  );
};


export default Menu;
