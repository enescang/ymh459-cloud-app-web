import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Router from 'next/router'

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = "https://ymh459-cloud-app-api.herokuapp.com";

  const [start_app, setStartApp] = useState(false);

  useEffect(() => {
    setInterceptors();
    const token = localStorage.getItem('friday_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setTimeout(() => {
      setStartApp(true);
    }, 0)
  }, []);

  const setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            localStorage.removeItem("friday_token");
            axios.defaults.headers.common['Authorization'] = null;
            Router.push('/login');
          }
          throw err;
        });
      }
    );
  };


  if (start_app == false)
    return <div>Loading...</div>
  return <Component {...pageProps} />
}

export default MyApp
