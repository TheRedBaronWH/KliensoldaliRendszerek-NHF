import "./PageReader.css";

import { SideBar } from "./SideBar";

export function PageReader() {
    return <div class="PageReader">
        <div class="Page">
            <h1>Reader</h1>
        </div>
        <div class="SideBar">
            <SideBar></SideBar>
        </div>
    </div>
}