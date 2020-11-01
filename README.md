# react-automation-profiler Example App

Analyze your React app's renders with automated user flows that generate comparison charts. Run flows before and after major changes to see how it affects components and renders, or run them on every build.

## To Demo

**Clone this repository (SSH example below)**

```sh
git clone --depth 1 git@github.com:rpivo/react-automation-profiler-example-app.git
```

**Install dependencies**

```sh
cd react-automation-profiler-example-app
npm install
```

or

```sh
cd react-automation-profiler-example-app
yarn install
```

**Start the server**

```sh
npm run build
```

or

```sh
yarn build
```

You're now ready to run any of the scripts below, which will start react-automation-profiler.

## Example Scripts

To see some of react-automation-profiler's functionality, run through these scripts.

```sh
npx rap --page=http://localhost:1235/index.html
```

Runs `react-automation-profiler` with the only required argument, `page`. Sets `page` to the index file where your local development server is running (which is  served from port `1235` for the demo app).

With only the `page` argument, react-automation-profiler will run through the automation flows only once, open up the charts page in the browser, and then exit.

To get react-automation-profiler to not exit and instead watch for changes and create new versions of charts in the process, see `watch`.
