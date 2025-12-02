import "./IconButton.css"

export type IconButtonProps = {
    icon?: string;
    content?: string;
    onClick?: () => void;
}

export function IconButton(
    { icon, content, onClick,}: IconButtonProps
) {
    return <div class="IconButton">
        <button type="button" onClick={onClick}>
            <span class="material-symbols-outlined">
                {icon}
            </span>
            {content}
        </button>
    </div>
}