import "./TitledPictureButton.css"

export type TitledPictureButtonProps = {
    title: string;
    picture: string;
    onClick?: () => void;
}

export function TitledPictureButton(
    { title, picture, onClick,}: TitledPictureButtonProps
) {
    return <div class="TitledPictureButton">
        <button type="button" onClick={onClick}>
            <span>{title}</span>
            <img class="MangaCover"
             src={picture} alt={title} />
        </button>
    </div>
}