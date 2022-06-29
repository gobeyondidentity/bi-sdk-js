![beyond-identity-logo](https://user-images.githubusercontent.com/6578679/172954923-7a0c741a-8ee6-4ba3-a610-1b073f3eec59.png)

# Beyond Identity JS SDK

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

### Embedded

Offering the entire experience embedded in your product. Users will not need to navigate to the Beyond Identity Authenticator.

## Installation

```
yarn add @beyondidentity/bi-sdk-js
```
or 
```
npm install @beyondidentity/bi-sdk-js
```

And add the following to your package.json:

```json
"scripts": {
  ...
  "copy:wasm": "cp -R ../node_modules/@beyondidentity/bi-sdk-js/coresdk/dist/*.wasm public",
  "build": "yarn copy:wasm && <build steps>",
  ...
}
```

This is to ensure that the included wasm binary can be fetched publicly.

> :warning: This assumes your publicly available static assets are located in "public".

## Usage

```typescript
import * as embeddedsdk from "@beyondidentity/bi-sdk-js";

async function initialize(): Promise<embeddedsdk.Embedded> {
    return embeddedsdk.Embedded.initialize();
}
```
Check out the [documentation](https://developer.beyondidentity.com) for more information.

## Example App

```
git clone git@github.com:gobeyondidentity/bi-sdk-js.git
cd bi-sdk-js
yarn install && yarn build
cd examples/app/js
yarn build && yarn start
```

Then open the example app [here](http://192.168.1.178:8083).
