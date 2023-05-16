# Library Guide
A guide for how to use the web-eKYC module


## Use library in webpack

### Step 0 - Reference files structure
The following guide will depends on this file structure to setup the web-ekyc project. 

```
.
├── src/
│   ├── index.js
└── sdk/ 
|   ├── ...
|   ├── sdk.js
|   ├── main.js
|   ├── ekyc.html
|   └── package.json
├── package.json
└── webpack.config.js
```

### Step 1 - Install module

Copy the lastest web-eKYC files to the `sdk` folder. 

Install the web-ekyc module by the path to add the dependency.

```
npm install ./sdk
```

### Step 2 - Setup webpack configs
> The sample project already implemented this, if you are going to try our sample project, this step is skippable.

Use `CopyPlugin` to copy the `web-ekyc` project to the `dist` folder

See the following config for adding this page.

```javascript=
// webpack.config.js
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  ...

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/web-ekyc/',
          to: './sdk/',
        },
      ]
    }),
  ],

  ...

}
```

### Step 3 - Get eKYC data from the krypton server
> The sample project already implemented this, if you are going to try our sample project, this step is skippable.

**!!! WARNING !!! For the data security issue, we strongly NOT recommend calling this api on frontend side.**

- [eKYC endpoint](../common/Endpoints.md#ekyc)

### Step 4 - Start the ekyc in iframe
> The sample project already implemented this, if you are going to try our sample project, this step is skippable.

Notice the `ekycUrl` should be set as the copy target path in the Step 2. For this sample project, the path is `./sdk/ekyc.html`

```javascript=
/* src/index.js */
import * as WebEkycSDK from "web-ekyc";

...

let url = WebEkycSDK.getEkycUrl("sdk/ekyc.html", data);
WebEkycSDK.generateIframe(url);

```
