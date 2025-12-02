import "./PageReader.css";

import { Page } from "./Page";
import { SideBar } from "./SideBar";

export function PageReader() {
    return <div class="PageReader">
        <div class="Page">
            <Page></Page>
        </div>
        <div class="SideBar">
            <SideBar></SideBar>
        </div>
    </div>
}