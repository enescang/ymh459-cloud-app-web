import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import base64_data from './base64';
import dynamic from 'next/dynamic'

const CLASS = {
    main_div: "max-w-sm rounded overflow-hidden shadow-lg border-8 border-indigo-600 m-4",
    span_badge: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",
}

const FileCard = (props) => {

    const [RSA_PRIVATE_KEY, setRSA_PRIVATE_KEY] = useState(null);

    const { file, user_info } = props;
    const { file_name, file_size, file_mime } = file;

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
            const { file: { _id } } = props;
            const new_axios = axios.create();
            const { data } = await axios.get(`/file/download?file_id=${_id}`);
            console.log("DOWNLOADED FILE URL:", data);
            delete new_axios.defaults.headers.common['Authorization'];
            const { data: file_data } = await new_axios.get(`${data}`, { responseType: "text" });
            console.log("DOWNLOADED FILE DATA:", file_data);

            return file_data;
        } catch (error) {
            console.log("ERROR DOWNLOADING FILE", error);
            return { error };
        }
    }

    const get_unencrypted_aes_key = async () => {
        const JSEncrypt = require("jsencrypt").default;
        let { public_key } = user_info;
        console.log("PUBLIC KEY", public_key);

        const private_key = `
        -----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQDAoj/CrK3n/2SfEyiRgtsAvCDVNt3brE7NTYHFVWheyZHkwkJI
rKBgAWM4d+lXdW6JMkrpFmg2YLulZQ5o3TYLQVqvvP52G7kLMQEJgRP2AT9gFK4c
aN2aYy1oF3+dvAVmRBLKHBLtMjsWr8QzFtmz4rLiQD5rni4I2+wbcUiFswIDAQAB
AoGAHRWiONtnmnqmD5qN6oJuXIsLDgYtsygt8bN9H3VIv98BRx/JcD2YLUaoW3NH
aOwTF2Xfh5fZfjRWwJ8kcNLNgNwaEJMhXFuwg3burMsS3zSxXxSvIdXEPOb1VAYm
08GBUmMc6ZT0RtlrIirsaow2qf5Ibh+ZFuKSmnnbRlxws9kCQQD2/7RyL3lWj65W
9vajl4p0fdxUkiJ4Ioaz+UTLwlpM3Ply5H+xh5qvMHxv/a0KeYqOe+sVoggPt+e+
3+6OXF5/AkEAx6dc8+GncbP0Ahxl3jF2c/tX+WI0VdXWNVD8N51xlKTYOZdPxmsK
IYF3tYCUkmlDTjOXd2sXRQ0JlZBs87YmzQJADke4WgWuoTeLX9HFbq3bPmLscyND
xOhSG2Ok+5bP+7Om5GKbk1sAsXI/L4ZeE8X1Icm+TLDigG4kgt+VfjuO5wJAd0n7
EshPmHMRprU69DAPeyrAnINdi6+RJhf2KnCKrWp0uqw6gO3xhqVpVeu2WWhFS5Mt
u68jnyE0CcXaIx9BPQJASMLWXUDWKw6BUcKfg6qbmIfnLutCCGRwlLHynI3BL96O
EXkiG/uzxJ2LcQpSTGduZq2XSE28Ey6M5/9oUk8LXA==
-----END RSA PRIVATE KEY-----`;

        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey(private_key);
        var uncrypted = decrypt.decrypt(props.file.encrypted_aes_key);
        console.log("UNCRYPTED", uncrypted)
        return uncrypted;
    }

    const decrypt_file = async () => {
        // if(!RSA_PRIVATE_KEY) {
        //     return alert("Lütfen RSA Private Key'inizi giriniz.");
        // }
        const { file } = props;
        const cipher_text = await download_file()
        const uncrypted_aes = await get_unencrypted_aes_key();

        let bytes = CryptoJS.AES.decrypt(cipher_text, uncrypted_aes);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log("DECRYPTED", originalText.length)
        console.log("DECRYPTED", originalText)

        const get_as_a_file = await dataUrlToFile(originalText, file.file_name, file.file_mime);
        console.log("GET AS A FILE", get_as_a_file)
        return originalText;
    }

    const convert_from_base64 = async (base64_data) => {
        // const dec = CryptoJS.enc.Base64.parse(base64_data);
        // console.log("convert_from_base64DEC -> CryptoJS.enc.Base64:", dec.toString(CryptoJS.enc.Base64));
        // const base64_to_string = dec.toString(CryptoJS.enc.Base64);
        // const last = decode_base64(base64_to_string);
        // console.log("LAST -> CryptoJS.enc.Base64:", last);
        // return last;
        // return dec.toString(CryptoJS.enc.Base64);

        // const data = base64_data
        // let  base64Data,binaryData;

        // base64Data = data.replace(/^data:image\/png;base64,/, "");
        // base64Data += base64Data.replace('+', ' ');
        // binaryData = new Buffer(base64Data, 'base64').toString('binary');
        // console.log("BINARY DATA ", binaryData)
        if(!file_mime.match(/text/)) {
            window.open(`data:${file_mime};base64,${base64_data}`, "_blank");
            return "not_text";
        }
        // return binaryData;

        const t = decodeURIComponent(atob(base64_data).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        console.log("CONVERTED", t)
        return t
    }

    const convert_from_ascii = async (base64_data) => {
        // return base64_data;
        const strarr = base64_data.split(",")
        let result = "";
        for (let i = 0; i < strarr.length; i++) {
            let elem = parseInt(strarr[i]);
            if (elem < 0) {
                elem = 256 - Math.abs(elem);
            } else {
                elem = elem;
            }
            if (i < 100) {
                console.log("ELEM", elem, String.fromCharCode(elem))
            }
            result += String.fromCharCode(elem);
        }
        return result
    }

    async function dataUrlToFile(data, fileName, file_mime) {
        var file_utf8_content = await convert_from_base64(data); //here we load our csv data
        if(file_utf8_content == "not_text") {
            return;
        }
        var blob = new Blob([file_utf8_content], {
            type: "octet/stream"
        });

        ///
        // var reader = new FileReader();
        // var fileByteArray = [];
        // reader.readAsArrayBuffer(blob);
        // reader.onloadend = function (evt) {
        //     if (evt.target.readyState == FileReader.DONE) {
        //         var arrayBuffer = evt.target.result,
        //             array = new Uint8Array(arrayBuffer);
        //         for (var i = 0; i < array.length; i++) {
        //             fileByteArray.push(array[i]);
        //         }
        //     }
        // }
        // console.log("FILE BYTE ARRAY", fileByteArray)
        //
        var a = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = file_name;
        a.click();
        window.URL.revokeObjectURL(url);
        return "NNNNNN"
    }


    /*
    const decrypt_aes = async() => {
        const JSEncrypt = require("jsencrypt").default;
        let { public_key } = user_info;
        console.log("PUBLIC KEY", public_key)

        const private_key = `-----BEGIN RSA PRIVATE KEY-----
        -----END RSA PRIVATE KEY-----`


        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey(private_key);
        var uncrypted = decrypt.decrypt(props.file.encrypted_aes_key);
        console.log("UNCRYPTED", uncrypted)

        const tt = await decryptMessage(uncrypted, base64_data);

        console.log("RESULT", tt)
    }

    async function decryptMessage(key, ciphertext) {
        const iv = ctUint8("a6be693987489c285d09b35e0a01a213").slice(0, 16);
        console.log("IV", iv, ciphertext)
        if (!window)
            return
        const keyData = await importKey(key)
        // const cipherTextX = fromBase64(ciphertext).slice(16);
        const ss = str2ab(ciphertext)
        return window.crypto.subtle.decrypt(
            {
                name: "AES-CBC",
                iv: iv,
                tagLength: 256,
            },
            keyData,
            ss,
        );
    }

    async function importKey(key_data) {
        const keyx = fromHex(key_data);
        console.log("IMPORT KEY: ", keyx)
        var key = await window.crypto.subtle.importKey(
            "raw",
            keyx,
            { name: "AES-CBC", hash: "SHA-256" },
            false,
            ["decrypt", "encrypt"]
        );
        return key;
    }

    function str2ab(str) {
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    const fromHex = hexString => new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const fromBase64 = base64String => Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
    const ctUint8 = (ctStr)=> new Uint8Array(ctStr.match(/[\s\S]/g).map(ch => ch.charCodeAt(0)));
    */

    const enxAes = (key) => {
        window.crypto.subtle.encrypt(
            {
                name: "AES-CBC",
                //Don't re-use initialization vectors!
                //Always generate a new iv every time your encrypt!
                iv: window.crypto.getRandomValues(new Uint8Array(16)),
            },
            key, //from generateKey or importKey above
            str2ab("enesQ") //ArrayBuffer of data you want to encrypt
        )
            .then(function (encrypted) {
                //returns an ArrayBuffer containing the encrypted data
                console.log(new Uint8Array(encrypted));
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    return (
        <>
            <div className={CLASS.main_div} style={{width:"20rem"}}>
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
                        onClick={decrypt_file}
                    >
                        İndir
                    </span>
                </div>
            </div>

        </>
    )
}

FileCard.propTypes = {

}

export default FileCard;