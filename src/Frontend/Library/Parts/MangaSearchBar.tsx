import "./MangaSearchBar.css"

import { useState } from "preact/hooks";
import { TextInputAndButton } from "../../Common/TextInputAndButton";
import { searchForMangasWithName } from "../../../Backend/Api/MangaLoader";
import { SavedManga } from "../../../Backend/Model/Model";
import { IconButton } from "../../Common/IconButton";
import { isLibraryLogging } from "../../..";
import { MangaSearchResults } from "./MangaSearchResults";

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
        <MangaSearchResults searchResults={mangaSearchResults} addManga={addManga} setMessage={setMessage} setShowMessage={setShowMessage} />
    </div>
}

function searchifyTitle(title: string): string {
    let string = title.trim().replace(" ", "-");
    if(isLibraryLogging()) console.log(`[Library] Searching for manga with title: ${title} => ${string}`);
    return string;
}