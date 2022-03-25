# Getting started with mv-tabs

## Installation

### Install from NPM

    npm install mv-tabs

### Use

    //import mv-tabs
    import { Tabs } from "mv-tabs"

## HTML Layout

Now, we need to add basic layout:

    <mv-tabs>
        <mv-tablist>
            <mv-tab>Tab 1</mv-tab>
            <mv-tab selected>Tab 2</mv-tab>
            <mv-tab>Tab 3</mv-tab>
        </mv-tablist>
        <mv-tabpanel>Tabpanel 1</mv-tabpanel>
        <mv-tabpanel>Tabpanel 2</mv-tabpanel>
        <mv-tabpanel>Tabpanel 3</mv-tabpanel>
    </mv-tabs>
