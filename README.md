<p align="center">
   <br/>
   <a href="https://developers.beyondidentity.com" target="_blank"><img src="https://user-images.githubusercontent.com/238738/178780350-489309c5-8fae-4121-a20b-562e8025c0ee.png" width="150px" ></a>
   <h3 align="center">Beyond Identity</h3>
   <p align="center">Universal Passkeys for Developers</p>
   <p align="center">
   All devices. Any protocol. Zero shared secrets.
   </p>
</p>

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

## Usage

```typescript
import * as embeddedsdk from "@beyondidentity/bi-sdk-js";

async function initialize(): Promise<embeddedsdk.Embedded> {
    return embeddedsdk.Embedded.initialize();
}
```
Check out the [documentation](https://developer.beyondidentity.com) for more information.

## Example App

To get started:

```
git clone git@github.com:gobeyondidentity/bi-sdk-js.git
yarn example
```
