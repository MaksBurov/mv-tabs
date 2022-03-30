# mv-tabs

Tabs organize and allow navigation between groups of content that are related

## Getting started with mv-tabs

### Installation

#### Install from NPM

We can install mv-tabs from NPM

    npm install mv-tabs

```JS
//import mv-tabs
import { Tabs } from "mv-tabs"
```

### HTML Layout

Now, we need to add basic layout:

```HTML
<mv-tabs>
    <mv-tablist>
        <mv-tab>Tab 1</mv-tab>
        <mv-tab>Tab 2</mv-tab>
        <mv-tab>Tab 3</mv-tab>
    </mv-tablist>
    <mv-tabpanel>Tabpanel 1</mv-tabpanel>
    <mv-tabpanel>Tabpanel 2</mv-tabpanel>
    <mv-tabpanel>Tabpanel 3</mv-tabpanel>
</mv-tabs>
```

### Documentation

#### Attribute list

| Attribute Name | Elements   | Description                                          |
| -------------- | ---------- | ---------------------------------------------------- |
| selected       | `<mv-tab>` | Defines a value which will be selected on page load. |
