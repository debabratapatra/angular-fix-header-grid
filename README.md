
# Angular 17 Fix/Freeze Header Grid
# NOTE: This is a fork of angular-fix-header-grid

It is a simple grid with all basic feature. It's header is fixed and body is scrollable. For hierarchical data (where there is a Parent-Child relationship), check out this 
<a href="https://github.com/debabratapatra/angular-tree-grid">Angular Tree Grid</a> Package. If data needs to be grouped by fields then check out this <a href="https://github.com/debabratapatra/ngtreegrid" target="_blank">ngtreegrid</a> Package.

## Demo

Click <a href="https://curiouslinks.com/pages/angular-fix-header-grid/demo" target="_blank">here</a> for demo.
<div>
<img src="https://curiouslinks.com/resources/images/cards/angular-fix-header-grid.png" alt="Loading" />
</div>

## Donate :hearts:

Please consider a <a href="https://curiouslinks.com/donate.html" target="_blank">donation</a> if it is useful to you.

## Version
Choose the correct version for your application.

| Angular  |angular-fix-header-grid |
|---|---|
| <= 8  | 1.0.4  |
| >= 9  | 1.1.1  |

## Installation

```bash
    npm i angular-fix-header-grid
```

## Usage

### Import
Import AngularFixHeaderGridModule Module in your application module.

```javascript
  import { AngularFixHeaderGridModule } from 'angular-fix-header-grid';
```

Add it to your imports array.

```javascript
    @NgModule({
        imports: [
        AngularFixHeaderGridModule
        ]
    })
```

### Data
Format of the data should be like below.

```
  students: any[] = [
    {name: 'debabrata', age: 60, weight: 60, height: 5},
    {name: 'Omm', age: 60, weight: 60, height: 5},
    {name: 'mama', age: 60, weight: 60, height: 5},
    {name: 'tiki', age: 60, weight: 60, height: 5},
    {name: 'lipi', age: 60, weight: 60, height: 5},
    {name: 'sneha', age: 60, weight: 60, height: 5},
    {name: 'shriya', age: 60, weight: 60, height: 5}
  ];
```

