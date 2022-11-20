i# SEI Project-2

## Goal

> The brief was to build a web application using the express framework, deployed on Heroku.

## Team Members

>- Helene Van Besouw
>- Ellie Eadington

## Timeframe

> 8 days

## Technologies Used

>- Express.js
>- Node.js
>- MongoDB with Mongoose
>- JQuery
>- CSS
>- HTML
>- Multer

## Ibento

<img src="public/image/bookmark.png"/>

Deployed version: https://sei66-project2.onrender.com/

>This was my second project, completed in week 5 of the course where I my role was team leader. Ibento is a music events app that serves two types of users; the artist, who can upload, edit and delete events, and the regular user, who coan bookmark and un-bookmark events that they would like to attend. All users can create, edit and delete their profile, and use filters to search for events of interest to them.

## Getting Started/Code Installation

>- Clone the repo
>- Install dependencies using ‘npm i’ in terminal
>- Start the database using ‘mongod –dpath ~/data/db’
>- Run the application using ‘npm test’.

## Planning

### Ideation Stage

>I took the lead on planning, by first creating a Gsheets project tracker where we first laid out our desired key features and functionalities of our app and user stories. We separated these into MVP’s, Stretched Goals and Optional Additions. Once we had a solid picture of what features our app would have, we then created an ‘App Engineering Layout’ table, which broke down each functionality into sub-functionalities and divided the work up between us. We also added in the respective Routes, .ejs files, view folders and Models for each functionality. We created our ERD and Wireframes using Figma, linked below.

### ERD

>Helene and I worked together to create our ERD diagrams once we were happy with the features and functionalities of our site.

![image](./public/image/erdd.png)

### Trello

>Once we had completed our initial planning, we populated our Trello board with the tasks that we had assigned ourselves, and used this to keep track of the status of our work.

![image](./public/image/trello.png)

## Build/Code Process

### Set-up

>First I created a repository, project directory, files, added express & mongoose dependencies, port configurations and initialised express and created database connection. Next I Initialised router functionality in the index.js routes file, created route route and imported and mounted it in the server.js file. I then Installed ejs templating engine and express-ejs-layouts dependency. I added layouts.ejs, views/home/index.ejs. Next I added a root route to render the home.index page and created a basic boilerplate in our home/index.ejs file with dummy text to check it is rendering. I added code to require and use express-ejs-layouts in server.js so the code in layouts.ejs for default layout will render in every page. added 'app.use(express.static('public')) to link our css to our views.

### Home Page Layout

>I created the basic layout for the home page and layout.ejs. For the layout.ejs, I used bootstrap to create a navigation menu, created a header section and assigned hyperlinks to svg social icons in the footer. For the homepage, I added an aside section for filtering and a grid container to hold all of our events.

### Filtering

> As my partner was working on creating the schemas, I created dummy event schemas to start working on filtering. On reflection, it would have made more sense for us to have done this together, or individually created the schemas we would be working on first, and this took longer than I expected which meant that I had to create this dummy schema as a workaround.

>Initially, I tried to use jQuery to listen for category selection click which would then enable me to update category variable, export, and import to index.js in controllers folder, to then be accessed in the index.ejs file to only populate the events body with events that match that specific location etc. I then realised this would not easily work after deepening my understanding of how the client and server side works. I decided to use a checkbox form for my filters, so I included these in my index.ejs file in a form. I created a post API so I could access the values of the checkboxes and filter the collection by those values.

>I then worked out how to create a unique list of values in a field in my api that renders the homepage, and used these lists to populate my filters.

```js
exports.index_get = (req, res) => {
  Event.find()
    .distinct("city")
    .then((cities) => {
      locationFilter = cities;
    })
    .catch();
 
  Artist.find()
    .distinct("genres")
    .then((genres) => {
      genreFilter = genres;
    })
    .catch();
 
  Event.find()
    .distinct("month")
    .then((months) => {
      monthFilter = months;
    })
    .catch();
 
  Artist.find()
    .distinct("bandName")
    .then((artists) => {
      artistFilter = artists;
    })
    .catch();
 
  Event.find()
    .populate("artist")
    .then((event) => {
      res.render("home/index", {
        event,
        locationFilter,
        monthFilter,
        genreFilter,
        artistFilter,
        categories,
        location,
        month,
        genre,
        artist,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
```

>I found converting the event datetime to months to filter on difficult, so as a workaround, I created a new field in the database that included text value of the month and year and then updated the events mode and post api to populate this field when an event was created.

>In my post API, I assigned my filter variables with the data collected in the form submission, and used this data to filter the data from the events scheme in my get home api, where there was a match of cities, artists, months and genres from the form selection.

>I then updated the css for my filter section so it provided a better user experience.

### User Navigation

>I created a hyperlinked drop down in the navigation menu for account info so the user/artist can choose to go to their profile.

