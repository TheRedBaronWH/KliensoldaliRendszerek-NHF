import { SavedManga } from "../../../Backend/Model/Model";
import { IconButton } from "../../Common/IconButton";

export type MangaSearchResultsProps = {
    searchResults: SavedManga[] | null;
    addManga: (manga: SavedManga) => boolean;
    setMessage: (message: string) => void;
    setShowMessage: (show: boolean) => void;
}

export function MangaSearchResults(
    { searchResults: mangaSearchResults, addManga, setMessage, setShowMessage }: MangaSearchResultsProps
) {
    let mangas = mangaSearchResults ? mangaSearchResults.map((manga) => {
        return <IconButton
            icon = "add"
            content = {manga.mangaTitle}
            contentPosition="left"
            onClick = {() => {
                if (addManga(manga)) {
                    setMessage(`Added "${manga.mangaTitle}" to your library.`);
                    setShowMessage(true);
                } else {
                    setMessage("Failed to add manga");
                    setShowMessage(true);
                }
            }}
        />
    }) : null;

    return mangas;
}