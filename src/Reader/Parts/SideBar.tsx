import { IconButton } from "../../Common/IconButton";
import "./SideBar.css";

export function SideBar() {
    return <div>
        <div class="SideBar-TopBar">
            <IconButton icon="arrow_back" />
            <h1>Page 1</h1>
            <IconButton icon="arrow_forward" />
        </div>
    </div>
}