type OrderSuccessResponse = {
  error: boolean;
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
  error: boolean;
  message: string;
};

type InfoResponse = {
  error: boolean;
  id: string;
  port: string | number;
  address: string;
  version: string;
  blockheight: string;
  network: string;
};

export type OrderResponse =
  | OrderSuccessResponse
  | InfoResponse
  | OrderErrorResponse;
