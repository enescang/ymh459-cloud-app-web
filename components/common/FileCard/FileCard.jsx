import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


const CLASS = {
    main_div: "max-w-sm rounded overflow-hidden shadow-lg border-8 border-indigo-600 m-4",
    span_badge: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",
}

const FileCard = (props) => {


    const { file_name, file_size } = props;

    const size_converter = (size) => {
        if (size < 1024) {
            return `${size} bytes`;
        } else if (size < 1048576) {
            return `${(size / 1024).toFixed(2)} KB`;
        } else if (size < 1073741824) {
            return `${(size / 1048576).toFixed(2)} MB`;
        }
    }

    const download_file = async () => {
        try {
            const { file_id } = props;
            const { data } = await axios.get(`/file/download?file_id=${file_id}`);
            window.open(data, "_blank");
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <div className={CLASS.main_div}>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{file_name}</div>
                    <p className="text-gray-700 text-base">
                        Dosyanız şuan şifreli haldedir.
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span
                        className={CLASS.span_badge}>
                        {size_converter(file_size)}
                    </span>

                    <span
                        className={CLASS.span_badge}
                        onClick={download_file}
                        >
                        İndir
                    </span>
                </div>
            </div>

        </>
    )
}

FileCard.propTypes = {
    file_name: PropTypes.string.isRequired,
    file_size: PropTypes.string.isRequired,
    file_id: PropTypes.string.isRequired,
}

export default FileCard;