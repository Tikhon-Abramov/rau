import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../constants/Colors";
import { IoIosSearch } from "react-icons/io";
import type { RauDataType } from "../pages/MainRauPage.tsx";

const Bar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 16px 14px;
    border-top: 1px solid ${theme.line};
`;

const ChipsWrap = styled.div`
    display: flex;
    gap: 8px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
    max-width: 100%;
    padding-bottom: 2px;
`;

const Chip = styled.button<{ $active?: boolean }>`
    white-space: nowrap;
    border: 1px solid ${({ $active }) => ($active ? theme.primary : theme.line)};
    background: ${({ $active }) => ($active ? `${theme.primary}22` : theme.panelAlt)};
    color: ${({ $active }) => ($active ? theme.primary : theme.text)};
    padding: 8px 12px;
    border-radius: ${theme.radius};
    font-size: 13px;
    line-height: 1;
    cursor: pointer;
    transition: 0.18s ease;
    &:hover {
        border-color: ${theme.textDim};
    }
    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(99,102,241,.25);
    }
`;

const AddButton = styled.button`
    border: 1px solid ${theme.primary};
    background: ${theme.primary};
    color: #fff;
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.18s ease;
    box-shadow: 0 6px 18px ${theme.shadow};
    flex: 0 0 auto;

    &:hover {
        background: ${theme.primaryHover};
        border-color: ${theme.primaryHover};
        transform: translateY(-1px);
    }

    @media (max-width: 640px) {
        padding: 9px 12px;
        font-size: 13px;
    }
`;

const SearchWrapper = styled.div`
    position: relative;
    width: 15%;
`;

const SearchIcon = styled(IoIosSearch)`
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.textDim};
    font-size: 18px;
    pointer-events: none;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 8px 12px 8px 36px;
    border-radius: ${theme.radius};
    border: 1px solid ${theme.line};
    background: ${theme.element};
    color: ${theme.text};
    font-size: 14px;
    outline: none;
    transition: border 0.2s ease;

    &::placeholder {
        color: ${theme.textDim};
    }

    &:focus {
        border-color: ${theme.primary};
    }
`;

type FilterKey =
    | "all"
    | "verified"
    | "deleted"
    | "changed"
    | "unread"
    | "new";

const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all",      label: "Все записи" },
    { key: "verified", label: "Верифицированные записи" },
    { key: "deleted",  label: "Удаленные записи" },
    { key: "changed",  label: "Измененные записи" },
    { key: "unread",   label: "Непросмотренные записи" },
    { key: "new",      label: "Новые записи" },
];

type PropsType = {
    rauData: RauDataType[];
    setRauData: (data: RauDataType[]) => void;
    setFilteredRauData: (data: RauDataType[]) => void;
};

export default function Filters(props: PropsType) {
    const { rauData, setFilteredRauData } = props;

    const [active, setActive] = useState<FilterKey>("all");
    const [searchQuery, setSearchQuery] = useState("");

    // функция, которая применяет фильтр по кнопкам
    const applyFilterByStatus = (data: RauDataType[], key: FilterKey) => {
        switch (key) {
            case "new":
                return data.filter((item) => item.is_new === 1);
            case "verified":
                return data.filter((item) => item.is_verified === 1);
            case "deleted":
                return data.filter((item) => item.is_deleted === 1);
            case "changed":
                return data.filter((item) => item.is_changed === 1);
            case "unread":
                return data.filter(
                    (item) =>
                        item.is_verified === 0 &&
                        item.is_deleted === 0 &&
                        item.is_changed === 0 &&
                        item.is_new === 0
                );
            case "all":
            default:
                return data;
        }
    };

    // общий фильтр: сначала статус, потом поиск по ИНН / номеру дела
    const getFilteredData = () => {
        const result = applyFilterByStatus(rauData, active);

        const q = searchQuery.trim().toLowerCase();
        if (!q) return result;

        return result.filter((item) => {
            const inn = item.inn_au ? String(item.inn_au).toLowerCase() : "";
            const caseNumber = item.case_number
                ? String(item.case_number).toLowerCase()
                : "";

            return inn.includes(q) || caseNumber.includes(q);
        });
    };

    // пересчитываем список при изменении фильтра/поиска/исходных данных
    useEffect(() => {
        setFilteredRauData(getFilteredData());
    }, [active, searchQuery, rauData]);

    const handleSelect = (key: FilterKey) => {
        setActive(key);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Bar role="toolbar" aria-label="Фильтры таблицы">
            <ChipsWrap>
                {FILTERS.map((f) => (
                    <Chip
                        key={f.key}
                        aria-pressed={active === f.key}
                        $active={active === f.key}
                        onClick={() => handleSelect(f.key)}
                        title={f.label}
                    >
                        {f.label}
                    </Chip>
                ))}
            </ChipsWrap>

            <SearchWrapper>
                <SearchIcon />
                <SearchInput
                    placeholder="Введите номер дела или ИНН..."
                    value={searchQuery}
                    onChange={handleSearchChange} // живой поиск
                />
            </SearchWrapper>

            <AddButton onClick={() => console.log("ToDo")}>
                Добавить новую запись
            </AddButton>
        </Bar>
    );
}
