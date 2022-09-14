## 09/09/2022
> Created repository, project directory, files, added express & mongoose dependencies, port configurations and initialised express and created database connection.
> Initialised router functionality in the index.js routes file, created route route and imported and mounted it in the server.js file.
> Installed ejs templating engine and express-ejs-layouts dependency.
> Added layouts.ejs, views/home/index.ejs.
> Added root route to render the home.index page in our root.
> Created basic boilerplate in our home/index.ejs file with dummy text to check is rendering.
> Added code to require and use express-ejs-layouts in server.js so the code in layouts.ejs for default layout will render in every page. added 'app.use(express.static('public')) to link our css to our views.

## 10/09/2022
> Created wireframe for home page and layout.ejs 
> Created dummy event schema to start working on categories
> Tried to use jquery to listen for category selection click, then update category variable, export, and import to index.js in controllers folder so it could be referenced in the javascript used in the index.ejs file to only popualte the events body with events that match that specific location etc. Realised this would not work. Scrapped that idea.
> Decided I wanted to use checkbox dropdowns instead, so included these in my index.ejs file in a form. Created a post api to get the values of the checked boxes and filter the collection by those values.

## 12/09/2022
> Worked out how to create a unique list of values in a field in mongodb
> Used this to create my dropdown filters
> Created a new field in the db that included text value of the month and year. Need to work out how to include this value when an event is created.
> Filtered the documents in the events collection where there was a match of cities, artists, months and genres from the form selection.
> Updated my form to accomodate multiselect checkboxes for each category, and used bootstrap to show and hide the filter options as the list was quite large.
> Updated the css for my filters
> Created a dropdown for account info so the user/artist can choose to go to their profile.

<img src="public\image\project02-img1.PNG">

## 13/09/2022
> updated index.js apis to accomodate the schemas. Updated the index.ejs file too and fixed the filtering (kind of).
> added a new month field to be included when an event is added to the schema to use for my filtering.
> brought event image into the index.ejs home page.
> Created a sign-in page
> updated the css on the home page

