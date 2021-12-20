import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = "http://localhost:4000";

  const [start_app, setStartApp] = useState(false);
  
  useEffect(()=>{
    const token = localStorage.getItem('friday_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setTimeout(()=>{
      setStartApp(true);
    }, 0)
  }, []);

  if(start_app == false)
    return <div>Loading...</div>
  return <Component {...pageProps} />
}

export default MyApp
