import styled from "styled-components";
import {theme} from "../constants/Colors.tsx";
import {IoIosArrowDown} from "react-icons/io";
import {useState} from "react";

const Wrapper = styled.div`
    display: flex;
    width: 200px;
    height: 10px;
    align-items: center;
    justify-content: space-between;
    background: ${theme.element};
    color: ${theme.text};
    padding: 12px 10px;
    border: 1px solid ${theme.line};
    border-radius: ${theme.radius};
    position: relative;
    cursor: pointer;
`;


const ElementsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const DropDown = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 110%;
    left: 0;
    width: 190px;
    background-color: ${theme.element};
    border: 1px solid ${theme.line};
    border-radius: ${theme.radius};
    z-index: 20;
    overflow-y: auto;
    scrollbar-color: ${theme.primary} transparent;
`

const DropElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 5px;

    &:hover {
        background: ${theme.panelAlt};
    }
`


type PropsType={
    innAuList:string[]
}
export default function DropDownInn(props:PropsType) {
    const [cureDate, setCurDate] = useState<string>('')
    const [dropOpen, setDropOpen] = useState<boolean>(false)

    function dropOpenHandle(element: string) {
        setCurDate(element)
        setDropOpen(false)
        console.log(dropOpen)
    }

    return (
        <Wrapper>
            <DropDown>
                {dropOpen && props.innAuList.map((element: string, key: number) => {
                    return (
                        <DropElement key={key}
                                     onClick={() => {
                                         dropOpenHandle(element)
                                     }}
                        >
                            {element}
                        </DropElement>
                    )
                })}
            </DropDown>
            <ElementsContainer onClick={() => setDropOpen(true)}>
                <p>ИНН: {cureDate}</p>
                <IoIosArrowDown/>
            </ElementsContainer>

        </Wrapper>
    )
}