### Amending code to accommodate the new Many to Many Models

> Once the event models had been finalised by my partner, the next step was to update my index.js APIs to accommodate the new schemas. This was difficult, as I was no longer able to easily access the genres and artists data as they were now referenced in the events schema. I navigated this by adding some backend Javascript to my index.ejs file that looped through the genres and artists referenced by each event, and checked that all conditions specified by the filter selections were met, and that the event could be displayed. Now that my partner had finalised their event photo-upload form option and the events schema was being populated with image links, I brought these images into the index.ejs file, and updated the css so we now had all event info rendering in their respective divs.

### User Profile & Navigation

> Next I worked on the standard user profile and navigation. I created a sign-in page for both the user and the artist, and created a user profile page that would later hold all of the user’s bookmarked events. Now that myself and my partner had our artist and user profile pages up and running, as well as the sign-up and sign-in routes, I created a function in backend Javascript in our layouts.ejs file which displayed the correct dropdown links depending on if the user was an artist or a regular user (so their correct profile would be displayed) and similarly, the sign-out route would not be displayed if a user was not signed in, and visa versa.

```js
exports.auth_profile_get = (req, res) => {
  let user = req.user;

  Event.find({ user: { $in: [user._id] } })
    .populate("artist")
    .then((event) => {
      res.render("auth/profile", { user, event });
    })
    .catch((err) => {
      console.log(err);
    });
};

 
exports.auth_update_post = (req, res) => {
  let user = req.user;
  User.findByIdAndUpdate(user._id, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.auth_profile_delete = (req, res) => {
  let user = req.user;
  if (user) {
    if (user.profileType == "fan") {
      User.findByIdAndDelete(user._id)
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (user.profileType == "artist") {
      let user_id = req.user.id;
      User.findByIdAndDelete(user._id)
        .then(() => {
          Artist.findByIdAndDelete(user_id);
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
```

![image](./public/image/profile.png)

### Bookmarking

>Next I worked on bookmarking. First I created a form that sat within each event div, which displayed only the form submit button and utilised hidden input fields. I created a post API which upon form submission, would take the id of the event from the request, and check if the user who was signed in had that event within an array in their schema. If they did, nothing would happen, as they had already bookmarked the event. If they did not, the API would then push the event id  into the user object, and also the user id into the event object, so that we had a record of everyone who had bookmarked the event. Initially, I had difficulty in getting the bookmarked event to appear on the user’s profile without refreshing the page, as I was trying to render the page with the updated data. In order to fix this, I replaced this with a redirect to the profile, as this API already included the populated events data which had the user’s id nested within the objects.

>I also created an ‘unbookmark’ post API which functioned similarly to the bookmark post API, instead using the mongoose $pull method to remove the user id from the event object, and the event id from the user object, which was triggered by submission of a form I created within the event div in the user profile to unbookmark the event.

``` js
exports.index_bookmark_post = (req, res) => {
  let user = req.user;
  Event.find(
    { $and: [{ _id: req.body.id }, { user: { $in: user._id } }] },
 
    function (err, result) {
      if (result.length < 1) {
        User.findOneAndUpdate(
          { _id: user._id },
          { $push: { event: req.body.id } },
          {"new": true},
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              result.save(function (err) {
                if(err) {
                    console.error(err);
                }
            });
            }
          }
        );
 
        Event.findOneAndUpdate(
          { _id: req.body.id },
          { $push: { user: user._id } },
          {"new": true},
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              result.save(function (err) {
                if(err) {
                    console.error(err);
                }
            });
            }
          }
        );
      } else if (err) {
        console.log(err);
      } else {
        console.log("bookmarked event successfully");
      }
    }
  )
    .clone()
    .then(
      Event.find({ user: { $in: [user._id] } })
        .populate("artist")
        .exec(function(err, event) {
          res.redirect("/auth/profile");
        }))
    .catch((err) => {
      console.log(err);
    });
};
```
![image](./public/image/bookmark.png)

### User Authentication and Logout

>Once Helene had completed user sign-up, I moved onto user authentication with the Passport library and its Passport Local strategy. First I installed my dependencies as well as express-session to generate the session between the user, client and the server. I then created a passport configuration middleware file in a new folder to be exported as a module, which I imported into server.js. After requiring express-session in server.js, I configured the session by using the session method and passing secret key, and additional properties to save the session that was initially created, not save the session if it has been modified, and the max age for the cookie, after which the user will have to sign back in to access routes hidden behind the wall of authentication. I then initialised Passport and Passport session.

>I then completed my passport configuration middleware. After requiring Passport and its Local strategy I use the configure strategy to authenticate the user with their email address and password using a verify callback. I wrote the verify passport function in the User model, taking the password as a parameter and comparing the encrypted password in the database and the password entered by the user using the bcrypt.compareSync() method. Next I provided the code to serialise and deserialise the user in the passport configuration middleware so that the user data can be saved into the session with a unique identifier, and then be used to read the information from the database associated with the user according to the ID from the session.

