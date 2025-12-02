import "./SideBar.css";

import { IconButton } from "../../Common/IconButton";

export function SideBar() {
    return <div class="SideBar">
        <h1>SideBar</h1>
        <div>
            <IconButton icon="arrow_back" />
            <IconButton icon="arrow_forward" />
        </div>
    </div>
}