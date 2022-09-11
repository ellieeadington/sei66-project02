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