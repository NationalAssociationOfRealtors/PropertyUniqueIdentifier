# Property Unique Identifier
An Ethereum based distributed ledger to register, track, and query property unique identifiers.

# Screenshots

![Dashboard 1](./src/images/screenshot.png "Dashboard 1")


## Installation

1. Install truffle and an ethereum client. For local development, try EthereumJS TestRPC.
    ```javascript
    npm install -g truffle // Version 3.0.5+ required.
    npm install -g ethereumjs-testrpc
    ```
2. Launch TestRPC in a separate tab.
    ```javascript
    testrpc
    ```
3. Compile, migrate, then test the contracts.
    ```javascript
    truffle compile
    truffle migrate
    truffle test
    ```

4. Run the `liteserver` development server for front-end hot reloading. For now, smart contract changes must be manually recompiled and migrated.
    ```javascript
    npm run dev
    ```

5. You will need a web browser that supports web3 or a plugin for Chrome like [MetaMask](https://metamask.io/) to be able to interact with the application.

**NOTE**: This repo is not a complete dapp, but the starting point for a solution to the property unique identifier project.




# Support and documentation
[Dave Conroy](https://twitter.com/conroydave)

[CRT Labs](https://twitter.com/crtlabs)
