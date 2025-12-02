import { useState } from "preact/hooks";
import { IconButton } from "./Common/IconButton";
import { ChapterReader } from "./Reader/Reader";

export function Library() {
    let [openReader, setOpenReader] = useState(false);

    if (openReader) {
        return ChapterReader()
    }
    else {
        return <div>
            <h1>Library</h1>
            <IconButton icon="📚" onClick={
                () => { setOpenReader(true); }
            } />
        </div>
    }
}