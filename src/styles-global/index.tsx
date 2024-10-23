import styled from "styled-components/native";
import { View, TextInput, Text, ImageBackground } from "react-native";
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
    centered?: boolean;
    spaceBetween?: boolean;
}

export const Row = styled(View)<RowProps>`
    flex-direction: row;
    align-items: center;
    padding: ${({ padding = "0" }) => padding};
    padding-vertical: ${({ paddingVertical = "0" }) => paddingVertical};
    padding-horizontal: ${({ paddingHorizontal = "0" }) => paddingHorizontal};
    margin: ${({ margin = "0" }) => margin};
    margin-top: ${({ marginVertical }) => marginVertical || "0px"};
    margin-bottom: ${({ marginVertical }) => marginVertical || "0px"};
    margin-left: ${({ marginHorizontal }) => marginHorizontal || "0px"};
    margin-right: ${({ marginHorizontal }) => marginHorizontal || "0px"};
    gap: ${({ gap = "0" }) => gap};
    ${({ centered }) => centered && "align-self: center;"}
    ${({ spaceBetween }) => spaceBetween && "justify-content: space-between;"}
`;

export const RootView = styled(View)`
    flex: 1;
    padding: 20px 10px 15px 10px;
`;

interface TextInputProps extends DefaultProps {
    height?: string;
}

export const DefaultTextInput = styled(TextInput)<TextInputProps>`
    flex: 1;
    padding: ${({ padding = "5px" }) => padding};
    padding-left: 14px;
    padding-right: 14px;
    margin: ${({ margin = "0 0 12px 0" }) => margin};
    border-width: 1px;
    border-color: ${colors.darkGray};
    border-radius: 10px;
    height: ${({ height = "60px" }) => height};
    color: #fff;
    font-family: "SFUIText-Regular";
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
    padding: 90px 18px 20px 18px;
`;

interface TitleProps extends DefaultProps {
    centered?: boolean;
    color?: string;
}

export const Title = styled(Text)<TitleProps>`
    font-family: "SFUIText-Bold";
    font-size: 18px;
    color: ${props => props.color || colors.lightGrayishBlue};
    margin-top: 5px;
    ${({ centered }) => centered && "text-align: center;"}
`;

interface SubtitleProps extends DefaultProps {
    centered?: boolean;
    color?: string;
    marginTop?: string;
    marginBottom?: string;
}

export const Subtitle = styled(Text)<SubtitleProps>`
    font-family: "SFUIText-Regular";
    font-size: 14px;
    color: ${props => props.color || colors.blueGray};
    margin-top: 5px;
    margin-bottom: 50px;
    margin-top: ${({ marginTop }) => marginTop || "5px"};
    margin-bottom: ${({ marginBottom }) => marginBottom || "50px"};
    ${({ centered }) => centered && "text-align: center;"}
`;

export const Label = styled(Text)`
    font-family: "SFUIText-Regular";
    font-size: 12px;
    color: ${colors.blueGray};
`;

export const DefaultText = styled(Text)<TitleProps>`
    font-family: "SFUIText-Medium";
    font-size: 16px;
    color: ${props => props.color || colors.blueGray};
    ${({ centered }) => centered && "text-align: center;"}
`;

interface HrProps extends DefaultProps {
    noFlex?: boolean;
    color?: string;
}

export const Hr = styled.View<HrProps>`
    ${props => (props.noFlex ? "" : "flex: 1;")}
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.color || colors.darkGray};
    margin: ${({ margin = "0" }) => margin};
    margin-top: ${({ marginVertical }) => marginVertical || "0px"};
    margin-bottom: ${({ marginVertical }) => marginVertical || "0px"};
    margin-left: ${({ marginHorizontal }) => marginHorizontal || "0px"};
    margin-right: ${({ marginHorizontal }) => marginHorizontal || "0px"};
`;

export const BackgroundContainer = styled(ImageBackground)`
    flex: 1;
    width: "100%";
    height: "100%";
    background-color: rgba(0, 0, 0, 0.9);
`;
