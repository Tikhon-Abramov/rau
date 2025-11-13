import styled from "styled-components";
import {useState} from "react";
import {theme} from "../constants/Colors.tsx";
import {HiMiniBars3} from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    background: ${theme.panel};
    color: ${theme.text};
    padding: 12px 18px;
    border-bottom: 1px solid ${theme.line};
    position: relative;
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: ${theme.text};
`;

const MenuButton = styled.button`
    background: none;
    border: none;
    color: ${theme.text};
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    transition: background 0.2s ease;

    &:hover {
        background: ${theme.panelAlt};
    }
`;

const Dropdown = styled.div`
    position: absolute;
    top: 54px;
    left: 12px;
    background: ${theme.panelAlt};
    border: 1px solid ${theme.line};
    border-radius: ${theme.radius};
    box-shadow: 0 8px 22px ${theme.shadow};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-width: 220px;
    animation: fadeIn 0.15s ease-out;
    z-index: 10;
`;

const MenuItem = styled.button`
    background: none;
    color: ${theme.text};
    border: none;
    text-align: left;
    padding: 10px 14px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;

    &:hover {
        background: ${theme.primaryHover}22;
        color: ${theme.primary};
    }

    &:not(:last-child) {
        border-bottom: 1px solid ${theme.line};
    }
`;

const LogOutBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    right: 12px;
    gap: 10px;
`;

const Circle = styled.div`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${theme.successBorder};
`;

const LogOutButton = styled.p`
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 10px 14px;
    gap:5px;
    border-radius: ${theme.radius};
    color: ${theme.text};
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;

    &:hover {
        background: ${theme.primaryHover}22;
        color: ${theme.primary};
    }

    &:not(:last-child) {
        border-bottom: 1px solid ${theme.line};
    }
`;

const UserName = styled.p`
    font-size: 15px;
    color: ${theme.textDim};
`;



export default function TopBarPanel() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Wrapper>
            <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
                <HiMiniBars3 size={24}/>
            </MenuButton>

            <Title>Данные для Регистрации Арбитражных Управляющих</Title>


            {menuOpen && (
                <Dropdown>
                    <MenuItem>Данные для РАУ</MenuItem>
                    <MenuItem>Верификация нарушений</MenuItem>
                    <MenuItem>Обратная связь</MenuItem>
                    <MenuItem>Включить сервисный режим</MenuItem>
                </Dropdown>
            )}

            <LogOutBlock>
                <Circle/>
                <UserName>Иван Иванов</UserName>
                <LogOutButton>
                    <IoLogOutOutline size={25}/>
                </LogOutButton>
            </LogOutBlock>
        </Wrapper>
    );
}
