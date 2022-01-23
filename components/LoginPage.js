import axios from 'axios';
import { useEffect, useState } from 'react';
import Router from 'next/router'


const LOGIN_ERROS = {
    user_not_found: "Kullanıcı bulunamadı",
    password_wrong: "Şifre yanlış",
    user_not_found: "Kullanıcı bulunamadı",
    otp_code_wrong: "OTP kodu yanlış",
    otp_code_not_found: "OTP kodu bulunamadı",
    otp_expired: "OTP kodunun süresi doldu",
}

const LoginPage = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [code, setCode] = useState('');
    const [stage, setStage] = useState("get_otp_code");


    const request_login = async (event) => {
        event.preventDefault();
        if (email.length == 0 || password.length == 0) {
            setError("Lütfen email ve şifre alanlarını doldurunuz");
            return;
        }
        if (stage == "get_otp_code") {
            get_otp_code();
        }
        if (stage == "verify_otp_code") {
            verify_otp_code();
        }
    }

    const get_otp_code = async () => {
        try {
            const body = { email, password };
            const { data } = await axios.post(`/auth/login`, body);
            setStage("verify_otp_code");
            setError("");
        } catch (error) {
            const err = error?.response?.data;
            if (Array.isArray(err)) {
                let content = "";
                err.map((i) => i.message)
                setError(content);
                return
            }

            if (typeof err == "string") {
                setError(LOGIN_ERROS[err] || "Bilinmeyen bir hata oluştu. Lütfen tekrar deneyiniz.");
            }
        }
    }

    const verify_otp_code = async () => {
        try {
            const body = { email, code };
            const { data } = await axios.post(`/auth/verify`, body);
            setError("");
            localStorage.setItem("friday_token", data.access_token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
            return Router.push('/files');
        } catch (error) {
            const err = error?.response?.data;
            if (typeof err == "string") {
                setError(LOGIN_ERROS[err] || "Bilinmeyen bir hata oluştu. Lütfen tekrar deneyiniz.");
            }
        }

    }


    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Friday Team FilEncrypt
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Dosyalara Ulaşmak İçin Giriş Yapabilirsiniz.
                            {/* <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                start your 14-day free trial
                            </a> */}
                        </p>
                        <p className="mt-4 text-center text-sm text-gray-600">
                            <a className='text-center text-sm text-gray-600' href='/about'>Hakkımızda</a>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={(event) => { setEmail(event.target.value) }}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>

                            {
                                stage == "verify_otp_code" &&
                                <>
                                    <div>
                                        <label htmlFor="password" className="sr-only">
                                            Doğrulama Kodu
                                        </label>
                                        <input
                                            id="verification_code"
                                            name="verification_code"
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Doğrulama Kodu"
                                            onChange={(event) => setCode(event.target.value)}
                                        />
                                    </div>
                                </>
                            }
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <span>{error}</span>
                            <br />
                            <br />
                            <button
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={request_login}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    {/* Heroicon name: solid/lock-closed */}
                                    <svg
                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                                Giriş Yap
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default LoginPage;