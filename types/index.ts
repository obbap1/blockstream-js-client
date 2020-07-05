type OrderSuccessResponse = {
  error?: boolean;
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
};

type OrderErrorResponse = {
  error?: boolean;
  message: string;
};

type InfoResponse = {
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
};

type GetOrderResponse = {
  error?: boolean;
  bid: number | string;
  message_digest: string;
  status: string;
  uuid: string;
  created_at: Date;
  started_transmission_at: Date;
  ended_transmission_at: Date;
  tx_seq_num: string;
  unpaid_bid: number | string;
};

type GetResponseStates = {
  error?: boolean;
  data: Array<GetOrderResponse>;
};

export type OrderResponse =
  | OrderSuccessResponse
  | InfoResponse
  | GetResponseStates
  | GetOrderResponse
  | OrderErrorResponse;
