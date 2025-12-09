import "./MangaSearchBar.css"

import { useState } from "preact/hooks";
import { TextInputAndButton } from "../../Common/TextInputAndButton";
import { searchForMangasWithName } from "../../../Backend/Api/MangaLoader";
import { SavedManga } from "../../../Backend/Model/Model";
import { IconButton } from "../../Common/IconButton";
import { isLibraryLogging } from "../../..";

export type MangaSearchBarProps = {
    addManga: (manga: SavedManga) => boolean;
    setMessage: (message: string) => void;
    setShowMessage: (show: boolean) => void;
};

export function MangaSearchBar(
    { addManga, setMessage, setShowMessage }: MangaSearchBarProps
) {
    let [newMangaTitle, setNewMangaTitle] = useState("");
    let [mangaSearchResults, setMangaSearchResults] = useState<SavedManga[] | null>(null);

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

    return <div class="MangaSearchBar">
        <TextInputAndButton
            value={newMangaTitle}
            onChange={setNewMangaTitle}
            onClick={async () => {
                let searchBy = searchifyTitle(newMangaTitle);
                let manga = await searchForMangasWithName(searchBy);
                setMangaSearchResults(manga);
            }}
            placeholder="Search for a manga by name"
            buttonIcon="search"
        />
        {mangas}
    </div>
}

function searchifyTitle(title: string): string {
    let string = title.trim().replace(" ", "-");
    if(isLibraryLogging()) console.log(`[Library] Searching for manga with title: ${title} => ${string}`);
    return string;
}