import React, { useState} from "react";
import styled from "styled-components";
import {theme} from "../constants/Colors.tsx";

const Backdrop = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    opacity: ${({$isOpen}) => ($isOpen ? 1 : 0)};
    pointer-events: ${({$isOpen}) => ($isOpen ? "auto" : "none")};
    transition: opacity 0.2s ease;
`;

const ModalWindow = styled.div<{ $isOpen: boolean }>`
    background: ${theme.panelAlt};
    color: ${theme.text};
    border-radius: ${theme.radius};
    box-shadow: 0 20px 40px ${theme.shadow};
    padding: 20px 24px;
    width: 70%;
    max-width: 90vw;
    transform: translateY(${({$isOpen}) => ($isOpen ? "0" : "10px")});
    opacity: ${({$isOpen}) => ($isOpen ? 1 : 0.5)};
    transition: all 0.2s ease;
`;

const ModalTitle = styled.h3`
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 600;
    color: ${theme.text};
`;

const TextArea = styled.textarea`
    width: 100%;
    min-height: 100px;
    resize: vertical;
    border-radius: ${theme.radius};
    border: 1px solid ${theme.line};
    background: ${theme.panel};
    color: ${theme.text};
    padding: 8px 10px;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
        border-color: ${theme.primary};
        box-shadow: 0 0 0 1px ${theme.primary};
    }
`;

const ModalActions = styled.div`
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

const ConfirmButton = styled.button`
    border-radius: ${theme.radius};
    border: 1px solid ${theme.primary};
    background: ${theme.primary};
    color: ${theme.text};
    padding: 8px 14px;
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

const CancelButton = styled.button`
    border-radius: ${theme.radius};
    border: 1px solid ${theme.line};
    background: transparent;
    color: ${theme.textDim};
    padding: 8px 14px;
    font-size: 13px;
    cursor: pointer;
    transition: 0.18s ease;

    &:hover {
        background: ${theme.panel};
    }
`;


type ReasonModalProps = {
    isOpen: boolean;
    onClose: () => void;
}
export default function ModalChanging({
                                        isOpen,
                                        onClose
                                    }: ReasonModalProps) {
    const [reason, setReason] = useState("");

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleConfirm = () => {
        console.log("handleConfirm");
    };

    return (
        <Backdrop $isOpen={isOpen} onClick={handleBackdropClick}>
            <ModalWindow $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
                <ModalTitle>Изменение ...</ModalTitle>

                <TextArea
                    value={reason}
                    onChange={(e) => {
                        setReason(e.target.value);
                    }}
                    placeholder={'Введите сообщение'}
                />

                <ModalActions>
                    <CancelButton onClick={onClose}>Закрыть</CancelButton>
                    <ConfirmButton onClick={handleConfirm}>Изменить</ConfirmButton>
                </ModalActions>
            </ModalWindow>
        </Backdrop>
    );
};