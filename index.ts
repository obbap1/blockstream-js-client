import { callApi } from './services/http.service';
import { IOrder, IEditOrder, IGetOrder, IQueryOrder } from './interfaces';
import * as qs from 'querystring';
import { OrderResponse } from './types/index';
import { STATE } from './enums';

/**
 *
 * @param order
 * @returns object
 */

export async function createOrder(order: IOrder): Promise<OrderResponse> {
  try {
    if (!order.message && !order.file) throw new Error('Invalid Parameters');
    const data = (order as unknown) as qs.ParsedUrlQueryInput;
    const response = await callApi.post('/order', qs.stringify(data));
    return {
      error: false,
      auth_token: response.data?.auth_token,
      uuid: response.data?.uuid,
      lightning_invoice_id: response.data?.lightning_invoice?.id,
      description: response.data?.lightning_invoice?.description,
      status: response.data?.lightning_invoice?.status,
      msatoshi: response.data?.lightning_invoice?.msatoshi,
      payreq: response.data?.lightning_invoice?.payreq,
      expires_at: response.data?.lightning_invoice?.expires_at,
      created_at: response.data?.lightning_invoice?.created_at,
      metadata: { ...response.data?.lightning_invoice?.metadata },
    };
  } catch (error) {
    return {
      error: true,
      message:
        error.message || error.response?.statusText || 'An Error occured!',
    };
  }
}

export async function increaseBid(order: IEditOrder): Promise<OrderResponse> {
  try {
    const data = {
      auth_token: order.auth_token,
      bid_increase: order.bid_increase,
    };

    const response = await callApi.post(
      `/order/${order.uuid}/bump`,
      qs.stringify(data)
    );

    return {
      error: false,
      auth_token: response.data?.auth_token,
      uuid: response.data?.uuid,
      lightning_invoice_id: response.data?.lightning_invoice?.id,
      description: response.data?.lightning_invoice?.description,
      status: response.data?.lightning_invoice?.status,
      msatoshi: response.data?.lightning_invoice?.msatoshi,
      payreq: response.data?.lightning_invoice?.payreq,
      expires_at: response.data?.lightning_invoice?.expires_at,
      created_at: response.data?.lightning_invoice?.created_at,
      metadata: { ...response.data?.lightning_invoice?.metadata },
    };
  } catch (error) {
    return {
      error: true,
      message:
        error.message || error.response?.statusText || 'An Error occured!',
    };
  }
}

export async function getOrder(order: IGetOrder): Promise<OrderResponse> {
  try {
    const response = await callApi.get(`/order/${order.uuid}`, {
      headers: {
        'X-Auth-Token': order.auth_token,
      },
    });

    return {
      error: false,
      bid: response.data.bid,
      message_digest: response.data.message_digest,
      status: response.data.status,
      uuid: response.data.uuid,
      created_at: response.data.created_at,
      started_transmission_at: response.data.started_transmission_at,
      ended_transmission_at: response.data.ended_transmission_at,
      tx_seq_num: response.data.tx_seq_num,
      unpaid_bid: response.data.unpaid_bid,
    };
  } catch (error) {
    return {
      error: true,
      message:
        error.message || error.response?.statusText || 'An Error occured!',
    };
  }
}

export async function deleteOrder(order: IGetOrder): Promise<OrderResponse> {
  try {
    const response = await callApi.delete(`/order/${order.uuid}`, {
      headers: {
        'X-Auth-Token': order.auth_token,
      },
    });

    return {
      error: false,
      message: response.data.message_digest,
    };
  } catch (error) {
    return {
      error: true,
      message:
        error.message || error.response?.statusText || 'An Error occured!',
    };
  }
}

export async function getOrders(order: IQueryOrder): Promise<OrderResponse> {
  try {
    if (!(order.state in STATE)) throw new Error('Invalid request');

    const data = ({
      limit: order.limit,
      before: order.before,
    } as unknown) as qs.ParsedUrlQueryInput;

    const query =
      data.limit || data.before
        ? qs.stringify({
            ...(data.limit && {
              limit: data.limit,
            }),
            ...(data.before && {
              before: data.before,
            }),
          })
        : '';

    const response = await callApi.get(`/orders/${order.state}?${query}`);

    return {
      error: false,
      data: response.data,
    };
  } catch (error) {
    return {
      error: true,
      message:
        error.message || error.response?.statusText || 'An Error occured!',
    };
  }
}

export async function getInfo(): Promise<OrderResponse> {
  try {
    const response = await callApi.get('/info');

    return {
      error: false,
      id: response.data?.id,
      alias: response.data.alias,
      color: response.data.color,
      number_of_peers: response.data.num_peers,
      number_of_active_channels: response.data.num_active_channels,
      number_of_inactive_channels: response.data.num_inactive_channels,
      number_of_pending_channels: response.data.num_pending_channels,
      binding: response.data.binding,
      msatoshi_fees_collected: response.data.msatoshi_fees_collected,
      fees_collected_msat: response.data.fees_collected_msat,
      lightning_directory: response.data['lightning-dir'],
      address: response.data?.address,
      version: response.data?.version,
      blockheight: response.data?.blockheight,
      network: response.data?.network,
    };
  } catch (error) {
    return {
      error: true,
      message:
        error.message || error.response?.statusText || 'An Error occured!',
    };
  }
}

export async function subscribeToChannels(
  channels: Array<string>
): Promise<any> {
  try {
    const list = channels.join(',');

    const results = (await callApi.get(`/subscribe/${list}`)) || [];

    return results;
  } catch (error) {
    return {
      error: true,
      message:
        error.message || error.response?.statusText || 'An Error occured!',
    };
  }
}
