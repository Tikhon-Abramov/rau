// App.tsx
import styled from "styled-components";
import { theme } from "./constants/Colors.tsx";
import AppRoutes from "./routes/AppRoutes"; // <-- подключаем

const Global = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    background-color: ${theme.bg};
    color: ${theme.text};
`;

function App() {
    return (
        <Global>
            <AppRoutes />
        </Global>
    );
}

export default App;
