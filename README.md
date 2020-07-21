# SF Movie
This is the react-based user interface built for showing where movies have been filmed in San Francisco. It provides user interface for following features:
* Autocompletion 
* Filtering search 
* Map 
* Plotting the marker

## Getting Started
These instructions will get you a copy of the project up and running on your local machine. 

### Built With
* **React Js**
* **React Redux**
* **Antd**
* **Open Layer (For Map)**

### Installation
```sh
$ git clone https://github.com/anizzzzzzzz/SF-Movie-Frontend.git
$ cd SF-Movie-Frontend/
$ npm install
$ npm start
```

### Installing Dependencies
```sh
$ npm install
$ npm start
```

##### For Production
``` 
$ npm run-script build
``` 

#### Deployed on :
The application is deployed on [SF-Movie](https://sf-movie.000webhostapp.com/).

### Libraries Used:
#### Open Layer
[Open Layer](https://openlayers.org/) is an open Source JavaScript library for for displaying map data in web browsers as slippy maps. It has been 
developed to further the use of geographic information of all kinds. It provides as API for building rich web-based 
geographic applications similar to Google Maps and Bing Maps.

#### React Redux
[Redux](https://react-redux.js.org/introduction/quick-start) is a state management tool. It lets your React components 
read data from a Redux store, and dispatch actions to the store to update data.

### Code Snippet
FilterData.jsx
```shell script
/* Method for rendering SelectionFilter view preventing duplication of code. */
    renderItems = () => {
        const { allDatas, selectedDatas } = this.state;
        const size = "large";

        const titles = allDatas[fieldTypes.TITLE] === undefined ? [] : allDatas[fieldTypes.TITLE];
        const locations = allDatas[fieldTypes.LOCATIONS] === undefined ? [] : allDatas[fieldTypes.LOCATIONS];
        const productionCompany = allDatas[fieldTypes.PRODUCTIONCOMPANY] === undefined ? [] : allDatas[fieldTypes.PRODUCTIONCOMPANY];
        const writers = allDatas[fieldTypes.WRITER] === undefined ? [] : allDatas[fieldTypes.WRITER];
        const actor1 = allDatas[fieldTypes.ACTOR1] === undefined ? [] : allDatas[fieldTypes.ACTOR1];
        const actor2 = allDatas[fieldTypes.ACTOR2] === undefined ? [] : allDatas[fieldTypes.ACTOR2];
        const actor3 = allDatas[fieldTypes.ACTOR3] === undefined ? [] : allDatas[fieldTypes.ACTOR3];

        let renderingItems = [];
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.TITLE, "Movie Title", titles, size));
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.LOCATIONS, "Street Name", locations, size));
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.WRITER, "Writer", writers, size));
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.ACTOR1, "Actor1 Name", actor1, size));
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.PRODUCTIONCOMPANY, "Production Company", productionCompany, size));
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.ACTOR2, "Actor2 Name", actor2, size));
        renderingItems.push(this.getRenderingData(selectedDatas, fieldTypes.ACTOR3, "Actor3 Name", actor3, size));

        if(this.state.seeAllFilters)
            return renderingItems;
        return renderingItems.slice(0, MAXITEMS);
    };
```

```shell script
getRenderingData = (selectedDatas, fieldType, placeholder, optionDatas, size) => {
        return (
            <SelectionFilter key={placeholder} size={size} selectedDatas={selectedDatas} fieldTypes={fieldType}
                             placeholder={placeholder} search={this.search} handleChange={this.handleChange}
                             optionDatas={optionDatas}/>
        );
    };
```

### My Profile
[Anish Maharjan](https://www.linkedin.com/in/anish-maharjan-58a640149/)