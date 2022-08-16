import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../store/api/authApi';
import { storeAuth } from '../store/reducer/authSlice';

const AuthForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    // const redirectURL = location.preLocation.pathname

    const [isLoginForm, setIsLoginForm] = useState(true);

    const usernameInp = useRef();
    const pwdInp = useRef();
    const emailInp = useRef();

    const [registe, { error: regError }] = useRegisterMutation()
    const [login, { error: loginErr }] = useLoginMutation()


    const submitHandler = (e) => {
        e.preventDefault();

        // 获取用户输入的内容
        const username = usernameInp.current.value;
        const password = pwdInp.current.value;

        // 处理登录功能
        if (isLoginForm) {
            login({
                identifier: username,
                password
            }).then(res => {
                dispatch(storeAuth(
                    {
                        token: res.data.jwt,
                        user: res.data.user
                    }
                ));
                // 登录成功后，需要向系统中添加一个标识，标记用户的登录状态
                // 登录状态（布尔值，token(jwt)，用户信息）
                // 跳转页面到根目录
                navigate(`${location.state.preLocation.pathname}`, { replace: true });
            }).catch(error => {
                console.log(error)
            })
        } else {
            const email = emailInp.current.value;
            registe({
                username,
                password,
                email
            }).then(res => {
                if (!res.error) {
                    setIsLoginForm(true)
                }
            })
        }
    };

    return (
        <div>
            <p>{regError && regError.data.error.message}</p>
            <p>{loginErr && loginErr.data.error.message}</p>
            <h2>{isLoginForm ? "登录" : "注册"}</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input ref={usernameInp} type="text" placeholder={"用户名"} />
                </div>
                {
                    !isLoginForm &&
                    <div>
                        <input ref={emailInp} type="email" placeholder={"电子邮件"} />
                    </div>
                }
                <div>
                    <input ref={pwdInp} type="password" placeholder={"密码"} />
                </div>
                <div>
                    <button>{isLoginForm ? "登录" : "注册"}</button>
                    <a href=' ' onClick={
                        event => {
                            event.preventDefault();
                            setIsLoginForm(prevState => !prevState);
                        }
                    }>
                        {
                            isLoginForm ?
                                "没有账号？点击注册" :
                                "已有账号？点击登录"}
                    </a>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
