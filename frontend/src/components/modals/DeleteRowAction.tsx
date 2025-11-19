// components/DeleteRowAction.tsx
import { useState } from "react";
import styled from "styled-components";
import ReasonModal from "../ReasonModal.tsx";
import { theme } from "../../constants/Colors.tsx";

const RemoveButton = styled.button`
    white-space: nowrap;
    border: 1px solid ${theme.dangerBorder};
    background: ${theme.danger};
    color: ${theme.text};
    padding: 8px 12px;
    border-radius: ${theme.radius};
    font-size: 13px;
    line-height: 1;
    cursor: pointer;
    transition: 0.18s ease;

    &:hover {
        background: ${theme.dangerBorder};
    }

    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, .25);
    }
`;

export type DeleteRowActionProps<T> = {
    row: T;
    onConfirm: (row: T, reason: string) => void;
    buttonLabel?: string;
};

export function DeleteRowAction<T>({
                                       row,
                                       onConfirm,
                                       buttonLabel = "Удалить",
                                   }: DeleteRowActionProps<T>) {
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
            <RemoveButton onClick={() => setIsOpen(true)}>
                {buttonLabel}
            </RemoveButton>

            {isOpen && (
                <ReasonModal
                    isOpen={isOpen}
                    title="Удаление записи"
                    placeholder="Пожалуйста, укажите причину удаления..."
                    confirmLabel="Удалить"
                    emptyError="Пожалуйста, введите причину удаления."
                    onConfirm={handleConfirm}
                    onClose={handleClose}
                />
            )}
        </>
    );
}
