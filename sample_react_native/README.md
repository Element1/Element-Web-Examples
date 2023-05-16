# Library Guide
A guide for how to use the web-eKYC module


## Use library in react native

### Step 1 - Install dependencies
Requires node v16+
```
npm install
```

### Step 2 - Get eKYC data from the krypton server
> The sample project already implemented this, if you are going to try our sample project, this step is skippable.

**!!! WARNING !!! For the data security issue, we strongly NOT recommend calling this api on frontend side.**

- [eKYC endpoint](../common/Endpoints.md#ekyc)

### Step 3 - Setup environment variables
Use Webview in Component, and put the `token` fetched from step 2 in `source` field

```javascript
const WEB_EKYC_URL = '{{WEB_EKYC_URL}}';
const COMPANY_ID = '{{YOUR_COMPANY_ID}}';

  <WebView
    source={{ uri: `${WEB_EKYC_URL}/ekyc.html?t=${encodeURIComponent(this.state.token)}` }}
    allowsInlineMediaPlayback
    onMessage={(event) => {
      if (event.nativeEvent.data) {
        // ...
      }
    }}
  />

```

### Step 3 - Start the app

```
npm run start
```
