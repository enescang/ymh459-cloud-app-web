import axios from "axios";
import LoginPage from "../components/LoginPage";
import UserFilePage from "../components/UserFilePage";
import Router from 'next/router'
import { useEffect } from "react";

const MainProgress = (props) => {

    useEffect(() => {
        const has_jwt = axios.defaults.headers.common['Authorization'] !== undefined;
        if (has_jwt == false) {
            return Router.push('/login');
        }
        return Router.push('/files');
    }, []);
    return null;

}

export default MainProgress;