# Welcome to the Portland Native Plant Page


## Description

This page contains a list with a large number of plants native to the Portland Metro area in NW Oregon. I originally created the data in an excel sheet many years ago while working as a botanical lead for a habitat restoration company called Ash Creek Forestry. I converted that original csv to JSON in order to create this page and make the data more accessible.

I created this page with the intention of making it easier for home owners and restoration teams alike, to make informed plant selections for their projects.

This list is not comprehensive for the entire region, and some species like baneberry were intentionally left out due to their high toxicity to both people and animals.

The header photo of a field of Camas is my own, taken at Gotter Prairie, one of only a handful of intact, wet meadows left in existence in NW Oregon.


## How to See the List

The api for the list is a database I created, and is only accessible by cloning the repo and running a json server. See the heading "For Collaborators" at the bottom of the README for more info.


## Features

**Custom Plant Lists**

Click anywhere within a plant row to highlight that row and build your own custom plant list! Click again to remove the highlight.

**Sorting**

Click on any of the column headers to sort the table alphanumerically based on that header. Find all the plants that prefer dry conditions, or all the plants that prefer moist or wet environments, etc.

**Submit a Plant to the List**

The page includes a form which allows you to add more plants to the database!

<img src="photos/Phase-1-Project-README-GIF.gif" alt="featuresGIF">

## Support

If you need help, email me at codybarker.or@gmail.com


## Project Status

Still in development and unlicensed


## For Collaborators
If you'd like to contribute to this project, create and/or navigate to a directory on your machine and clone the repo by running the following in your terminal:

`git clone git@github.com:cody-barker/phase-1-project.git`

Navigate into the project directory by running:

`cd phase-1-project/`

You will need to start a json server in order to interact with the plant list database.

You can do so by running the following in your terminal:

`json-server --watch db.json`

You should see a message like this if you were successful:

` \{^_^}/ hi!`

`Loading db.json`

`Done`

`Resources`

` http://localhost:3000/plantList`

`Home`

`http://localhost:3000`

`Type s + enter at any time to create a snapshot of the database`

`Watching...`


Keep that tab open in your terminal in order to continue hosting the database.

Meaningful alterations can be submitted for approval by emailing me at codybarker.or@gmail.com

## Author

Cody Barker