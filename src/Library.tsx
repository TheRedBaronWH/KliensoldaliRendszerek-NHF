import "./Library.css"

import { useState } from "preact/hooks";
import { IconButton } from "./Common/IconButton";
import { ChapterReader } from "./Reader/Reader";

let MANGA_STORAGE_KEY = "manga-library";
//let mangas = loadMangas();
let mangas = [1,2,3];

export function Library() {
    let [openReader, setOpenReader] = useState(false);
    let [selectedManga, setSelectedManga] = useState(0);

    if (openReader) {
        return <ChapterReader selectedManga={selectedManga} />
    }
    else {
        let mangaDivs = mangas.map((manga: any) => {
            return <IconButton icon="📚" onClick={
                () => {
                    setOpenReader(true)
                    setSelectedManga(manga);
                }
            } />
        });
        return <div class="Library">
            <h1>Library</h1>
            <IconButton icon="📚" onClick={
                () => {
                    setOpenReader(true)
                    setSelectedManga(1);
                }
            } />
            {mangaDivs}
        </div>
    }
}

function loadMangas() {
    let temp = localStorage.getItem(MANGA_STORAGE_KEY)
    if (temp) {
        return JSON.parse(temp);
    }
    return [];
}

function saveMangas() {
    localStorage.setItem(MANGA_STORAGE_KEY, JSON.stringify(mangas));
}