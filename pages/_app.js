import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import axios from 'axios';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = "http://localhost:4000";
  
  useEffect(()=>{
    const token = localStorage.getItem('friday_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);
  return <Component {...pageProps} />
}

export default MyApp
