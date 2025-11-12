import TopBarPanel from "../components/TopBarPanel";
import styled from "styled-components";
import { theme } from "../constants/Colors";
import Search from "../components/Search";
import Filters from "../components/Filters";

const Panel = styled.div`
    width: 98%;
    padding: 10px 0 10px 0;
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: ${theme.panel};
    color: ${theme.text};
    border-radius: ${theme.radius};
    box-shadow: 0 5px 40px ${theme.shadow};
`;

export default function MainTable() {
    return (
        <Panel>
            <TopBarPanel />
            <Search />
            <Filters
                onChange={(key) => {
                    // TODO: здесь фильтруй данные таблицы по ключу `key`
                    // например setFilter(key)
                    console.log("filter:", key);
                }}
                onAdd={() => {
                    // TODO: открывай модалку / переход на форму добавления
                    console.log("add new record");
                }}
            />
            {/* ниже — твоя таблица */}
        </Panel>
    );
}
