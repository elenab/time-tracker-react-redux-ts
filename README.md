# Time tracker app with React, Redux and TypeScript
This project was creating while taking [Using Typescript with React](https://www.udemy.com/course-dashboard-redirect/?course_id=2321154) course on Udemy.\
Also, it was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can use:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


It will also start full fake REST API JSON Server
http://localhost:3001/events

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Json fake server
Run it locally:\
` npx json-server --watch json-server/db.json --port 3001`

Query events endpoint:
```
curl http://localhost:3001/events
```

Try to post something:
```
curl -X POST -H "Content-Type: application/json" -d '{"title": "Learning Typescript", "dateStart": "2020-09-11T13:00:15.180Z", "dateEnd": "2020-09-11T15:00:00.180Z"}'  http://localhost:3001/events
```
