import React, {useState} from "react";
import styled from "styled-components";
import {theme} from "../../constants/Colors.tsx";
import type {RauDataType} from "../../pages/MainRauPage.tsx";



type ReasonModalProps = {
    isOpen: boolean;
    onClose: () => void;
    row: RauDataType | null;
}

type FieldControl =
    | { kind: "input"; type: "text" | "number" | "date"; step?: string; pattern?: string; maxLength?: number }
    | { kind: "select"; options: string[] }
    | { kind: "skip" };


const detectFieldControl = (key: keyof RauDataType, value: RauDataType[keyof RauDataType]): FieldControl => {
    // 1. Служебные флаги — не редактируем
    if (["is_verified", "is_deleted", "is_changed", "is_new"].includes(key)) {
        return { kind: "skip" };
    }

    // 2. Даты
    if (/_date$/.test(key)) {
        return { kind: "input", type: "date" };
    }

    // 3. Булевы значения (ДА/НЕТ)
    if (
        /^is_/.test(key) ||
        /^has_/.test(key) ||
        /(success)$/.test(key)
    ) {
        return { kind: "select", options: ["ДА", "НЕТ"] };
    }

    // 4. Денежные и числовые поля по имени
    if (/(amount|total|proceeds|prices)/.test(key)) {
        return { kind: "input", type: "number", step: "0.01" };
    }

    // 5. ИНН
    if (/inn$/.test(key)) {
        return {
            kind: "input",
            type: "text",
            pattern: "\\d*",
            maxLength: 12, // если нужно другое — поменяешь
        };
    }

    // 6. Чисто числовые поля по типу (au_count и т.п.)
    if (typeof value === "number") {
        return { kind: "input", type: "number", step: "1" };
    }

    // 7. По умолчанию — обычный текст
    return { kind: "input", type: "text" };
};


const fieldLabels: Record<keyof RauDataType, string> = {
    inn_au: "ИНН АУ",
    last_name_au: "Фамилия АУ",
    first_name_au: "Имя АУ",
    middle_name_au: "Отчество АУ",
    inn_sro: "ИНН СРО",
    sro_name: "Наименование СРО",
    case_number: "Номер дела",
    debtor_name: "Наименование должника",
    debtor_inn: "ИНН должника",
    debtor_category: "Категория должника",
    bankruptcy_procedure: "Процедура банкротства",
    procedure_start_date: "Дата начала процедуры",
    procedure_end_date: "Дата завершения процедуры",
    au_appointment_date: "Дата назначения АУ",
    au_release_date: "Дата освобождения/отстранения АУ",
    au_count: "Количество АУ",
    has_court_alt_fee_distribution: "Наличие судебного акта (иное распределение вознаграждения)",
    court_set_fee_amount: "Вознаграждение АУ по суду (руб.)",
    registry_claims_amount: "Размер требований в реестр (руб.)",
    repaid_claims_total: "Погашено требований — всего (руб.)",
    repaid_by_dation: "Погашено — отступное (руб.)",
    repaid_by_assignment: "Погашено — уступка права требования (руб.)",
    repaid_by_collateral_retention: "Погашено — оставление залогового имущества (руб.)",
    fo_plan_approval_date: "Дата утверждения плана ФО",
    rdg_vu_plan_approval_date: "Дата утверждения РДГ/ВУ",
    fo_rdg_vu_success: "Завершено успешно (ДА/НЕТ)",
    fo_rdg_vu_completion_date: "Дата завершения плана",
    initial_asset_prices_total: "Сумма начальных цен имущества (руб.)",
    asset_sale_proceeds_total: "Выручка от продажи — всего (руб.)",
    asset_sale_proceeds_dation: "Выручка — отступное (руб.)",
    asset_sale_proceeds_assignment: "Выручка — уступка (руб.)",
    asset_sale_proceeds_collateral_retention: "Выручка — оставление предмета залога (руб.)",
    final_report_published: "Финальный отчет опубликован (ДА/НЕТ)",
    is_verified: "Проверено",
    is_deleted: "Удалено",
    is_changed: "Изменено",
    is_new: "Новая запись"
};


export default function ModalChanging({isOpen, onClose, row}: ReasonModalProps) {
    const [reason, setReason] = useState("");

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleConfirm = () => {
        console.log("handleConfirm");
        onClose();
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
                    placeholder={'Введите причину внесения изменений'}
                />
                {Object.entries(row).map(([key, value]) => {
                    const fieldKey = key as keyof RauDataType;
                    const control = detectFieldControl(fieldKey, value as RauDataType[keyof RauDataType]);

                    if (control.kind === "skip") return null;

                    return (
                        <ElementsContainer key={key}>
                            <ElementTitle>
                                {fieldLabels[key as keyof RauDataType] ?? key}
                            </ElementTitle>


                            <InputBox>
                                <OldValue>{value === null ? "" : String(value)}</OldValue>

                                {/* новое значение */}
                                {control.kind === "select" ? (
                                    <Select>
                                        <option value="">Выберите...</option>
                                        {control.options.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </Select>
                                ) : (
                                    <Input
                                        type={control.type}
                                        step={control.step}
                                        pattern={control.pattern}
                                        maxLength={control.maxLength}
                                        placeholder="Новое значение"
                                    />
                                )}

                                {/* причина изменений */}
                                <Input type="text" placeholder="Причина изменений" />
                            </InputBox>
                        </ElementsContainer>
                    );
                })}



                <ModalActions>
                    <CancelButton onClick={onClose}>Закрыть</CancelButton>
                    <ConfirmButton onClick={handleConfirm}>Изменить</ConfirmButton>
                </ModalActions>
            </ModalWindow>
        </Backdrop>
    );
};



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
    max-width: 60%;
    max-height: 90vh;
    scrollbar-color: ${theme.primary} transparent;
    overflow-y: auto;
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

const ElementsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ElementTitle = styled.p`
    font-size: 15px;
    color: ${theme.text};
`;


const InputBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;


const OldValue = styled.div`
    display: flex;
    width: 25%;
    justify-content: center;
    align-items: center;
    border-radius: ${theme.radius};
    border: 1px solid ${theme.line};
    background: ${theme.panel};
    color: ${theme.textDim};
`;

const Input = styled.input`
    width: 25%;
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


const Select = styled.select`
    width: 25%;
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
