import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {styled as muiStyled} from "@mui/material/styles";
import styled from "styled-components";
import {theme} from "../constants/Colors.tsx";
import {useState} from "react";
import type {RauDataType} from "../pages/MainRauPage.tsx";
import ReasonModal from "./ReasonModal.tsx";
import ModalChanging from "./ModalChanging.tsx";


function addAlpha(color: string, amount: number) {
    if (color.startsWith("rgba")) {
        const [r, g, b, a] = color
            .replace(/rgba|\(|\)|\s/g, "")
            .split(",")
            .map(Number);
        return `rgba(${r}, ${g}, ${b}, ${Math.min(a + amount, 1)})`;
    }

    const c = color.replace("#", "");

    const bigint = parseInt(
        c.length === 3
            ? c.split("").map((x) => x + x).join("") // #abc → #aabbcc
            : c,
        16
    );

    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${amount})`;
}


const Shell = muiStyled(Paper)({
    backgroundColor: theme.panel,
    color: theme.text,
    borderRadius: theme.radius,
    boxShadow: `0 8px 28px ${theme.shadow}`,
    overflowX: "hidden",
    overflowY: "visible",
});

const Container = muiStyled(TableContainer)({
    backgroundColor: theme.panel,
    overflowX: "auto",
    overflowY: "visible",

    /* Chrome/Edge/Safari */
    "::-webkit-scrollbar": {
        height: "10px",
    },
    "::-webkit-scrollbar-track": {
        background: theme.panelAlt,
        borderRadius: "8px",
    },
    "::-webkit-scrollbar-thumb": {
        background: theme.primary,
        borderRadius: "8px",
        border: `2px solid ${theme.panelAlt}`,
    },
    "::-webkit-scrollbar-thumb:hover": {
        background: theme.primary,
    },

    /* Firefox */
    scrollbarColor: `${theme.primary} ${theme.panelAlt}`,
    scrollbarWidth: "thin",
});

const HeadCell = muiStyled(TableCell)({
    backgroundColor: theme.panelAlt,
    color: theme.textDim,
    borderBottom: `1px solid ${theme.line}`,
    fontWeight: 600,
    fontSize: 12,
    padding: "8px 10px",
    textAlign: "center",
    whiteSpace: "normal",
    wordBreak: "normal",
    overflowWrap: "break-word",
    hyphens: "none",
    minWidth: 160,
    position: "sticky",
    top: 0,
    zIndex: 2,
});

const Cell = muiStyled(TableCell)({
    color: theme.text,
    borderBottom: `1px solid ${theme.line}`,
    fontSize: 13,
    padding: "8px 10px",
    textAlign: "center",
    whiteSpace: "normal",
    wordBreak: "normal",
    overflowWrap: "break-word",
    hyphens: "none",
});

const Row = muiStyled(TableRow, {
    shouldForwardProp: (prop) => prop !== "$bg",
})<{ $bg?: string }>(({ $bg }) => ({
    transition: "background .18s ease",
    backgroundColor: $bg || "transparent",

    "&:hover": {
        backgroundColor: $bg
            ? addAlpha($bg, 0.15)     // усиливаем цвет при наведении
            : `${theme.primary}22`,   // стандартный hover если фона нет
    },
}));



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

const EditButton = styled.button`
    white-space: nowrap;
    border: 1px solid ${theme.warnBorder};
    background: ${theme.warn};
    color: ${theme.text};
    padding: 8px 12px;
    border-radius: ${theme.radius};
    font-size: 13px;
    line-height: 1;
    cursor: pointer;
    transition: 0.18s ease;

    &:hover {
        background: ${theme.warnBorder};
    }

    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, .25);
    }
