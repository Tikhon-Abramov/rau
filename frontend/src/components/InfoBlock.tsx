import styled from "styled-components";
import {theme} from "../constants/Colors.tsx";


const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 18px;
    border-bottom: 1px solid ${theme.line};
`;

const InfoBlockContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 0 10px 0 10px;
    border-radius: ${theme.radius};
    color: ${theme.text};
    font-size: 12px;
    background: ${theme.element};
`;


export default function InfoBlock() {
    return (
        <Container>
            <InfoBlockContainer>
                <InfoContainer>
                    <p>
                        Сводная информация по САМОРЕГУЛИРУЕМАЯ ОРГАНИЗАЦИЯ СОЮЗ АРБИТРАЖНЫХ УПРАВЛЯЮЩИХ ПРАВОСОЗНАНИЕ
                    </p>
                    <p>
                        Ваш менеджер по вопросам: Малыхина Дарья Евгеньевна (тел. 8(495)198-53-15 (доб.4845),
                        8(926)201-53-07)
                    </p>
                </InfoContainer>
            </InfoBlockContainer>
        </Container>
    )
}