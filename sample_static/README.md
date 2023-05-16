# Library Guide
A guide for how to use the web-eKYC module


## Use library as static files

### Step 0 - Reference files structure
The following guide will depends on this file structure to setup the web-ekyc project. 

```
.
├── src/
|   └── index.html
└── sdk/ 
    ├── sdk.js
    ├── ekyc.html
    └── ...
    
```

### Step 1 - Copy static web-eKYC

Copy the lastest web-eKYC files to the `sdk` folder. 


### Step 2 - Get eKYC data from the krypton server
> The sample project already implemented this, if you are going to try our sample project, this step is skippable.

**!!! WARNING !!! For the data security issue, we strongly NOT recommend calling this api on frontend side.**

- [eKYC endpoint](../common/Endpoints.md#ekyc)

### Step 3 - Start the ekyc in your own html file
> The sample project already implemented this, if you are trying our sample project, this step is skippable.

Here present how we start the web-ekyc service with the data from the krypton server.

```htmlembedded=
<!-- src/index.html -->
<head>
    <script type="text/javascript" src="../sdk/sdk.bundle.js"></script>
</head>
<body>
    ...
    
    <script type="text/javascript">
        function start(data) {
            let url = WebEkycSDK.getEkycUrl("../sdk/ekyc.html", data);
            WebEkycSDK.generateIframe(url);
        }
    </script>
</body>

```

## Reference
### - Start a web server  (optional)
We need a web server for starting our service. You can use any kind of webserver you want.

Here is the most simple way to start a web server by nodejs.

1. Install the `http-server`
```bash=
npm install http-server -g
```

2. [Sign a SSL certificate](https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/)

3. Start the **HTTPS** server.
> (NOTICE: on the most of mobile devices, web-ekyc needs SSL to work properly)

```bash=
http-server -S
```
