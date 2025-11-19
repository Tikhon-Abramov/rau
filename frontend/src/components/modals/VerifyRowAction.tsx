import { useState } from "react";
import styled from "styled-components";
import ReasonModal from "../ReasonModal.tsx";
import { theme } from "../../constants/Colors.tsx";

const VerifyButton = styled.button`
    white-space: nowrap;
    border: 1px solid ${theme.successBorder};
    background: ${theme.success};
    color: ${theme.text};
    padding: 8px 12px;
    border-radius: ${theme.radius};
    font-size: 13px;
    line-height: 1;
    cursor: pointer;
    transition: 0.18s ease;

    &:hover {
        background: ${theme.successBorder};
    }

    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, .25);
    }
`;

export type VerifyRowActionProps<T> = {
    row: T;
    onConfirm: (row: T, reason: string) => void;
    buttonLabel?: string;
};

export function VerifyRowAction<T>({
                                       row,
                                       onConfirm,
                                       buttonLabel = "Верифицировать",
                                   }: VerifyRowActionProps<T>) {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = (reason: string) => {
        onConfirm(row, reason);
        setIsOpen(false);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <VerifyButton onClick={() => setIsOpen(true)}>
                {buttonLabel}
            </VerifyButton>

            {isOpen && (
                <ReasonModal
                    isOpen={isOpen}
                    title="Верификация записи"
                    placeholder="Введите основание верификации..."
                    confirmLabel="Верифицировать"
                    emptyError="Пожалуйста, введите основание верификации."
                    onConfirm={handleConfirm}
                    onClose={handleClose}
                />
            )}
        </>
    );
}
