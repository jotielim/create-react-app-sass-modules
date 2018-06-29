Inject `sass-loader` to create-react-app webpack-config on runtime. This is possible because node `require` is cached.

You can now import SASS file as module
```
import classes from './App.scss';
const App = () => <div className={classes.container}>App</div>
export default App;
```

NOTE: Importing css will still work as is and is not loaded as css modules. So, you can import global css files if needed.
e.g.
```
// this is not css modules
import 'font-awesome/css/font-awesome.min.css';
const DateIcon = () => <i className="fas fa-calendar" />
export default DateIcon;
```

### Installation
1. Copy the `scripts` directory to your app
2. Update the package.json to call `custom-react-scripts` which will call the react-scripts after modifying the webpack config.
    * e.g.

      ```
      ...
      "scripts": {
        "start": "node scripts/custom-react-scripts start",
        "build": "node scripts/custom-react-scripts build",
        "test": "react-scripts test --env=jsdom",
        "eject": "react-scripts eject"
      },
      ...
      ```

