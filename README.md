![Beyond-Identity-768x268](https://user-images.githubusercontent.com/6456218/111526630-5c826d00-8735-11eb-84ae-809af105b626.jpeg)

# Beyond Identity JS SDK

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

### Embedded

Offering the entire experience embedded in your product. Users will not need to navigate to the Beyond Identity Authenticator.

## Installation

To integrate add `embeddedsdk` under dependencies.
Initialize an instance of the embedded SDK

```typescript
import * as embeddedsdk from "embeddedsdk";

async function initialize(): Promise<embeddedsdk.Embedded> {
    return embeddedsdk.Embedded.initialize();
}
```

```javascript
// Importing this module will install the module's exports at
// window.embeddedsdk. The name we import the module as
// is meaningless.

import * as _embeddedsdk from "./bi-embedded.js";

async function initialize() {
  return window.embeddedsdk.Embedded.initialize();
}
```

## Usage
Check out the [documentation](https://docs.beyondidentity.com) for more info.

## Prerequisites
Since most of the heavy lifting is delegated to the Beyond Identity Authenticator client when integrating this flow, you need to [download](https://app.byndid.com/downloads) the app on your development device.

## Sample App and Walkthrough
- A sample apps is available to explore [here](https://github.com/byndid/bi-sdk-js/tree/main/example). 

- You can also try registering and logging in without a password with a fictional financial services demo app [Acme Pay](https://acme-app.byndid.com/). 

https://www.beyondidentity.com/customer-passwordless-solution/live-demo
