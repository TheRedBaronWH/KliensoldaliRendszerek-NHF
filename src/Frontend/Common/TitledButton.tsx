import "./TitledButton.css"

export type TitledButtonProps = {
    title: string;
    onClick?: () => void;
}

export function TitledButton(
    { title, onClick,}: TitledButtonProps
) {
    return <div class="TitledButton">
        <button type="button" onClick={onClick}>
            <span>{title}</span>
        </button>
    </div>
}