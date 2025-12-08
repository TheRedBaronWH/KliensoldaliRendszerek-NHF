import "./MangaEntry.css"

export type MangaEntryProps = {
    title: string;
    picture: string;
    onClick?: () => void;
    onDeleteClick?: () => void;
}

export function MangaEntry(
    { title, picture, onClick, onDeleteClick }: MangaEntryProps
) {
    return <div class="MangaEntry">
        <button type="button" class = "MangaEntryButton" onClick={onClick}>
            <span>{title}</span>
            <img class="MangaCover"
             src={picture} alt={title} />
        </button>
        <button type="button" class="DeleteMangaButton" onClick={onDeleteClick}>
            <span class="material-symbols-outlined">
                delete
            </span>
        </button>
    </div>
}