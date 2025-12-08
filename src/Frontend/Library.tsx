import "./Library.css"

import { useState } from "preact/hooks";
import { ChapterReader } from "./Reader/Reader";
import { MangaModel, SavedManga } from "../Backend/Model/Model";
import { MangaEntry } from "./Common/MangaEntry";
import { loadManga, loadMangaCover, searchForManga } from "../Backend/Api/MangaLoader";
import { TextInputAndButton } from "./Common/TextInputAndButton";

let MANGA_STORAGE_KEY = "manga-library";
let mangas: SavedManga[] = loadMangas();

export function Library() {
    let [state, setState] = useState(0);

    let [message, setMessage] = useState("");
    let [showMessage, setShowMessage] = useState(false);

    let [openReader, setOpenReader] = useState(false);
    let [selectedManga, setSelectedManga] = useState<MangaModel | null>(null);

    let [newMangaTitle, setNewMangaTitle] = useState("");

    async function openReaderFor(id: string) {
        try {
            const manga = await loadManga(id);
            if (manga) {
                updateManga(manga);
                setSelectedManga(manga);
                if (!manga.volumes) {
                    console.error("Volumes failed to load");
                    setMessage(`Failed to load volumes for: ${manga.title}`);
                    setShowMessage(true);
                    return;
                }
                setShowMessage(false);
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
                return <MangaEntry title={manga.mangaTitle} picture={manga.mangaCover}
                    onClick={() => openReaderFor(manga.mangaId)}
                    onDeleteClick={() => {
                        deleteManga(manga.mangaId)
                        setState(0)
                    }}>
                </MangaEntry>
            }
            else {
                return <button onClick={
                    () => openReaderFor(manga.mangaId)}>
                    <span>{manga.mangaTitle}</span>
                </button>
            }
        });
        let messageBox = showMessage ? <div class="MessageBox">
            <span>{message}</span>
            <button onClick={() => setShowMessage(false)}>
                OK
            </button>
        </div> : null;
        return <div class="Library">
            <h1>Library</h1>
            <TextInputAndButton
                value={newMangaTitle}
                onChange={setNewMangaTitle}
                onClick={async () => {
                    let manga = await searchForManga(newMangaTitle);
                    setState(0)
                    if (addManga(manga)) {
                        setMessage(`Manga added: ${manga.mangaTitle}`);
                    } else {
                        setMessage('Failed to add manga.');
                    }
                    setShowMessage(true);
                }}
                placeholder="Add a manga by name"
                buttonIcon="add"
            />
            {messageBox}
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

function addManga(manga: SavedManga): boolean {
    if (!manga) {
        console.error("Manga is null");
        return false;
    }

    for (let m of mangas) {
        console.log(m.mangaId, manga.mangaId);
        if (m.mangaId === manga.mangaId) {
            m = manga;
            saveMangas();
            return true;
        }
    }
    mangas.push(manga);
    saveMangas();
    return true;
}

function deleteManga(mangaId: string) {
    mangas = mangas.filter(m => m.mangaId !== mangaId);
    saveMangas();
}

function saveMangas() {
    localStorage.setItem(MANGA_STORAGE_KEY, JSON.stringify(mangas));
}