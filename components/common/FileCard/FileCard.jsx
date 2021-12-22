import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import base64_data from './base64';
import dynamic from 'next/dynamic'
import Modal from 'react-modal';

const CLASS = {
    main_div: "max-w-sm rounded overflow-hidden shadow-lg border-8 border-indigo-600 m-4",
    span_badge: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",
}

const FileCard = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [RSA_PRIVATE_KEY, setRSA_PRIVATE_KEY] = useState(null);
    const [currentStage, setCurrentStage] = useState("Dosyanız şuan şifreli haldedir.");

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
            setCurrentStage("Dosya bilgisi alınıyor...");

            const { data } = await axios.get(`/file/download?file_id=${_id}`);
            console.log("DOWNLOADED FILE URL:", data);

            setCurrentStage("Dosya indiriliyor...");
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
        try{
            setCurrentStage("RSA anahtarınız kontrol ediliyor...");
            const JSEncrypt = require("jsencrypt").default;
            let { public_key } = user_info;
            console.log("PUBLIC KEY", public_key);
    
            let private_key = null;
            private_key = RSA_PRIVATE_KEY;
    
            var decrypt = new JSEncrypt();
            decrypt.setPrivateKey(private_key);
            var uncrypted = decrypt.decrypt(props.file.encrypted_aes_key);
            console.log("UNCRYPTED", uncrypted)
            return uncrypted;
        }catch(err){
            return false;
        }
    }

    const decrypt_file = async () => {
        if(!RSA_PRIVATE_KEY) {
            setShowModal(true);
            return;
        }
        const { file } = props;
        const cipher_text = await download_file()
        const uncrypted_aes = await get_unencrypted_aes_key();
        if(!uncrypted_aes) {
            setCurrentStage("RSA anahtarınız hatalı!");
            alert("RSA anahtarınız hatalı. Lütfen doğru anahtarınızı giriniz.");
            setRSA_PRIVATE_KEY(null);
            return;
        }

        setCurrentStage("Dosya şifresi çözülüyor...");
        let bytes = CryptoJS.AES.decrypt(cipher_text, uncrypted_aes);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log("DECRYPTED", originalText.length)
        console.log("DECRYPTED", originalText)

        setCurrentStage("Sizin için dosyanızı oluşturuyoruz...");
        const get_as_a_file = await dataUrlToFile(originalText, file.file_name, file.file_mime);
        console.log("GET AS A FILE", get_as_a_file)
        setCurrentStage("Dosyanız hazır!");
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

    const RsaModal = ()=> {
        let subtitle;
        const [modalIsOpen, setIsOpen] = React.useState(true);

        useEffect(()=>{
            openModal();
        }, [props.show])
      
        function openModal() {
          setIsOpen(true);
        }
      
        function afterOpenModal() {
          // references are now sync'd and can be accessed.
          subtitle.style.color = '#f00';
        }
      
        function closeModal() {
          setIsOpen(false);
          setShowModal(false);
        }

        const customStyles = {
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          };
      
        return (
          <div>
            {/* <button onClick={openModal}>Open Modal</button> */}
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Lütfen Private RSA Anahtarını Giriniz</h2>
              <button onClick={closeModal}>Kapat</button>
              <form>
                <textarea
                onChange={(event)=>{
                    setRSA_PRIVATE_KEY(event.target.value);
                }}
                value={RSA_PRIVATE_KEY}
                ></textarea>
                {/* <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button> */}
              </form>
            </Modal>
          </div>
        );
      }

    return (
        <>
        {
            showModal ? <RsaModal show={showModal} />: ""
        }
            <div className={CLASS.main_div} style={{width:"20rem"}}>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{file_name}</div>
                    <p className={currentStage.match(/hata/) ? "text-red-500 text-base" : "text-gray-700 text-base"}>
                        {currentStage}
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