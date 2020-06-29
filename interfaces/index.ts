export interface IOrder {
  readonly bid: string | number;
  readonly file?: string;
  readonly message?: string;
}

export interface IEditOrder {
  readonly bid_increase: string | number;
  readonly auth_token: string;
  readonly uuid: string;
}

export interface IGetOrder {
  readonly uuid: string;
  readonly auth_token: string;
}

export interface IQueryOrder {
  readonly state: string;
  readonly limit?: Date;
  readonly before?: Date;
}
