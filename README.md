# Visualizing GeoJSON data with Leaflet

## Authors
* Daniel Cespedes - [LinkedIn](https://www.linkedin.com/in/selinzorob/) - [GitHub](https://github.com/danielczz)


![Landing page](static/Images/screen.png)











# A Belly Button Biodiversity Analysis

#Authors
Daniel Cespedes - LinkedIn - GitHub






# Geo-Mapping-with-Leaflet


# Unit 17 | Assignment - Visualizing Data with Leaflet

## Background

![1-Logo](static/images/1-Logo.png)

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

## Your Task

### Level 1: Basic Visualization

![2-BasicMap](static/images/2-BasicMap.png)

Your first task is to visualize an earthquake data set.

1. **Get your data set**

   ![3-Data](static/Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.

   ![4-JSON](static/Images/4-JSON.png)

2. **Import & Visualize the Data**

   Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

   * Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

   * Include popups that provide additional information about the earthquake when a marker is clicked.

   * Create a legend that will provide context for your map data.

   * Your visualization should look something like the map above.

- - -

### Level 2: More Data (Optional)

![5-Advanced](static/Images/5-Advanced.png)

The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it along side your original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

In this step we are going to..

* Plot a second data set on our map.

* Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

* Add layer controls to our map.

- - -

### Assessment

Your final product will be assessed on the following metrics:

* Completion of assigned tasks

* Visual appearance

* Professionalism

**Good luck!**

## Copyright

Data Boot Camp (C) 2018. All Rights Reserved.

![Screencapture](static/images/screen.png)





# A Belly Button Biodiversity Analysis 

## Authors
* Daniel Cespedes - [LinkedIn](https://www.linkedin.com/in/selinzorob/) - [GitHub](https://github.com/danielczz)


![Landing page](static/Images/00.jpg)

## Project Outline
<img src="static/Images/03.png" width="250" height="250" align="right"> 
In this project we are going to analyze sample data from our Belly Buttons and build a web application in order to share insights about our main topic today:

 **Belly Buton Biodiversity Analysis**

 - The _**Belly Button**_ in our body is like a jungle of bacteria.
 - Researchers believe that understanding this microbes world is useful to improve our health status and also our lives.
- Detailed info about the analysis: [_What Lives in Your Belly..._](https://news.nationalgeographic.com/news/2012/11/121114-belly-button-bacteria-science-health-dunn/)
- Access to final live application: 
[_Deployed Heroku Flask application_](https://belly-button-biodiversity-dscz.herokuapp.com/)


## Technology Landscape

1. JavaScript, one of the core technologies of the World Wide Web.
[_JavaScript_](https://www.javascript.com/)

1. HTML - _Hypertext Markup Language_ is the standard markup language for creating web pages and web applications.
[_HTML_](https://www.w3.org/html/)

1. Heroku - Heroku is a cloud platform as a service (PaaS) supporting several programming languages for deployment.
[_Heroku_](https://www.heroku.com/)

1. Flask - Flask is a micro web framework written in Python. 
[_Flask_](http://flask.pocoo.org/)


1. D3.js - _Data Driven Document for JavaScript_ is a JavaScript library for producing dynamic, interactive data visualizations in web browsers.
[_D3.js_](https://d3js.org/)

1. DOM - _The Document Object Model_ is an application programming interface (API) for HTML and XML documents.
[_DOM_](https://www.w3.org/TR/DOM-Level-1/introduction.html)


## Data Analysis Framework

This is a brief sample extraction of the JavaScript code. Find the complete code available here: [_app.js_](static/js/app.js)

### **Data gathering**
- Data provided for the analysis on SQL.


### **Data analysis**

#### Step 1 - Plotly.js
1. To create a PIE chart that uses data from your samples route (`/samples/<sample>`) to display the top 10 samples.


1. To create a Bubble Chart that uses data from samples route (`/samples/<sample>`) to display each sample.

#### Step 2 - Heroku
Deploy your Flask app to Heroku.


#### ***Building table metadata**
```JS
function buildMetadata(sample) {
    // The following function that builds the metadata panel
    // Use d3 to select the panel with id of `#sample-metadata`
    url_Metadata = "/metadata/" + sample;    

    var Panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    Panel.html("");

    // Use `d3.json` to fetch the metadata for a sample
    d3.json(url_Metadata).then((sample_Metadata) => {
      Object.entries(sample_Metadata).forEach(([key, value]) => {       
        //  Lets create a row per content in the sample_Metadata
        var row = Panel.append("h6");       
        //  Lets create the content that goes on the row (With non-breaking spaces)
        var content = key+':'+'\xa0'+value;       
        row.text(content);
      });
    });

}
```

#### ***Building charts - Step 1 - Pie Chart**
```JS
function buildCharts(sample) {

  // Pie Chart

  var datajson = d3.json("/samples/"+ sample);

  var newlist = [];

  datajson.then((data) => {
     
    var reference = data;

    for (i = 0; i < data.otu_ids.length; i++) { 
      newlist.push({
        otu_ids: data.otu_ids[i], 
        sample_values: data.sample_values[i], 
        otu_labels: data.otu_labels[i], 
      });
    };

    newlist.sort((a,b) => b.sample_values - a.sample_values);
    var piedata = Object.entries(newlist).slice(0,10).map(entry => entry[1]);

// Use sample_values as the values for the PIE chart
// Use otu_ids as the labels for the pie chart
// Use otu_labels as the hovertext for the chart

    var final_ids = [];
    var final_values = [];
    var final_labels = [];

    // console.log(final_ids);

    for (j=0; j<10; j++){
      final_ids.push(piedata[j].otu_ids);
      final_values.push(piedata[j].sample_values);
      final_labels.push(piedata[j].otu_labels);
    };

    var data = [{
      values: final_values,
      labels: final_ids,
      hovertext: final_labels,
      showlegend: false,
      hoverinfo: "label+text+value+percent",
      textinfo: "percent",
      type: "pie"
    }];
  
    var layout = {
      height: 350,
      width: 900,
      margin: {
        l: 10,
        r: 10,
        b: 10, 
        t: 10,
        pad: 5
      }
    };
  
    Plotly.plot("pie", data, layout);   
    console.log(reference.otu_ids);
    console.log(reference.sample_values);
    console.log(reference.otu_labels);

...
```

#### ***Building charts - Step 2 - Bubble Chart**
```JS
...
      // Bubble Chart
  //Build a Bubble Chart using the sample data      
  trace = {
    x: reference.otu_ids,
    y: reference.sample_values,
    mode: "markers",
    name: reference.otu_labels,
    text: reference.otu_labels,
    marker: {
      size: reference.sample_values,
      color: reference.otu_ids,
    }              
  };

    var data = [trace];

    var layout = {
      title: "Belly Button Biodiversity Analysis",
      showlegend: false,
      xaxis: {title:"IDs",},
      yaxis: {title:"Sample Values"},
    }

    Plotly.newPlot("bubble", data, layout);

    return piedata;

  });

};
```

### **Data sharing**
### Screencapture of the final application: 

![Screencapture](static/images/screen.png)
