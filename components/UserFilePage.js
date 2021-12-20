import axios from "axios";
import { useEffect, useState } from "react";

const UserFilePage = (props) => {

    const [userFiles, setUserFiles] = useState([]);

    useEffect(async() => {
        await load_files();
    }, [])

    const load_files = async()=>{
        try {
            const {data} = await axios.get("/user/file/list");
        } catch (error) {
            
        }
    }

    const ss = ()=>{
        alert(axios.defaults.headers.common['Authorization'])
    }

    return (<>
        <span onClick={ss}>asd</span>

    </>)
}

export default UserFilePage;