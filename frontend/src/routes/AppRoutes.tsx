import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../constants/Colors.tsx";

import MainRauPage from "../pages/MainRauPage.tsx";
import Feedback from "../pages/Feedback.tsx";
import AuthorusationPage from "../pages/AuthorisationPage.tsx";
import TopBarPanel from "../components/TopBarPanel.tsx";

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

function MainLayout() {
    return (
        <Panel>
            <TopBarPanel />
            <Outlet />
        </Panel>
    );
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<AuthorusationPage />} />
            <Route path="/admin" element={<AuthorusationPage />} />
            <Route element={<MainLayout />}>
                <Route path="/" element={<MainRauPage />} />
                <Route path="/feedback" element={<Feedback />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
