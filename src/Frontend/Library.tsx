import "./Library.css"

import { useState } from "preact/hooks";
import { ChapterReader } from "./Reader/Reader";
import { MangaModel, SavedManga } from "../Backend/Model/Model";
import { TitledPictureButton } from "./Common/TitledPictureButton";
import { loadManga, loadMangaCover } from "../Backend/Api/MangaLoader";
import { TextInputAndButton } from "./Common/TextInputAndButton";

let MANGA_STORAGE_KEY = "manga-library";
let mangas: SavedManga[] = loadMangas();

export function Library() {
    let [openReader, setOpenReader] = useState(false);
    let [selectedManga, setSelectedManga] = useState<MangaModel | null>(null);

    let [newMangaId, setNewMangaId] = useState("");

    async function openReaderFor(id: string) {
        try {
            const manga = await loadManga(id);
            if (manga) {
                updateManga(manga);
                setSelectedManga(manga);
                setOpenReader(true);
            }
        } catch (error) {
            console.error("Failed to load manga:", error);
        }
    }

    if (openReader && selectedManga) {
        return <ChapterReader
            selectedManga={selectedManga}
            onBackClicked={() => setOpenReader(false)}
        ></ChapterReader>
    }
    else {
        let mangaDivs = mangas.map((manga: any) => {
            if (manga.mangaCover) {
                return <TitledPictureButton title={manga.mangaTitle} picture={manga.mangaCover} onClick={
                    () => openReaderFor(manga.mangaId)} >
                </TitledPictureButton>
            }
            else {
                return <button onClick={
                    () => openReaderFor(manga.mangaId)}>
                    <span>{manga.mangaTitle}</span>
                </button>
            }
        });
        return <div class="Library">
            <h1>Library</h1>
            <TextInputAndButton
                value={newMangaId}
                onChange={setNewMangaId}
                onClick={() => {
                    addManga({ mangaId: newMangaId, mangaTitle: "Loading...", mangaCover: null });
                }}
                placeholder="Add a manga by Id"
                buttonIcon="add"
            />
            <div class="MangaGrid">
                {mangaDivs}
            </div>
        </div>
    }
}

function loadMangas(): SavedManga[] {
    let temp = localStorage.getItem(MANGA_STORAGE_KEY)
    if (temp) {
        return JSON.parse(temp);
    }
    return [
        { mangaId: "418791c0-35cf-4f87-936b-acd9cddf0989", mangaTitle: "The Fragrant Flower Blooms With Dignity", mangaCover: null },
    ];
}

function updateManga(manga: MangaModel) {
    let index = mangas.findIndex(m => m.mangaId === manga.id);
    let mangaToSave = { mangaId: manga.id, mangaTitle: manga.title, mangaCover: manga.cover || null };
    if (index !== -1) {
        mangas[index] = mangaToSave;
    } else {
        mangas.push(mangaToSave);
    }
    saveMangas();
}

function addManga(manga: SavedManga) {
    for(let m of mangas) {
        if(m.mangaId === manga.mangaId) {
            console.log("Manga already in library");
            return;
        }
    }
    mangas.push(manga);
    saveMangas();
}

function saveMangas() {
    localStorage.setItem(MANGA_STORAGE_KEY, JSON.stringify(mangas));
}