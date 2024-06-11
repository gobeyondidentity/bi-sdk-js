<p align="center">
   <br/>
   <a href="https://developers.beyondidentity.com" target="_blank"><img src="https://user-images.githubusercontent.com/238738/178780350-489309c5-8fae-4121-a20b-562e8025c0ee.png" width="150px" ></a>
   <h3 align="center">Beyond Identity</h3>
   <p align="center">Universal Passkeys for Developers</p>
   <p align="center">
   All devices. Any protocol. Zero shared secrets.
   </p>
</p>

# Beyond Identity JavaScript SDK

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

### Embedded SDK

Goodbye, passwords! The Beyond Identity SDKs allow you to embed the Passwordless experience into your product. A set of functions are provided to you through the Embedded namespace. These SDKs supports OIDC and OAuth 2.0.

## Installation

```
yarn add @beyondidentity/bi-sdk-js
```

or

```
npm install @beyondidentity/bi-sdk-js
```

## Usage

Check out the [Developer Documentation](https://developer.beyondidentity.com) and the [SDK API Documentation](https://gobeyondidentity.github.io/bi-sdk-js/) for more information.

### Setup

First, before calling the Embedded functions, make sure to initialize the SDK.

```typescript
import { Embedded } from "@beyondidentity/bi-sdk-js";

const embedded = await Embedded.initialize();
```

## Example App

To get started:

```
git clone git@github.com:gobeyondidentity/bi-sdk-js.git
yarn example
```
