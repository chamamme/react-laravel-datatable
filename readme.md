# react-laravel-datatable
A simple yet flexible react datatable library built to support laravel's pagination out of the box. 
> **Heads Up**: This library is still fragile and infant so do yourself a favor an handle it with care 🤓🤗. Do not forget to log your issues so I can follow up on them 👨🏿‍🏫. 

## Installation
 > npm i react-laravel-datatable

## Usage
 Link for a [video tutorial](https://youtu.be/nodndqinTxc)
1. First  import  package.

  ```js 
  import Datatable  from  'react-laravel-datatable'; 
  ```

2. Define expected column details. Details must be an array of objects with key(id,label);

```js
    const columns =[
        {
            id: "user_id", //This is the key from your data source. (Required)
            label : "ID", //Label for column title. (Required)
        },
        {
            id: "user_name", 
            label : "Name", 
        },
        {
            id: "user_email", 
            label : "Email", 
        }
    ]

```

- Define  your data source. Please note that your data source endpoint should be an http GET method which returns   laravel pagination object as a response.

```js
    const dataSource = "htts://test.com/users" ;

    /*
    A typical laravel pagination object will return the following.;
     {
         "data":{
             "current_page":1,
             "data":[
                 {
                     "id":33,
                     "name":"Andrew Chamamme",
                     "email":"andrew@mail.com",
                     "created_at":"2019-05-29 10:42:24"
                 }
                 ],
            "first_page_url":"http://localhost:8000/api?page=1",
            "from":1,
            "last_page":2,
            "last_page_url":"http://localhost:8000/api?page=2",
            "next_page_url":"http://localhost:8000/api?page=2",
            "path":"http://localhost:8000/api","per_page":15,
            "prev_page_url":null,
            "to":15,
            "total":28
            }
         } 
      
     */
```
> Though the package is tailored to laravel's pagination, you  can  still use with other  frameworks or vanilla code provided your data source endpoint  returns a response just as it is above 🌚.

3. Finally intialize the Datatable component.

```jsx
    <Datatable url={dataSource} columns={columns} />
```

## Advanced Options
   This package gives you the flexibility to define your own callback functions on each cell as well as define you own action components or buttons.


- ### Filter / Sorting
        The component already sends a couple of parameters in the query string when making request to the api endpoint. You can leverage on them to filter and sort  results from the server side. A typical query string from this component will be ``` ?term=&page=1&column=&order=asc&per_page=5 ``` .
    Param  | Description | Example 
    ------------- | ------------- | ------------
    term  | The search term entered in the search field | hello world
    page  | Current page number | 1
    column | Column for sorting | user_name
    order | Sorting order | asc / desc
    per_page | Number of records per page | 5

- ### Action Buttons/Components

    Action buttons or UI components can be added by indicating an ` actions ` prop in the `Datatable`. This prop  takes a function and your functnion can contain any valid react code but in this case its preferred to use it for button actions 👨🏿‍🏫 . At the point of when this function is being called, the current row object in injected into it.

```js

    const  actions = (rowItem)=>{
            //Below is just an example. You can decide to do whatever you want here.🤓
           return ( <a  href={`/user/${rowItem.id}`}> Views </a>)
    }

    <Datatable ... actions={actions} />

```

- ### Onclick Event on cells
    Maybe you might want to add a onClick event to records in a specific column (cell). You can easily do that by indicating an onClick property in the columns defination.


```js

    const columns =[
        {
            id: "user_id",
            label : "ID", 
            onClick: (rowItem) => { 
                    //This is just an example. You can decide to do whatever you want here.🤓
                    console.log(`User ${rowItem.id} has been clicked `); 
                    }
        }
        ...
    ];

```



## TODOS

- Add styling ✅
- Search fields ✅
- Bulk action
- Editable cell
- 