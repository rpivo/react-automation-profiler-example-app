# react-automation-profiler Example App

Analyze your React app's renders with automated user flows that generate comparison charts. Run flows before and after major changes to see how it affects components and renders, or run them on every build.

This example app uses some repurposed code provided by [Kent Dodds'](https://twitter.com/kentcdodds) article [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback). The code illustrates use cases for certain React memoization techniques and has been slightly rewritten here to show use cases for react-automation-profiler.

### Contents
- [To Demo](#To-Demo)
- [Example Scripts](#Example-Scripts)
- [Reading the Results](#Reading-the-Results)

## To Demo

**Clone this repository (SSH example below)**

```sh
git clone git@github.com:rpivo/react-automation-profiler-example-app.git
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
npm run dev
```

or

```sh
yarn dev
```

You're now ready to run any of the scripts below, which will start react-automation-profiler for the example app.

## Example Scripts

To see some of react-automation-profiler's functionality, try these example scripts at the root of this repo.

- [Running the Automation Flows in Watch Mode](#Running-the-Automation-Flows-in-Watch-Mode)
- [Running the Automation Flows Only After a Certain Number of Changes](#Running-the-Automation-Flows-Only-After-a-Certain-Number-of-Changes)
- [Generating Averages by Running Through Each Automation Flow a Certain Number of Times](#Generating-Averages-by-Running-Through-Each-Automation-Flow-a-Certain-Number-of-Times)
- [Including the Mount Phase for the Profiled Component](#Including-the-Mount-Phase-for-the-Profiled-Component)
- [Running the Automation Flows Only Once](#Running-the-Automation-Flows-Only-Once)

### Running the Automation Flows in Watch Mode

```sh
npx rap --page=http://localhost:1000/index.html --watch=dist
```

`---watch` runs each automation flow on every change that's made to the given location (`dist` in the command above). This should point to the location of the compiled build that you are serving locally, and not the source folder for your code (eg, `src`).

Watch mode is set at a 10-second delay. react-automation-profiler will not rerun the automation flows until 10 seconds after the last change was made.

To get Watch mode to rerun only after a certain number of changes are made, see the `--changeInterval` example.

### Running the Automation Flows Only After a Certain Number of Changes

Because a small change to your codebase will likely not create much difference in React renders, you can use the `--changeInterval` argument to only rerun react-automation-profiler after a certain number of changes have occurred in the watch folder:

```sh
npx rap --page=http://localhost:1000/index.html --watch=dist --changeInterval=10
```

This command will run react-automation-profiler in Watch mode and only rerun the automation flows after every 10 changes made to the `dist` folder.

### Generating Averages by Running Through Each Automation Flow a Certain Number of Times

The `--averageOf` argument can be used to set the number of times each automation flow is run whenever the full suite of automation flows is executed:

```sh
npx rap --page=http://localhost:1000/index.html --watch=dist --averageOf=10
```

The above command will run through the full automation suite 10 times and then create averages for each automation flow. This can be helpful to establish more accurate metrics since each automation run will have some variability.

`--averageOf` can be any number, but be aware that react-automation-profiler will run slower as this number increases.

### Including the Mount Phase for the Profiled Component

Use `--includeMount` to include the mounting phase of the profiled component:

```sh
npx rap --page=http://localhost:1000/index.html --watch=dist --includeMount
```

This will result in a chart called `Mount` that shows the renders that occurred during the mount phases. This happens prior to any of the automation flows in your react.automation file.

This is excluded by default.

### Running the Automation Flows Only Once

```sh
npx rap --page=http://localhost:1000/index.html
```

This will run `react-automation-profiler` with the only required argument, `page`. `page` should point to the url where your automation flows will run.

With only the `page` argument, react-automation-profiler will run through the automation flows only once and open up the profiler charts in a new browser tab. The process will continue in the terminal, allowing you to export the data from the charts if you want. Note that killing the process will disable exporting.

To get react-automation-profiler watch for changes and create new versions of charts in the process, see `watch`.

## Reading the Results

When running the command `npx rap --page=http://localhost:1000/index.html --watch=dist`, two charts will display on the automation flow page: *Click Memoized Button Five Times* and *Click Non Memoized Button Five Times*. Some things to note from these charts:
- In this scenario, the use of `React.memo()` and `React.useCallback()` helps prevent the memoized button from rendering when it doesn't need to.
- The *Memoized Button* chart will have more renders than the *Non Memoized* chart because, when the memoized button is clicked, the non-memoized button also has to render since it receives props and is not memoized.
- When the non-memoized button is clicked, the memoized button doesn't render, which results in the non-memoized button click flow having fewer renders.
- The memoized button renders will have a noticeably lower Actual Duration after its first render because the component is memoized at that point.
- The first `p-app` render in the *Non Memoized* flow will likely be the most expensive render in the two flows. This render will precede any memoization that will occur when either of the buttons are clicked.
- If you move the `Click Memoized Button Five Times` flow in the **react.automation.yaml** file so that it occurs before the `Click Non Memoized Button Five Times`, then the *Memoized* flow will have this unmemoized `p-app` render since it occurs first (note that the automation flows happen one after the other as they are listed in the **react.automation.yaml** file).
