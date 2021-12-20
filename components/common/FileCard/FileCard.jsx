import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import base64_data from './base64';
import dynamic from 'next/dynamic'

const CLASS = {
    main_div: "max-w-sm rounded overflow-hidden shadow-lg border-8 border-indigo-600 m-4",
    span_badge: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",
}

const FileCard = (props) => {

    const { file, user_info } = props;
    const { file_name, file_size } = file;

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

    const decrypt_aes = async() => {
        const JSEncrypt = require("jsencrypt").default;
        let { public_key } = user_info;
        console.log("PUBLIC KEY", public_key)

        const private_key = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQC1WCm8dM2ZmGxIcaPaNtWUuzebhitPQ4QDi31WG4iz3u6zdcBJ
MgwWxJ0JvHo1qK34lTBJgVyQjLO7Wlcr+RzuvVLIqHrZnj41Jdg6Ou8bLTW9ls/I
BOoLHy4QF+bAjmi5U9915kUiR84VsyVCKAoietEFcul2uoKLDbTmcWpMeQIDAQAB
AoGAAzbxoHVamq0syDj5fFoJ/bW25eMiO+i4u55apa7dxMCALz64XqPMOpAYL46/
hNl9YgF1BmyMYUSZQAo5Lt6e4GXLBd1VEgo7e6DOZvoDae/edQlLUkhuPjC4LGhq
rWneKzsMy7fHT2BVkMGfaqjN9owr+wCHgsDaF+C0KU3s1L0CQQD/pnywc44WrNkO
bsm6vNCet70k2vCyZQMgHyVdv81a2j/bgmJcimJG6APDBIibC4ekG0PLDqevPa9b
AMFdicolAkEAtZeomxtuR35wk3deq6GHCZXEHz5eSmpzmBI/0fytx2XoNN+UNdKD
tDor5hA++8CNQcwjtmU9sY/zC6oPy0tmxQJAVnliQ+1Saqkc4pzm75teldFg0U6d
jDpOzFa8tPFj7Q9V+lIoI1VL2OAyJY0rCAbmYsQ2MkFKxyP+ZLHktlcdYQJAOzDO
ApD0Z1VteIPmVed2zscEgHKh5XvBZgY8y0OjmWU8RU/DTa/qwipb+Me+3+ypnpLd
6Swi6efT/y9VqpxPSQJAYuPj5hc4uvf+PI52qPhOXgaV86Q9sVS1Qx3jaQmbzYSf
GyugZt04Dp9rQjE9dTBLlTIamm55XnW+Y6dnJmxmrw==
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


    const enxAes = (key)=> {
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
        .then(function(encrypted){
            //returns an ArrayBuffer containing the encrypted data
            console.log(new Uint8Array(encrypted));
        })
        .catch(function(err){
            console.error(err);
        });
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
                        onClick={decrypt_aes}
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