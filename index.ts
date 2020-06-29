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

async function getOrder(order: IGetOrder): Promise<OrderResponse> {
  try {
    const response = await callApi.get(`/order/${order.uuid}`, {
      headers: {
        'X-Auth-Token': order.auth_token,
      },
    });

    console.log({ response });

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

async function deleteOrder(order: IGetOrder): Promise<OrderResponse> {
  try {
    const response = await callApi.delete(`/order/${order.uuid}`, {
      headers: {
        'X-Auth-Token': order.auth_token,
      },
    });

    console.log({ response });
    return {
      error: false,
      message: `Order ${order.uuid} has been deleted successfully!`,
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

    const response = await callApi.get(`/order/${order.state}/${query}`);

    console.log({ response });

    return {
      error: false,
      message: 'Yup',
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
    console.log({ response });
    return {
      error: false,
      id: response.data?.id,
      port: response.data?.port,
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
): Promise<any> {}
