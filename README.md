# Blockstream JS Client 🙂

## Overview

Find the Documentation for the Blockstream Satellite API [here](https://blockstream.com/satellite/)

## Install

```
npm install blockstream-js-client
```

## Usage

Based on the node environment, this package will shuttle between the main network or the test network.

```js
const B = require('blockstream-js-client');

// Create an Order on the main or test blockstream network
const { auth_token, uuid } = await B.createOrder({
  bid: '10000', // Amount in millisatoshi
  message: `Paschal's bid for a Tesla`,
});

// Edit Bid
B.increaseBid({
  bid_increase: '4000',
  auth_token,
  uuid,
})
  .then((res) => console.log({ res }))
  .catch((error) => console.error(error));

// Monitor the status of the order / Get order
B.getOrder({
  auth_token,
  uuid,
})
  .then((res) => console.log({ res }))
  .catch((error) => console.error(error));

// Delete Order
B.deleteOrder({
  auth_token,
  uuid,
})
  .then((res) => console.log({ res }))
  .catch((error) => console.error(error));

// Get pending, sent and queued orders
B.getOrders({
  state: 'pending',
})
  .then((res) => console.log({ res }))
  .catch((error) => console.error(error));

// Get information about the c-lightning node API
B.getInfo()
  .then((res) => console.log({ res }))
  .catch((error) => console.error(error));

// Subscribe to channels (The only available channel now is the "transmissions" channel)
B.subscribeToChannels(['transmissions'])
  .then((res) => console.log({ res }))
  .catch((error) => console.error(error));
```

## API

This uses some TS definitions. <br>
**|** means **OR** <br>
**?** means **OPTIONAL** <br>

- `createOrder`: Create an Order on the main or test blockstream network <br>

  **Usage**: createOrder({bid : string, file? : string, message?: string}) <br>

  **bid**: Amount in millisatoshi. Required. <br>
  **file**: Link to an attachment. Optional. <br>
  **message**: Message to describe the order. Optional. <br>

  **Returns**:

  ```js
   // Success
   {
    error?: false;
    auth_token: string;
    uuid: string;
    lightning_invoice_id: string;
    description: string;
    status: string;
    msatoshi: string | number;
    payreq: string;
    expires_at: number;
    created_at: number;
    metadata: object;
  }

  // Error
  {
    error?: true;
    message: string;
  }
  ```

- `increaseBid`: Increase the bid for a particular order <br>

  **Usage**: increaseBid({auth_token : string, uuid : string, bid_increase : string
  }) <br>

  **auth_token**: Authentication token. Required. <br>
  **uuid**: Universally unique identifier. Required. <br>
  **bid_increase**: Amount to increase bid by, Millisatoshi. Required. <br>

  **Returns**:

  ```js
  // Success
   {
    error?: false;
    auth_token: string;
    uuid: string;
    lightning_invoice_id: string;
    description: string;
    status: string;
    msatoshi: string | number;
    payreq: string;
    expires_at: number;
    created_at: number;
    metadata: object;
  }

  // Error
  {
    error?: true;
    message: string;
  }
  ```

- `getOrder`: Fetch the details of a particular order<br>

  **Usage**: getOrder({uuid: string, auth_token: string}) <br>

  **uuid**: Required. <br>
  **auth_token**: Required. <br>

  **Returns**:

  ```js
    //Success
    {
        error?: false;
        bid: number | string;
        message_digest: string;
        status: string;
        uuid: string;
        created_at: Date;
        started_transmission_at: Date;
        ended_transmission_at: Date;
        tx_seq_num: string;
        unpaid_bid: number | string;
    }

  // Error
    {
        error?: true;
        message: string;
    }
  ```

- `getOrders`: Get orders that have either been sent, pending or queued. <br>

  **Usage**: getOrders({state: string, limit?: number, before?: string}) <br>

  **state**: 'pending' | 'sent' | 'queued'. Required. <br>
  **limit**: Limit length of response. Optional. Defaults to 20. <br>
  **before**: The date to query with. Optional. <br>

  **Returns**:

```js
 //Success
   {
      error?: false,
      data: [{
        error?: false;
        bid: number | string;
        message_digest: string;
        status: string;
        uuid: string;
        created_at: Date;
        started_transmission_at: Date;
        ended_transmission_at: Date;
        tx_seq_num: string;
        unpaid_bid: number | string;
      }],
    };

  // Error
    {
        error?: true;
        message: string;
    }
```

- `deleteOrder`: Delete a Particular Order <br>

  **Usage**: deleteOrder({uuid: string, auth_token: string}) <br>

  **uuid**: Required. <br>
  **auth_token**: Required. <br>

  **Returns**:

```js
 //Success
    {
      error?: false,
      message: string,
    }

  // Error
    {
        error?: true;
        message: string;
    }
```

- `getInfo`: Get information about the c-lightning node. <br>

  **Usage**: getInfo() <br>

  **Returns**:

```js
 //Success
   {
        error: false;
        id: string;
        alias: string;
        color: string;
        number_of_peers: string | number;
        number_of_active_channels: string | number;
        number_of_inactive_channels: string | number;
        number_of_pending_channels: string | number;
        binding: Array<object>;
        msatoshi_fees_collected: string | number;
        fees_collected_msat: string;
        lightning_directory: string;
        address: Array<object>;
        version: string;
        blockheight: string | number;
        network: string;
    }

  // Error
    {
        error?: true;
        message: string;
    }
```

- `subscribeToChannels`: Subscribe to server-sent event channels. The only channel available now, is the **transmissions** channel. <br>
  **Usage**: subscribeToChannels(channels: Array) <br>

  **channels**: Array of channels. Required. <br>

  **Returns**:

```js
 //Success
   {
      error?: false,
      message: string,
    }

  // Error
    {
        error?: true;
        message: string;
    }
```