`;





type ModalMode = "verify" | "delete" | null;
type PropsType = {
    filteredRauData: RauDataType[];
}

export default function RauTable(props: PropsType) {
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [selectedRow, setSelectedRow] = useState<RauDataType | null>(null);
    const [isModalChanging, setIsModalChanging] = useState(false);

    const isModalOpen = modalMode !== null;

    const handleVerifyClick = (row: RauDataType) => {
        setSelectedRow(row);
        setModalMode("verify");
    };

    const handleDeleteClick = (row: RauDataType) => {
        setSelectedRow(row);
        setModalMode("delete");
    };
    const handleChangeClick = () => {
        setIsModalChanging(true);
    };


    const handleCloseModal = () => {
        setModalMode(null);
        setSelectedRow(null);
        setIsModalChanging(false);
    };

    const handleModalConfirm = (reason: string) => {
        if (!selectedRow || !modalMode) return;

        if (modalMode === "verify") {
            console.log("Верификация записи:", selectedRow, "Причина:", reason);
        }

        if (modalMode === "delete") {
            console.log("Удаление записи:", selectedRow, "Причина:", reason);
        }

        handleCloseModal();
    };

    const modalTitle =
        modalMode === "verify"
            ? "Верификация записи"
            : modalMode === "delete"
                ? "Удаление записи"
                : "";

    const modalPlaceholder =
        modalMode === "verify"
            ? "Введите основание верификации..."
            : modalMode === "delete"
                ? "Пожалуйста, укажите причину удаления..."
                : "";

    const modalConfirmLabel = modalMode === "delete" ? "Удалить" : "Верифицировать";

    const modalErrorText =
        modalMode === "delete"
            ? "Пожалуйста, введите причину удаления."
            : "Пожалуйста, введите основание верификации.";

    return (
        <>
            {modalMode && (
                <ReasonModal
                    isOpen={isModalOpen}
                    title={modalTitle}
                    placeholder={modalPlaceholder}
                    confirmLabel={modalConfirmLabel}
                    emptyError={modalErrorText}
                    onConfirm={handleModalConfirm}
                    onClose={handleCloseModal}
                />
            )}

            {isModalChanging && (
                <ModalChanging
                    isOpen={isModalChanging}
                    onClose={handleCloseModal} />
            )
            }

            {/* Таблица */}
            <Shell>
                <Container>
                    <Table
                        stickyHeader
                        size="small"
                        aria-label="simple table"
                        sx={{
                            minWidth: 1400,
                            tableLayout: "auto",
                            "& .MuiTableCell-root": {borderColor: theme.line},
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <HeadCell align="center" sx={{minWidth: 100, width: 120}}>
                                    Верифицировать запись
                                </HeadCell>
                                <HeadCell align="center">Удалить запись</HeadCell>
                                <HeadCell align="center">Исправить ошибки</HeadCell>
                                <HeadCell align="center">Порядковый номер</HeadCell>
                                <HeadCell align="center">ИНН АУ</HeadCell>
                                <HeadCell align="center">Фамилия АУ</HeadCell>
                                <HeadCell align="center">Имя АУ</HeadCell>
                                <HeadCell align="center">Отчество АУ</HeadCell>
                                <HeadCell align="center">ИНН СРО</HeadCell>
                                <HeadCell align="center">Наименование СРО</HeadCell>
                                <HeadCell align="center">Номер дела</HeadCell>
                                <HeadCell align="center">Наименование должника</HeadCell>
                                <HeadCell align="center">ИНН должника</HeadCell>
                                <HeadCell align="center">
                                    Категория должника, в соответствии с ЗОБ
                                </HeadCell>
                                <HeadCell align="center">
                                    Наименование процедуры банкротства
                                </HeadCell>
                                <HeadCell align="center">
                                    Дата начала процедуры банкротства
                                </HeadCell>
                                <HeadCell align="center">
                                    Дата завершения процедуры банкроства
                                </HeadCell>
                                <HeadCell align="center">Дата назначения АУ</HeadCell>
                                <HeadCell align="center">
                                    Дата освобождения\отстранения АУ
                                </HeadCell>
                                <HeadCell align="center">
                                    Количество АУ, участвовавших в процедуре банкротства
                                </HeadCell>
                                <HeadCell align="center">
                                    Наличие судебного акта об установлении иного распределения
                                    между АУ процентов по вознаграждению, чем распределение в
                                    зависимости от длительности исполнения полномочий АУ,
                                    (ДА/НЕТ)
                                </HeadCell>
                                <HeadCell align="center">
                                    Сумма вознаграждения АУ, установленная судебным актом, в
                                    рублях
                                </HeadCell>
                                <HeadCell align="center">
                                    Размер требований, включенных в реестр требований кредиторов
                                    в составе требований первой - третьей очереди, в рублях
                                </HeadCell>
                                <HeadCell align="center">
                                    Размер погашенных требований кредиторов первой-третьей
                                    очереди, в рублях: ВСЕГО
                                </HeadCell>
                                <HeadCell align="center">
                                    Размер погашенных требований кредиторов первой-третьей
                                    очереди, в рублях: путем предоставления отступного
                                </HeadCell>
                                <HeadCell align="center">
                                    Размер погашенных требований кредиторов первой-третьей
                                    очереди, в рублях: путем уступки кредитору права требования о
                                    привлечении к субсидиарной ответственности
                                </HeadCell>
                                <HeadCell align="center">
                                    Размер погашенных требований кредиторов первой-третьей
                                    очереди, в рублях: путем оставления залоговым кредитором
                                    предмета залога за собой
                                </HeadCell>
                                <HeadCell align="center">
                                    Дата утверждения АС плана или графика ФО
                                </HeadCell>
                                <HeadCell align="center">
                                    Дата утверждения АС плана погашения задолженности РДГ/ ВУ
                                </HeadCell>
                                <HeadCell align="center">
                                    Успешное завершение плана ФО/РДГ/ ВУ и восстановление
                                    платежеспособности должника, (ДА/НЕТ)
                                </HeadCell>
                                <HeadCell align="center">
                                    Дата завершения плана ФО/РДГ/ ВУ
                                </HeadCell>
                                <HeadCell align="center">
                                    Сумма начальных цен реализации имущества, указанных в
                                    утвержденных предложениях о порядке продажи имущества
                                    должника, в рублях
                                </HeadCell>
                                <HeadCell align="center">
                                    Сумма денежных средств, вырученных от реализации имущества, в
                                    рублях: ВСЕГО
                                </HeadCell>
                                <HeadCell align="center">
                                    Сумма денежных средств, вырученных от реализации имущества, в
                                    рублях: путем предоставления отступного
                                </HeadCell>
                                <HeadCell align="center">
                                    Сумма денежных средств, вырученных от реализации имущества, в
                                    рублях: путем уступки кредитору права требования о
                                    привлечении к субсидиарной ответственности
                                </HeadCell>
                                <HeadCell align="center">
                                    Сумма денежных средств, вырученных от реализации имущества, в
                                    рублях: путем оставления залоговым кредитором предмета залога
                                    за собой
                                </HeadCell>
                                <HeadCell align="center">
                                    Финальный отчет опубликован на ЕФРСБ (ДА/НЕТ)
                                </HeadCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {props.filteredRauData.map((row: RauDataType, i: number) => {
                                const bg =
                                    row.is_deleted === 1
                                        ? `${theme.danger}`  // красный полупрозрачный
                                        : row.is_verified === 1
                                            ? `${theme.success}`  // зелёный полупрозрачный
                                            : row.is_changed === 1
                                                ? `${theme.warn}`     // жёлтый полупрозрачный
                                                : row.is_new === 1
                                                    ? `${theme.newcard}` // серый полупрозрачный
                                                    : undefined;

                                return (
                                    <Row key={i} $bg={bg}>
                                        <Cell>
                                            <VerifyButton onClick={() => handleVerifyClick(row)}>
                                                Верифицировать
                                            </VerifyButton>
                                        </Cell>
                                        <Cell>
                                            <RemoveButton onClick={() => handleDeleteClick(row)}>
                                                Удалить
                                            </RemoveButton>
                                        </Cell>
                                        <Cell>
                                            <EditButton onClick={() => handleChangeClick()}>
                                                Исправить
                                            </EditButton>
                                        </Cell>
                                        <Cell>{i + 1}</Cell>
                                        <Cell>{row.inn_au}</Cell>
                                        <Cell>{row.last_name_au}</Cell>
                                        <Cell>{row.first_name_au}</Cell>
                                        <Cell>{row.middle_name_au}</Cell>
                                        <Cell>{row.inn_sro}</Cell>
                                        <Cell>{row.sro_name}</Cell>
                                        <Cell>{row.case_number}</Cell>
                                        <Cell>{row.debtor_name}</Cell>
                                        <Cell>{row.debtor_inn}</Cell>
                                        <Cell>{row.debtor_category}</Cell>
                                        <Cell>{row.bankruptcy_procedure}</Cell>
                                        <Cell>{row.procedure_start_date}</Cell>
                                        <Cell>{row.procedure_end_date}</Cell>
                                        <Cell>{row.au_appointment_date}</Cell>
                                        <Cell>{row.au_release_date}</Cell>
                                        <Cell>{row.au_count}</Cell>
                                        <Cell>{row.has_court_alt_fee_distribution}</Cell>
                                        <Cell>{row.court_set_fee_amount}</Cell>
                                        <Cell>{row.registry_claims_amount}</Cell>
                                        <Cell>{row.repaid_claims_total}</Cell>
                                        <Cell>{row.repaid_by_dation}</Cell>
                                        <Cell>{row.repaid_by_assignment}</Cell>
                                        <Cell>{row.repaid_by_collateral_retention}</Cell>
                                        <Cell>{row.fo_plan_approval_date}</Cell>
                                        <Cell>{row.rdg_vu_plan_approval_date}</Cell>
                                        <Cell>{row.fo_rdg_vu_success}</Cell>
                                        <Cell>{row.fo_rdg_vu_completion_date}</Cell>
                                        <Cell>{row.initial_asset_prices_total}</Cell>
                                        <Cell>{row.asset_sale_proceeds_total}</Cell>
                                        <Cell>{row.asset_sale_proceeds_dation}</Cell>
                                        <Cell>{row.asset_sale_proceeds_assignment}</Cell>
                                        <Cell>{row.asset_sale_proceeds_collateral_retention}</Cell>
                                        <Cell>{row.final_report_published}</Cell>
                                    </Row>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Container>
            </Shell>
        </>
    );
}
