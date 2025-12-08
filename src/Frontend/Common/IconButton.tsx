import "./IconButton.css"

export type IconButtonProps = {
    icon?: string;
    content?: string;
    contentPosition?: "left" | "right";
    onClick?: () => void;
}

export function IconButton(
    { icon, content, contentPosition, onClick,}: IconButtonProps
) {
    return <div class="IconButton">
        <button type="button" onClick={onClick}>
            {contentPosition === "left" && content}
            <span class="material-symbols-outlined">
                {icon}
            </span>
            {contentPosition === "right" && content}
        </button>
    </div>
}