import YouTube from 'react-youtube';
import BasicCard from '../../components/BasicCard';

const About = () => {
    return (
        <div className="container mx-auto">
            <div class="flex justify-center items-center mt-4">
                <div class="text-center bg-blue-400  p-4">
                    <h1 class="text-3xl">Friday Team FilEncrypted</h1>
                </div>
            </div>
            <p className="text-center text-2xl text-blue-400"><a href="/">Web Sitemiz</a></p>

            <div className="flex flexrap flex-col md:flex-row justify-evenly items-center">
                <div className="m-4">
                    <img className="rounded-full" src="enes.jpg" />
                    <p className="text-center">Enes Can Güneş</p>
                    <p className="text-center">200541078</p>
                </div>
                <div className="m-4">
                    <img className="rounded-full" src="yasir.jpg" width="200px" />
                    <p className="text-center">Yasir Seyyithan Karadağ</p>
                    <p className="text-center">200541074</p>
                </div>
                <div className="m-4">
                    <img className="rounded-full" src="cemal.jpg" width="200px" />
                    <p className="text-center">Cemal Tiryaki</p>
                    <p className="text-center">180541026</p>
                </div>
            </div>

            <div className="flex flexrap flex-col md:flex-row justify-evenly items-center">
                <div className="m-4">
                    <img className="rounded-full" src="karamemis.jpg"  width="200px" />
                    <p className="text-center">Batuhan Karamemiş</p>
                    <p className="text-center">205541071</p>
                </div>
                <div className="m-4">
                    <img className="rounded-full" src="batuhan.jpg" width="200px" />
                    <p className="text-center">Batuhan Çakıroğlu</p>
                    <p className="text-center">200541081</p>
                </div>
                <div className="m-4">
                    <img className="rounded-full" src="mahmut.jpg" width="200px" />
                    <p className="text-center">Mahmut Altunkaya</p>
                    <p className="text-center">170541018</p>
                </div>
                <div className="m-4">
                    <img className="rounded-full" src="bekir.jpg" width="200px" />
                    <p className="text-center">Bekir Öndeş</p>
                    <p className="text-center">175541008</p>
                </div>
            </div>

            <p className="text-center text-3xl">Github Repoları</p>
            <p className="text-center">Repolar public olarak düzenlendi.</p>
            <div className="flex justify-center">
                <div className="m-2">
                    <a
                        href="https://github.com/enescang/ymh459-cloud-app-api"
                        target="_blank"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0" y="0"
                            width="32px" height="32px" viewBox="0 0 438.549 438.549"
                            xmlSpace="preserve">
                            <path d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365
		c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63
		c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996
		c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136
		c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559
		c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559
		c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997
		c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851
		c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136
		c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41
		c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126
		c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817
		c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994
		c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849
		c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24
		c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979
		c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146
		c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995
		c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906
		C438.536,184.851,428.728,148.168,409.132,114.573z" />
                        </svg> <span>API - Backend</span>
                    </a>
                </div>

                <div className="m-2">
                    <a
                        href="https://github.com/enescang/ymh459-cloud-app-mobil"
                        target="_blank"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0" y="0"
                            width="32px" height="32px" viewBox="0 0 438.549 438.549"
                            xmlSpace="preserve">
                            <path d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365
		c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63
		c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996
		c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136
		c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559
		c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559
		c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997
		c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851
		c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136
		c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41
		c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126
		c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817
		c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994
		c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849
		c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24
		c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979
		c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146
		c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995
		c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906
		C438.536,184.851,428.728,148.168,409.132,114.573z" />
                        </svg>
                        <span>Mobil</span>
                    </a>
                </div>

                <div className="m-2">
                    <a
                        href="https://github.com/enescang/ymh459-cloud-app-web"
                        target="_blank"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0" y="0"
                            width="32px" height="32px" viewBox="0 0 438.549 438.549"
                            xmlSpace="preserve">
                            <path d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365
		c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63
		c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996
		c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136
		c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559
		c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559
		c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997
		c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851
		c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136
		c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41
		c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126
		c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817
		c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994
		c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849
		c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24
		c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979
		c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146
		c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995
		c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906
		C438.536,184.851,428.728,148.168,409.132,114.573z" />
                        </svg>
                        <span>Web</span>
                    </a>
                </div>

                <div>

                </div>
            </div>

            <p className="text-center text-3xl">Dökümanlar</p>
            <div className="flex justify-center">
            <div className="m-2">
                    <a
                        href="https://docs.google.com/document/d/13FE1uyutLuJkp87YumQHWeK7JPUZxdADaNyk0D9eTX8/edit?usp=sharing"
                        target="_blank"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <span>Ekip</span>
                    </a>
                </div>

                <div className="m-2">
                    <a
                        href="https://docs.google.com/document/d/13zMK4DFD9w50eq4C5L6DYBplOMLIcw1P/edit"
                        target="_blank"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <span>Uygulama Raporu</span>
                    </a>
                </div>

                <div className="m-2">
                    <a
                        href="https://drive.google.com/file/d/17oydEqT6LVqGOBrWCFSyDZUpSb3f9lZP/view?usp=sharing"
                        target="_blank"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <span>Kullanıcı El Klavuzu</span>
                    </a>
                </div>

                <div className="m-2">
                    <a
                        href="result.mp4"
                        target="_blank"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <span>Sunum Videosu</span>
                    </a>
                </div>

                <div className="m-2">
                    <a
                        href="https://drive.google.com/file/d/1jqdaiJj3u_cFAHnzqmaCzpzXE2We_AhL/view?usp=sharing"
                        target="_blank"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <span>Postman Listesi</span>
                    </a>
                </div>

                <div className="m-2">
                    <a
                        href="tech_stack.mp4"
                        target="_blank"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <span>Kullanılan Teknolojiler</span>
                    </a>
                </div>

                <div>

                </div>
            </div>

            <p className="text-center text-3xl">Yotube videolarımız:</p>
            <div class="grid grid-cols-1 gap-2 md:grid-cols-2">

                <div>
                    <BasicCard
                        title="Planlama ve İlk Toplantı (7 güzel adam)"
                        content="Neler Yapıyoruz?"
                        videoId="xnG9--zE0_g"
                    />
                </div>

                <div>
                    <BasicCard
                        title="En İyi Ürünü Müşteriyi En Çok Anlayan Yapabilir"
                        content="Şifrelemeler, dosyalar, arayüzler..."
                        videoId="G_GRR1Scns8"
                    />
                </div>

                <div>
                    <BasicCard
                        title="Sunum Videosu"
                        content="13.12.2021 Tarihinde Çekilen Sunum Videosu"
                        videoId="UoUg2PmvbB4"
                    />
                </div>

                <div>9</div>
            </div>
        </div>

    )
}

export default About;
