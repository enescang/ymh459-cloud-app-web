import axios from "axios";
import { useEffect, useState } from "react";
import Header from '../components/common/Header';
import FileCard from "./common/FileCard/FileCard";

const UserFilePage = (props) => {

    const [userFiles, setUserFiles] = useState([]);

    useEffect(async () => {
        await load_files();
    }, [])

    const load_files = async () => {
        try {
            const { data } = await axios.get("/user/file/list");
            setUserFiles(data);
        } catch (error) {

        }
    }

    const ss = () => {
        alert(axios.defaults.headers.common['Authorization'])
    }

    return (
        <>
            <Header />

            {
                userFiles.map((file, index) => {
                    return (<>
                        <FileCard file_id={file._id} file_name={file.file_name} file_size={file.file_size} />
                    </>)
                })
            }

        </>)
}

export default UserFilePage;