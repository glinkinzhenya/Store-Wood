import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './BasicMenu.css';

export default function BasicMenu(props) {
  const { city, addresses, phoneNumbers } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='basic-button__flex'>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {city}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {addresses.map((address, index) => (
          <div key={index} className='basic-menu__flex'>
            <MenuItem onClick={handleClose}>
              <a className='basic-menu__flex-link' target='_blank' href={address.url}>
                {address.label}
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className='basic-menu__flex-link' href={`tel:${phoneNumbers[index]}`}>
                <img className='basic-menu__flex-link-image' src="./img/logo-telephone.svg" alt="" />
                {phoneNumbers[index]}
              </a>
            </MenuItem>
          </div>
        ))}
      </Menu>
    </div>
  );
}
