import "./Library.css"

import { useState } from "preact/hooks";
import { IconButton } from "./Common/IconButton";
import { ChapterReader } from "./Reader/Reader";
import { SavedManga } from "./Model/Model";

let MANGA_STORAGE_KEY = "manga-library";
let mangas: SavedManga[] = [
    { mangaId: "418791c0-35cf-4f87-936b-acd9cddf0989", mangaTitle: "The Fragrant Flower Blooms With Dignity", mangaCover: "/fragrant-cover.jpg" },
    { mangaId: "manga2", mangaTitle: "Manga Two", mangaCover: null }
]; //loadMangas();

export function Library() {
    let [openReader, setOpenReader] = useState(false);
    let [selectedManga, setSelectedManga] = useState(null as SavedManga | null);

    if (openReader && selectedManga) {
        return <ChapterReader
            selectedManga={selectedManga}
            onBackClicked={() => setOpenReader(false)}
        ></ChapterReader>
    }
    else {
        let mangaDivs = mangas.map((manga: any) => {
            if (manga.mangaCover) {
                return <div class="MangaEntry">
                    <img src={manga.mangaCover} alt={manga.mangaTitle} class="MangaCover" />
                    <IconButton content={manga.mangaTitle} contentPosition="right" onClick={
                        () => {
                            setOpenReader(true)
                            setSelectedManga(manga);
                        }} />
                </div>

            }
            else {
                return <IconButton icon="📚" onClick={
                    () => {
                        setOpenReader(true)
                        setSelectedManga(manga);
                    }
                } />
            }
        });
        return <div class="Library">
            <h1>Library</h1>

            {mangaDivs}
        </div>
    }
}

function loadMangas(): SavedManga[] {
    let temp = localStorage.getItem(MANGA_STORAGE_KEY)
    if (temp) {
        return JSON.parse(temp);
    }
    return [];
}

function saveMangas() {
    localStorage.setItem(MANGA_STORAGE_KEY, JSON.stringify(mangas));
}