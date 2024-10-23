import styled from "styled-components/native";
import { Text } from "react-native";
import { DefaultProps } from "@/src/styles-global";

interface DefaultTextBtnProps extends DefaultProps {
    bold?: boolean;
}

export const DefaultTextBtn = styled(Text)<DefaultTextBtnProps>`
    font-family: ${props => (props.bold ? "SFUIText-Bold" : "SFUIText-Regular")};
    font-size: 12px;
    color: #ffffff;
`;
