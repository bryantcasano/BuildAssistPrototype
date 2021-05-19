# Project Phoenix (phoenix)

Build assist Prototype

## Install the dependencies
```bash
yarn
```

## Creating self-signed certificate for your local development
1) Generate local Certificate Authority (CA) called RootCA.pem, RootCA.key, and RootCA.crt
replace _<your country>_ with your country name
```bash
openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout RootCA.key -out RootCA.pem -subj "/C=<your country>/CN=<Root CA Name. eg: Example-Root-CA>"
```

```bash
openssl x509 -outform pem -in RootCA.pem -out RootCA.crt
```

2) Create a file called **domains.ext** in the same directory as where you generated the local certificate authority (CA) and paste the content below
```bash
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = <your domain name. eg: localhost>
```

3) Generate certificate for your local development's domain name
```bash
openssl req -new -nodes -newkey rsa:2048 -keyout <your domain name>.key -out <your domain name>.csr -subj "/C=<your country>/ST=<your state>/L=<your city>/O=<Certificate's name without any space. dash is allowed. eg: Example-Certificates>/CN=<your domain name>"
```

```bash
openssl x509 -req -sha256 -days 1024 -in <your domain name>.csr -CA RootCA.pem -CAkey RootCA.key -CAcreateserial -extfile domains.ext -out <your domain name>.crt
```

4) Change your quasar development server setup to be using HTTPS connection

i) Open **quasar.conf.js**

ii) add this library at the top line before the _module.exports_ command
```javascript
const fs = require('fs')
```

iii) Look for **devServer** entry and paste the configuration settings below
```json
devServer: {
  https: {
      key: fs.readFileSync(<location of <your domain name>.key file>),
      cert: fs.readFileSync(<location of <your domain name>.crt file>)
  },
  port: <SSL port. eg: 443, 8444>,
  open: true // opens browser window automatically
},
``` 

5) Make sure that your self-signed certificate is allowed in your browser

**Chrome Browser**

i) Go to _Settings > Manage Certificates > Import_

ii) Make sure you import the RootCA.crt file as a **Trusted Root Certification Authorities**

**Firefox**

i) open **about:config**

ii) look for **security.enterprise_roots.enabled** key and set it to **true**


### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
