import styled from "styled-components";
import {theme} from "../constants/Colors.tsx";
import {useState} from "react";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 200px;
    gap: 10px;
    background-color: ${theme.element};
    margin-top: 20%;
    padding: 20px;
    border-radius: ${theme.radius};
`

const Title = styled.h3`
    margin: 0 0 12px;
    font-size: 20px;
    font-weight: 400;
    color: ${theme.text};
`;

const Input = styled.input`
    width: 90%;
    border-radius: ${theme.radius};
    border: 1px solid ${theme.line};
    background: ${theme.panel};
    color: ${theme.text};
    padding: 8px 10px;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    /* Chrome, Safari, Edge, Opera */

    &[type=number]::-webkit-outer-spin-button,
    &[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */

    &[type=number] {
        -moz-appearance: textfield;
    }

    &:focus {
        border-color: ${theme.primary};
        box-shadow: 0 0 0 1px ${theme.primary};
    }
`;


const ConfirmButton = styled.button`
    border-radius: ${theme.radius};
    border: 1px solid ${theme.primary};
    background: ${theme.primary};
    color: ${theme.text};
    padding: 8px 14px;
    width: 300px;
    font-size: 13px;
    cursor: pointer;
    transition: 0.18s ease;

    &:hover {
        background: ${theme.primaryHover || theme.primary};
    }

    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, .25);
    }
`;



export default function AuthorusationPage() {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    function handleSubmit(login:string, pass:string) {
       setLogin('')
        setPassword('')
        console.log(login,pass)
    }

    return (
        <Wrapper>
            <Title>Авторизация</Title>
            <Input placeholder='Логин'
                   value={login}
                   onChange={e => setLogin(e.currentTarget.value)}
            />
            <Input placeholder='Пароль'
                   type='password'
                   value={password}
                   onChange={e => setPassword(e.currentTarget.value)}
            />
            <ConfirmButton
            onClick={() =>handleSubmit("логин","пароль")}
            >
                Войти</ConfirmButton>
        </Wrapper>
    )
}