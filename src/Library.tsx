import { useState } from "preact/hooks";
import { IconButton } from "./IconButton";
import { Reader } from "./Reader";

export function Library() {
    let [openReader, setOpenReader] = useState(false);

    if (openReader) {
        return Reader()
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