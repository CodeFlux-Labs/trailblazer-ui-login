import styled from "styled-components/native";
import { View, TextInput, Text } from "react-native";
import { colors } from "../assets/colors";

export interface DefaultProps {
    padding?: string;
    paddingVertical?: string;
    paddingHorizontal?: string;
    margin?: string;
    marginVertical?: string;
    marginHorizontal?: string;
}

interface RowProps extends DefaultProps {
    gap?: string;
}

export const Row = styled(View)<RowProps>`
    flex-direction: row;
    align-items: center;
    padding: ${({ padding = "0" }) => padding};
    padding-vertical: ${({ paddingVertical = "0" }) => paddingVertical};
    padding-horizontal: ${({ paddingHorizontal = "0" }) => paddingHorizontal};
    margin: ${({ margin = "0" }) => margin};
    margin-vertical: ${({ marginVertical = "0" }) => marginVertical};
    margin-horizontal: ${({ marginHorizontal = "0" }) => marginHorizontal};
    gap: ${({ gap = "0" }) => gap};
`;

export const RootView = styled(View)`
    flex: 1;
    padding: 20px 10px 15px 10px;
`;

interface TextInputProps extends DefaultProps {
    height?: string;
}

export const DefaultTextInput = styled(TextInput)<TextInputProps>`
    padding: ${({ padding = "5px" }) => padding};
    padding-left: 14px;
    margin: ${({ margin = "0 0 12px 0" }) => margin};
    border-width: 1px;
    border-color: ${colors.lightGrayishBlue};
    border-radius: 10px;
    height: ${({ height = "50px" }) => height};
`;

interface SectionTitleProps extends DefaultProps {}

export const SectionTitle = styled(Text)<SectionTitleProps>`
    margin: ${({ margin = "0 0 12px 0" }) => margin};
    font-family: "SFUIText-Medium";
    font-size: 16px;
    color: ${colors.secondary};
`;

interface TextErrorProps extends DefaultProps {}

export const TextError = styled(Text)<TextErrorProps>`
    margin: ${({ margin = "0 10px 0 0" }) => margin};
    font-family: "SFUIText-Medium";
    font-size: 14px;
    color: red;
`;

export const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    padding: 20px 15px;
`;

interface TitleProps extends DefaultProps {
    centered?: boolean;
}

export const Title = styled(Text)<TitleProps>`
    font-family: "SFUIText-Semibold";
    font-size: 18px;
    color: ${colors.secondary};
    margin-top: 5px;
    ${({ centered }) => centered && "text-align: center;"}
`;

export const Subtitle = styled(Text)`
    font-family: "SFUIText-Regular";
    font-size: 14px;
    color: ${colors.blueGray};
    margin-top: 5px;
`;
