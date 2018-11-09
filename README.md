# Instruments App README

This application is about a basic search/filter based on some properties of given json file with finantial instruments, dates and its values.

The app is displayed as a single page, with the search section, the graph displaying the instruments values specified in the search part and a table of its values.
If the amount of the selected instruments is bigger than one, then a normalization is applied to the graph, so the difference in the values can be better appreciated.

The web application is **responsive** implemented by default using react-bootstrap.

## Limitations

Since this is mostly a demo app, there are some limitations.

- **Styling**: [Bootstrap](http://getbootstrap.com/css) and [react-bootstrap](https://react-bootstrap.github.io/) are the only things being used for styling the app. Just minimun .css file was written, so the application doesn't look perfect everywhere. But is responsive by default.

- **Tests**: there are just some examples of different types of tests, but not everything is being tested.

## Commands for development

This application was bootstrapped using ["Create React App"](https://github.com/facebook/create-react-app), using its recently added [TypeScript support](https://facebook.github.io/create-react-app/docs/adding-typescript)

### Scripts

In order to start the application, in the project directory, you can run in the command console:

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm test`

Launches the test runner in the interactive watch mode.

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
