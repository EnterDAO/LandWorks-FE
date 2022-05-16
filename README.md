# landworks-frontend

Landworks is an innovative Metaverse land / Renting marketplace for the crypto metaverse. It includes land providers like Decentraland and Cryptovoxels.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and customised as needed. Check Architecture below for more details.

## Architecture

The Single Page Application has a common React boilerplate structure but with a more structured modules and dependencies organisation of folders structure. The React and Typescript code is present inside the `./src` folder. Key folders under, are:

```shell
$ ls src/
design-system/
modules/
styles/
```

Under `./src/modules/` we have a name folder for the specific module and an organitation os subfolders like below:

```shell
$ ls src/modules/land-works
components/
contracts/
models/
providers/
views/
```

Folder `views/` will contain respective folder with a React index.tsx as view and route of the application. Check current file `./src/modules/land-works/views/single-land-view/index.tsx` as example.

### Styling

Styling has a multiple layers from different frameworks. It starts with the `./src/styles` as first layer. Indeed the `./src/styles/index.scss` contains all CSS variables (ex. var(--theme-card-color) ) used all around our codebase. Including in `styled-components`, that is also the designated best way to style a React component based on MUI styling framework.

Examples of `styled-component` approach, here:
`./src/modules/land-works/views/scene-expert-form-view/styled.ts`

### Main styling framework

At folder `./src/design-system` we have our main design library shared with Metaportal. In our latest code and how we approach the creation of components, we usually start a new component under our dedicated module folder or `./src/components` with relative component unstyled from the `design-system` based on MUI framework.

## Get started

As important step to run the project locally, you will need to create a `.env` environment file, like the example `.env-example` file.
Please, contact admins of the project for proper environment key-values. After created the env file locally, please follow the below `npm install` command from terminal.

## Available Scripts

In the project directory, you can run:

### `npm install`

As second step for the setup, it runs in terminal the installation of project's dependencies.

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Architecture (per folder)

### ./src/components

In this components folder we catalogue the components per type. Here indeed we have subsolders like `./src/components/custom` where most of local components are stored. And `./src/components/styled`, where we store the simple MUI styled components for local project use. Previously we also had the subfolder `./src/components/antd`, but this can be eventually removed later since an imminent refactoring will be done.

### ./src/modules
Containes subfolders meant as RouterSwitch. Each subfolders will have the initial RouterSwitch component that declares the url used in the selected module. Each module will have a sort of structure like below:

```shell
$ ls src/modules/land-works 
components/
contracts/
models/
providers/
views/
api.ts
index.tsx
utils.ts
```

### ./src/providers

This folder simply contains the global React providers used across the application.

### ./src/resources and ./src/assets

Both folder above will contains svg and other file formats used across the application. (TODO: this is something we didn't refactored, but the folders could be easily merged together.)

### ./src/design-system

At this folder we have our main design library shared with Metaportal project.

### ./src/wallets

Works in progress.

### ./src/web3

Works in progress.

## App's Workflow

The app has a classic `index.tsx` page where we run our main `App` component. Based on the current route, a RouterSwitch module gets loaded from: `./src/modules/`.

## Extra

Following, some extra documentation regarding specific contexts of the codebase.

### Decentraland Map Integration

For this integration present at [/explore](https://landworks.xyz/explore) with metaverse dropdown selected as Decentraland. We have this starting point that differ from each others map provider. The main component for Decentraland integration is lands-explore-map `./src/modules/land-works/components/lands-explore-map`. Please check the code, is self-explanatory.

### Voxel Map Integration

Works in progress.

## Learn More React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: <https://facebook.github.io/create-react-app/docs/code-splitting>

### Analyzing the Bundle Size

This section has moved here: <https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size>

### Making a Progressive Web App

This section has moved here: <https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app>

### Advanced Configuration

This section has moved here: <https://facebook.github.io/create-react-app/docs/advanced-configuration>
