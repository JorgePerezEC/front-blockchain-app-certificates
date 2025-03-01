import React from 'react';
import { useUserHash } from '../../contexts/UserHashContext';
import { useMetaMask } from '../../hooks/useMetaMask';
import '../../assets/styles/connect-style.css';

import logo from '../../assets/img/SVG_MetaMask_Icon_Color.svg';
import logoIster from '../../assets/img/logo-blanco.png';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const ConnectMetaMask = () => {
  const { account } = useMetaMask();
  const { userHash, setUserHash } = useUserHash();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const connectWallet = async () => {
    handleOpen();
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserHash(accounts[0]);
      } catch (error) {
        console.error(error);
        handleClose();
      }
    } else {
      console.error('MetaMask is not installed.');
      handleClose();
    }
  };

  return (
    <Container maxWidth="sm" 
    sx={{
      p: 2,
      bgcolor: '#374F64',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      minWidth: '100vw'
    }} >
      <Paper
        sx={{
          p: 2,
          bgcolor: '#0091BE',
          borderRadius: 4,
          maxWidth: 400,
          minWidth: 400,
          minHeight: 500,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
        elevation={6}
      >
        <img src={logoIster} alt="IsterLogo" style={{  maxWidth: '100%', marginBottom: '17%', filter: 'drop-shadow(2px 1px 1px rgba(0, 0, 0, 0.7))'}} />
        <h2 style={{ color: 'white', marginBottom: '20%' }}>WEBPAGE NAME</h2>
        <Button className='btn-connect-meta' variant="contained" onClick={connectWallet} >
          <p className='btn-text'>Conectar Billetera MetaMask</p>
          <img src={logo} alt="MetaMask" style={{  maxHeight: '40px' }} />
        </Button>
        <p className='text-hint'>Para acceder por favor conecta tu billetera Metamask</p>
      </Paper>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default ConnectMetaMask;
