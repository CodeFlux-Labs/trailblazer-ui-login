import styled from "styled-components/native";
import { TouchableOpacity, Image } from "react-native";
import { colors } from "@/src/assets/colors";
import { DefaultProps } from "@/src/styles-global";

interface DefaultBtnProps extends DefaultProps {
    height?: string;
    color?: string;
}

export const DefaultBtn = styled(TouchableOpacity)<DefaultBtnProps>`
    padding: ${({ padding = "10px" }) => padding};
    padding-vertical: ${({ paddingVertical = "0" }) => paddingVertical};
    padding-horizontal: ${({ paddingHorizontal = "0" }) => paddingHorizontal};
    margin: ${({ margin = "0" }) => margin};
    margin-vertical: ${({ marginVertical = "0" }) => marginVertical};
    margin-horizontal: ${({ marginHorizontal = "0" }) => marginHorizontal};
    height: ${props => props.height || "50px"};
    border-radius: 10px;
    background-color: ${props => props.color || "rgba(0, 0, 0, 0)"};
    border-color: ${props => props.color || colors.darkGray};
    border-width: 1px;
    alignt-items: center;
    justify-content: center;
`;

export const SocialButtonIcon = styled(Image)`
    width: 25px;
    height: 25px;
    align-self: center;
`;