### Configs
#### Grid Configurations
| Field  |Type   |Default |  Description |
|---|---|---|---|
|  data_loading_text |  string | 'Loading...'  |  Loading place holder. This will be displayed when data is empty. |
|  filter |  boolean | false  |  It enables filter toolbar. Filter is customizable at column level. |
|  multi_select |  boolean | false  |  It enables checkbox selection. |
|  multi_select_width |  string | 'auto'  |  Width of multi-select column. |
|  row_select_function |  Function | n/a  |  Callback function for row Selection.  Based on the return type(Boolean) of this function, Selection can be enabled/disabled for a specific row. |
|  row_class_function |  Function | n/a  |  Callback function for row class. A custom class can be returned which will be added to the row. |
|  row_edit_function |  Function | n/a  |  Callback function for edit feature. Based on the return type(Boolean) of this function, edit can be enabled/disabled for a specific row. See <a href="https://curiouslinks.com/pages/ngtreegrid/demo/cond_row_edit">example</a> for more information. |
|  row_delete_function |  Function | n/a  |  Callback function for delete feature. Based on the return type(Boolean) of this function, delete can be enabled/disabled for a specific row. See <a href="https://curiouslinks.com/pages/ngtreegrid/demo/cond_row_edit">example</a> for more information. |
| actions  | Object  |  n/a | Settings for Action column. See Below  |
| css  | Object  |  n/a | Css class for icons. See Below  |
| columns  | Object  |  n/a | It is an Array. If not provided all keys of the data Array will be used as Column Headers. Please find the description below  |
##### actions
| Field  |Type   |Default |  Description |
|---|---|---|---|
| add  | boolean  |  false | It enables add feature.  |
| edit  | boolean  |  false | It enables edit feature.  |
| delete  | boolean  |  false | It enables delete feature.  |
| resolve_add  | boolean  |  false | Manually resolve add(after making call to server). It defaults to false. See <a href="https://curiouslinks.com/pages/ngtreegrid/demo/resolve_row_add">example</a> for more information.  |
| resolve_edit  | boolean  |  false | Manually resolve edit.  |
| resolve_delete  | boolean  |  false | Manually resolve delete feature.  |
##### css
| Field  |Type   |Default |  Description |
|---|---|---|---|
| expand_class  | string  |  plus | Icon class for Expand icon. Font Awesome class can be given.  |
| collapse_class  | string  |  minus | Icon class for Collapse icon. Font Awesome class can be given.  |
| add_class  | string  |  plus | Icon class for Add icon. Font Awesome class can be given.  |
| edit_class  | string  |  edit | Icon class for Edit icon. Font Awesome class can be given.  |
| delete_class  | string  |  delete | Icon class for Delete icon. Font Awesome class can be given.  |
| save_class  | string  |  save | Icon class for Save icon. Font Awesome class can be given.  |
| cancel_class  | string  |  cancel | Icon class for Cancel icon. Font Awesome class can be given.  |
| row_selection_class  | string  |  n/a | CSS Class for selected row.  |
| header_class  | string  |  n/a | CSS Class for header.  |
##### columns
| Field  |Type   |Default |  Description |
|---|---|---|---|
| name  | string  |  n/a | key of the column.  |
| header  | string  |  n/a | Header of the column that will be displayed in the table.  |
| width  | string  |  n/a | Width of the column with unit(px/rem).  |
| hidden  | boolean  |  false | Show/Hide column.  |
| filter  | boolean  |  true | Enable/Disable filter.  |
| editable  | boolean  |  false | To make a specific column editable. By default columns are not editable. edit option needs to be true at **grid** level.  |
| sortable  | boolean  |  false | To make a specific column sortable.  |
| renderer  | Function  |  n/a | It is a method to render customized value for the column. See this <a href="https://curiouslinks.com/pages/ngtreegrid/demo/basic_tree_grid">Example</a>.  |
| type  | string  |  '' | Set to 'custom' to have custom component for the column. Otherwise leave blank.  |
| component  | Object  |  n/a | Custom View Component. Mandatory if type is custom.See this <a href="https://curiouslinks.com/pages/ngtreegrid/demo/custom_view_component">Example</a>.|
| editor  | Object  |  n/a | Custom Editor Component. If given custom editor component will be used instead of default editor. See this <a href="https://curiouslinks.com/pages/ngtreegrid/demo/custom_edit_component">Example</a>.  |
| on_component_init  | Function  |  n/a | Callback function for the column on component init.  |

#### Basic Example
```
    configs: any = {
        height: '300px',
        filter: true,
        columns: [
        {
            name: 'name',
            header: 'Name',
            width: '100px'
        },
        {
            name: 'age',
            header: 'Age',
            renderer: function(value) {
            return value + ' years';
            }
        }]
    };
```

### HTML
Add below node to your html.
```
  <db-angular-fix-header-grid [source]="source" [configs]="configs"></db-angular-fix-header-grid>
```
### Events

| Event  |Arguments   | Description |
|---|---|---|
| expand  | **row_data:** Expanded Row | Event fires when parent is expanded.  |
| collapse  | **row_data:** Collapsed Row | Event fires when parent is collapsed.  |
| cellclick  | **event** Consist of: <ul><li> **row:** Selected Row </li><li> **column:** Selected Column</li></ul> | Event fires when a child cell is clicked.  |
| rowselect  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is selected.  |
| rowdeselect  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is deselected.  |
| rowselectall  | **event:** Event Object | Event fires when select-all checkbox is checked.  |
| rowdeselectall  | **event:** Event Object | Event fires when select-all checkbox is unchecked.  |
| rowsave  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is saved.  |
| rowdelete  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is deleted.  |
| rowadd  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is added.  |

### Can I hire you guys?
Yes. Please contact us at <a href="mailto:debabratapatra12@gmail.com">debabratapatra12@gmail.com</a>. We will be happy to work with you!

## License
This project is licensed under the MIT license.