```js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/User");
 
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use(
  new LocalStrategy(
    {
      usernameField: "emailAddress",
      passwordField: "password",
    },
 
    function (emailAddress, password, done) {
      User.findOne({ emailAddress: emailAddress }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);
 
module.exports = passport;
```

>Next I created my signin get route to render the signin.ejs file which I then created, including a form that accepts the user’s email address and password as input. After requiring passport configurations in the auth.js controller file, I created an http post signin route using the passport.authenticate() method, passing local strategy as a parameter, and providing success and failure redirects.

``` js
exports.auth_signin_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/signin",
});

Then I created my API for logout, its corresponding route and .ejs file.
exports.auth_logout_get = (req, res) => {
  // Invalidates the session
  req.logout(function (err) {
    if (err) {
      req.flash("error", "You have not logged out successfully");
      return next(err);
    }
    req.flash("success", "You are logged out successfully");
    res.redirect("/auth/signin");
  });
};
```

### Search

I created a simple search API by capturing the request body, converting the text to lowercase and splitting by “ “, so that the output would be an array of search terms. I attempted to map through each search term to find events where either name, venue, city or description were a case-insensitive match, however as the API could not render the index page more than once, the API currently only filters by the first search term.

``` js
exports.search = async (req, res) => {
  let regex =  req.body.regex.toLowerCase().split(" ");
 
  await regex.map((term) => {
   Event.find({$or: [
      { name: {$regex: new RegExp(term, "i") }},
      { venue: {$regex: new RegExp(term, "i")  } },
      { city: {$regex: new RegExp(term, "i")  } },
      { description: {$regex: new RegExp(term, "i")   }},
  ]}).then((event) => {
        res.render("home/index", {
          event,
          locationFilter,
          monthFilter,
          genreFilter,
          artistFilter,
          categories,
          location,
          month,
          genre,
          artist,
        })
      });
   })
  }
```

### Design and final changes

>Once our requirements had been met, I then updated the css across the whole site to give a more professional look to the web app and streamlined my code.

## Challenges

### Workflow and workload allocation

>Although our planning was rigorous, going forward I would have distributed the workload difficulty and changed the order of production, as the way we carried out the project meant that there was the occasional blocker and merge conflict. For example, we agreed that Helene could work on sign-up towards the end of the project, which meant that creating the user dashboards and testing loggedIn functionalities was difficult, and It felt slightly rushed for me to fit in authentication.

### Many to Many Relationships

>As this was our first real project working with many to many relationships and referenced fields, it took a little time to understand the best methods to use to access the referenced data, for example. I felt that by the end of the project I had a much more solid understanding of using mongoose to query the database.

### Filtering

>This was the most challenging aspect of the project for me, and I spent a good amount of time trying out different ways to filter the data to be rendered in our events index. In the end, I used a form with dynamic checkbox input fields to filter the data, but this was a workaround with issues, as it meant that each time the form was submitted, the checkboxes reverted to be unchecked.

## Wins

### Upskilled in Express.js, Node.js and MongoDB

>This was a steep learning curve as we only spent 1 week exploring the express framework with node.js and mongoose associations. By the end of the project I felt that I truly understood the theory behind building an express application and how to work with data in a relational database. Looking back at my code now, there is much I would change, which speaks to how far I’ve come since the start of the project.

### Gained experience in version control

>This was the first time working in a time and dealing with pull requests and merges, and by the end of the project I felt confident in working with git, github and preventing merge conflicts.

## Key Learnings/Takeaways

### Console.log everything

>As this was our first project building a live application, I encountered many problems that I hadn’t in the first project which provided me the opportunity to hone in on my debugging skills, recognising the meaning of errors, and how to optimally use console.log to find breaking points.

### Plan smartly

>As mentioned in the section on challenges, I would plan this project very differently going forward, ensuring that myself and the other team member separated our workload by controller files, and setting up the Models together at the start of the project, as well as ensuring that sign-up, sign-in, sign-out and authentication was completed as one of the first deliverables.

### Communication is key

>Helene and I communicated very well throughout the project, having regular standups and working together over zoom, so that we could bounce ideas off each other, and I could support technically as required. Without this consistent and valuable communication, the project would have been much more difficult to navigate.

## Bugs

>- Currently the checkbox input fields in the filters on the event index page become unchecked after form submission.
>- The logged out user can currently view the option to bookmark events, and the artist can also bookmark events which causes issues with their dashboard.
>- Search only filters by the first keyword

## Future Improvements

>- Fix bugs!
>- Provide a different way for the user to filter so that their current selections are visible on the rendered page.
>- Streamline the backend code used to render the events page
>- Provide the ability to filter through categories
