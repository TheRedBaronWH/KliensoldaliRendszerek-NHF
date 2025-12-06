import { IconButton } from "./IconButton";
import { TextInput, TextInputProps } from "./TextInput";
import "./TextInputAndButton.css";

export type TextInputAndButtonProps = TextInputProps &
{
    buttonIcon?: string;
    buttonContent?: string;
    onClick?: () => void;
};

export function TextInputAndButton(
    { buttonIcon, buttonContent, onClick, ...TextInputProps }: TextInputAndButtonProps
) {
    return <div class="TextInputAndButton">
        <TextInput {...TextInputProps} onEnter={onClick} />
        <IconButton icon = {buttonIcon} content = {buttonContent} onClick = {onClick}/>
    </div>
}