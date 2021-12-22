import axios from "axios";
import { useEffect, useState } from "react";
import Header from '../components/common/Header';
import FileCard from "./common/FileCard/FileCard";

const UserFilePage = (props) => {

    const [userInfo, setUserInfo] = useState(null);
    const [userFiles, setUserFiles] = useState([]);

    useEffect(async () => {
        await load_user_info();
        await load_files();
    }, [])

    const load_files = async () => {
        try {
            const { data } = await axios.get("/user/file/list");
            setUserFiles(data);
        } catch (error) {

        }
    }

    const load_user_info = async () => {
        try {
            const { data } = await axios.get("/user/info");
            setUserInfo(data.info);
        } catch (error) {

        }
    }

    const ss = () => {
        alert(axios.defaults.headers.common['Authorization'])
    }

    if(userInfo == null){
        return <><span>Loading...</span></>
    }

    return (
        <>
            <Header />
            <div className="flex flex-wrap w-full">
            {
                userFiles.map((file, index) => {
                    return (<>
                        <FileCard file={file} user_info={userInfo} />
                    </>)
                })
            }
            </div>
        </>)
}

export default UserFilePage;