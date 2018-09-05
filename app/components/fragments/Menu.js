import React from 'react';
import logo from '../../assets/images/logosdec.png';

const Menu = () => {
  return (
    <div className="sidenav">
      <img alt="yolo" className="logo" src={logo} />
      <a href="/" >Login</a>
      <a href="/home" >Home</a>
      <a href="/reports">Reportes</a>
      <a href="/statistics">Estadisticas</a>
      <a href="/">Manuales</a>
    </div>
  );
};

export default Menu;
