// tslint:disable:interface-name
declare module 'binance-api-node' {
  export default function (options?: {
    apiKey?: string
    apiSecret?: string
    getTime?: () => number | Promise<number>
    httpBase?: string
    httpFutures?: string
    wsBase?: string
    wsFutures?: string
  }): Binance

  export type ErrorCodes_LT = -1000 | -1001 | -1002 | -1003 | -1006 | -1007 | -1013 | -1014
   | -1015 | -1016 | -1020 | -1021 | -1022 | -1100 | -1101 | -1102
   | -1103 | -1104 | -1105 | -1106 | -1112 | -1114 | -1115 | -1116
   | -1117 | -1118 | -1119 | -1120 | -1121 | -1125 | -1127 | -1128
   | -1130 | -2008 | -2009 | -2010 | -2012 | -2013 | -2014 | -2015

  export const enum ErrorCodes {
    UNKNOWN = -1000,
    DISCONNECTED = -1001,
    UNAUTHORIZED = -1002,
    TOO_MANY_REQUESTS = -1003,
    UNEXPECTED_RESP = -1006,
    TIMEOUT = -1007,
    INVALID_MESSAGE = -1013,
    UNKNOWN_ORDER_COMPOSITION = -1014,
    TOO_MANY_ORDERS = -1015,
    SERVICE_SHUTTING_DOWN = -1016,
    UNSUPPORTED_OPERATION = -1020,
    INVALID_TIMESTAMP = -1021,
    INVALID_SIGNATURE = -1022,
    ILLEGAL_CHARS = -1100,
    TOO_MANY_PARAMETERS = -1101,
    MANDATORY_PARAM_EMPTY_OR_MALFORMED = -1102,
    UNKNOWN_PARAM = -1103,
    UNREAD_PARAMETERS = -1104,
    PARAM_EMPTY = -1105,
    PARAM_NOT_REQUIRED = -1106,
    NO_DEPTH = -1112,
    TIF_NOT_REQUIRED = -1114,
    INVALID_TIF = -1115,
    INVALID_ORDER_TYPE = -1116,
    INVALID_SIDE = -1117,
    EMPTY_NEW_CL_ORD_ID = -1118,
    EMPTY_ORG_CL_ORD_ID = -1119,
    BAD_INTERVAL = -1120,
    BAD_SYMBOL = -1121,
    INVALID_LISTEN_KEY = -1125,
    MORE_THAN_XX_HOURS = -1127,
    OPTIONAL_PARAMS_BAD_COMBO = -1128,
    INVALID_PARAMETER = -1130,
    BAD_API_ID = -2008,
    DUPLICATE_API_KEY_DESC = -2009,
    INSUFFICIENT_BALANCE = -2010,
    CANCEL_ALL_FAIL = -2012,
    NO_SUCH_ORDER = -2013,
    BAD_API_KEY_FMT = -2014,
    REJECTED_MBX_KEY = -2015,
  }

  export interface Account {
    accountType: TradingType.MARGIN | TradingType.SPOT
    balances: AssetBalance[]
    buyerCommission: number
    canDeposit: boolean
    canTrade: boolean
    canWithdraw: boolean
    makerCommission: number
    permissions: TradingType_LT[]
    sellerCommission: number
    takerCommission: number
    updateTime: number
  }
  export interface TradeFee {
    symbol: string
    makerCommission: number
    takerCommission: number
  }
  export interface AggregatedTrade {
    aggId: number
    symbol: string
    price: string
    quantity: string
    firstId: number
    lastId: number
    timestamp: number
    isBuyerMaker: boolean
    wasBestPrice: boolean
  }

  export interface AssetBalance {
    asset: string
    free: string
    locked: string
  }

  export type booleanString = 'true' | 'false'

  export interface positionAmount {
    amount: string
    amountInBTC: string
    amountInUSDT: string
    asset: string
  }

  export interface LendingAccount {
    positionAmountVos: positionAmount[]
    totalAmountInBTC: string
    totalAmountInUSDT: string
    totalFixedAmountInBTC: string
    totalFixedAmountInUSDT: string
    totalFlexibleInBTC: string
    totalFlexibleInUSDT: string
  }

  export interface LendingFlexibleProduct {
    asset: string,
    productId: string,
  }

  export interface LendingFlexiblePosition {
    asset: string,
    freeAmount: string,
    freezeAmount: string,
    lockedAmount: string,
    productId: string,
    productName: string,
    totalAmount: string,
  }

  export interface FundingWallet {
    asset: string
    free: string    // available balance
    locked: string  // locked asset
    freeze: string  // freeze asset
    withdrawing: string
    btcValuation: string
  }

  export interface DepositAddress {
    address: string
    tag: string
    coin: string
    url: string
  }

  export interface WithrawResponse {
    id: string
  }

  export type DepositStatus_LT = 0 | 1

  export const enum DepositStatus {
    PENDING = 0,
    SUCCESS = 1,
  }

  export interface DepositHistoryResponse {
    depositList: {
      insertTime: number
      amount: number
      coin: string
      network: string
      address: string
      txId: string
      status: DepositStatus_LT
      addressTag?: string
      transferType?: number
      confirmTimes?: string
    }[]
  }

  export type WithdrawStatus_LT = 0 | 1 | 2 | 3 | 4 | 5 | 6

  export const enum WithdrawStatus {
    EMAIL_SENT = 0,
    CANCELLED = 1,
    AWAITING_APPROVAL = 2,
    REJECTED = 3,
    PROCESSING = 4,
    FAILURE = 5,
    COMPLETED = 6,
  }

  export interface WithdrawHistoryResponse {
    withdrawList: {
      id: string
      amount: number
      transactionFee: number
      address: string
      coin: string
      txId: string
      applyTime: number
      status: WithdrawStatus_LT
      network: string
      transferType?: number
      withdrawOrderId?: string
    }[]
  }

  export interface AssetDetail {
    success: boolean
    assetDetail: {
      [asset: string]: {
        minWithdrawAmount: number
        depositStatus: boolean
        withdrawFee: number
        withdrawStatus: boolean
        depositTip?: string
      }
    }
  }

  export interface BNBBurn {
    spotBNBBurn: boolean;
    interestBNBBurn: boolean;
  }

  export interface SetBNBBurnOptions {
    spotBNBBurn: boolean
    interestBNBBurn: boolean
    recvWindow?: number
  }

  export interface AccountSnapshot {
    code: number
    msg: string
    snapshotVos: {
      data: {
        balances: {
          asset: string
          free: number
          locked: number
        }[]
        totalAssetOfBtc: number
      }
      type: string
      updateTime: number
    }[]
  }

  export type GetOrderOptions =
    | { symbol: string; orderId: number, useServerTime?: boolean }
    | { symbol: string; origClientOrderId: string, useServerTime?: boolean }

  export type CancelOrderOptions =
    | { symbol: string; orderId: number, useServerTime?: boolean, newClientOrderId?: string }
    | { symbol: string; origClientOrderId: string, useServerTime?: boolean, newClientOrderId?: string }

  export type GetOrderOcoOptions =
    | { symbol: string, orderListId: number, useServerTime?: boolean }
    | { symbol: string, listClientOrderId: string, useServerTime?: boolean }

  export type CancelOrderOcoOptions =
    | { symbol: string, orderListId: number, useServerTime?: boolean, newClientOrderId?: string }
    | { symbol: string, listClientOrderId: string, useServerTime?: boolean, newClientOrderId?: string }

  export type cancelOpenOrdersOptions = {
    symbol: string
    useServerTime?: boolean
  }

  export interface GetInfo {
    spot: GetInfoDetails
    futures: GetInfoDetails
  }

  export type GetInfoDetails = {
    usedWeight1m?: string
    orderCount10s?: string
    orderCount1m?: string
    orderCount1h?: string
    orderCount1d?: string
    responseTime?: string
  }

  export type TransferType_LT = 'MAIN_C2C' | 'MAIN_UMFUTURE' | 'MAIN_CMFUTURE'
   | 'MAIN_MARGIN' | 'MAIN_MINING' | 'C2C_MAIN'
   | 'C2C_UMFUTURE' | 'C2C_MINING' | 'UMFUTURE_MAIN'
   | 'UMFUTURE_C2C' | 'UMFUTURE_MARGIN' | 'CMFUTURE_MAIN'
   | 'MARGIN_MAIN' | 'MARGIN_UMFUTURE' | 'MINING_MAIN'
   | 'MINING_UMFUTURE' | 'MINING_C2C'

  export const enum TransferType {
    MAIN_C2C = 'MAIN_C2C',
    MAIN_UMFUTURE = 'MAIN_UMFUTURE',
    MAIN_CMFUTURE = 'MAIN_CMFUTURE',
    MAIN_MARGIN = 'MAIN_MARGIN',
    MAIN_MINING = 'MAIN_MINING',
    C2C_MAIN = 'C2C_MAIN',
    C2C_UMFUTURE = 'C2C_UMFUTURE',
    C2C_MINING = 'C2C_MINING',
    UMFUTURE_MAIN = 'UMFUTURE_MAIN',
    UMFUTURE_C2C = 'UMFUTURE_C2C',
    UMFUTURE_MARGIN = 'UMFUTURE_MARGIN',
    CMFUTURE_MAIN = 'CMFUTURE_MAIN',
    MARGIN_MAIN = 'MARGIN_MAIN',
    MARGIN_UMFUTURE = 'MARGIN_UMFUTURE',
    MINING_MAIN = 'MINING_MAIN',
    MINING_UMFUTURE = 'MINING_UMFUTURE',
    MINING_C2C = 'MINING_C2C',
  }

  export interface UniversalTransfer {
    type: TransferType_LT
    asset: string
    amount: string
    recvWindow?: number
  }

  export interface UniversalTransferHistory {
    type: TransferType_LT
    startTime?: number
    endTime?: number
    current?: number
    size?: number
    recvWindow?: number
  }

  export interface UniversalTransferHistoryResponse {
    total: string
    rows: {
      asset: string
      amount: string
      type: TransferType_LT
      status: string
      tranId: number
      timestamp: number
    }[]
  }

  export interface MarginBorrowParent {
    asset: string
    isIsolated?: 'TRUE' | 'FALSE'
    amount: string
    recvWindow?: number
  }

  export interface MarginBorrowCross extends MarginBorrowParent {
    isIsolated?: 'FALSE'
  }

  export interface MarginBorrowIsolated extends MarginBorrowParent {
    isIsolated: 'TRUE'
    symbol: string
  }

  export type MarginBorrowOptions = MarginBorrowCross | MarginBorrowIsolated

  export type MarginType_LT = 'ISOLATED' | 'CROSSED'

  export const enum MarginType {
    ISOLATED = 'ISOLATED',
    CROSSED = 'CROSSED',
  }

  export interface Binance {
    getInfo(): GetInfo
    accountInfo(options?: { useServerTime: boolean }): Promise<Account>
    tradeFee(options?: { useServerTime: boolean }): Promise<TradeFee[]>
    aggTrades(options?: {
      symbol: string
      fromId?: string
      startTime?: number
      endTime?: number
      limit?: number
    }): Promise<AggregatedTrade[]>
    allBookTickers(): Promise<{ [key: string]: Ticker }>
    book(options: { symbol: string; limit?: number }): Promise<OrderBook>
    exchangeInfo(): Promise<ExchangeInfo>
    lendingAccount(options?: { useServerTime: boolean }): Promise<LendingAccount>
    lendingFlexibleProductList(): Promise<LendingFlexibleProduct[]>
    lendingFlexiblePosition(options: {asset: string}): Promise<LendingFlexiblePosition[]>
    fundingWallet(options?: { asset?: string, needBtcValuation?: booleanString, useServerTime?: boolean }): Promise<FundingWallet[]>
    order(options: NewOrderSpot): Promise<Order>
    orderTest(options: NewOrderSpot): Promise<Order>
    orderOco(options: NewOcoOrder): Promise<OcoOrder>
    ping(): Promise<boolean>
    prices(options?: { symbol?: string }): Promise<{ [index: string]: string }>
    avgPrice(options?: { symbol: string }): Promise<AvgPriceResult | AvgPriceResult[]>
    time(): Promise<number>
    trades(options: { symbol: string; limit?: number }): Promise<TradeResult[]>
    ws: WebSocket
    myTrades(options: {
      symbol: string
      limit?: number
      fromId?: number
      useServerTime?: boolean
    }): Promise<MyTrade[]>
    getOrder(options: GetOrderOptions): Promise<QueryOrderResult>
    getOrderOco(options: GetOrderOcoOptions): Promise<QueryOrderOcoResult>
    cancelOrder(options: CancelOrderOptions): Promise<CancelOrderResult>
    cancelOrderOco(options: CancelOrderOcoOptions): Promise<CancelOrderOcoResult>
    cancelOpenOrders(options: cancelOpenOrdersOptions): Promise<CancelOrderResult[]>
    openOrders(options: { symbol?: string; recvWindow?: number; useServerTime?: boolean }): Promise<QueryOrderResult[]>
    allOrders(options: {
      symbol?: string;
      orderId?: number;
      startTime?: number;
      endTime?: number;
      limit?: number;
      recvWindow?: number;
      timestamp?: number;
      useServerTime?: boolean
    }): Promise<QueryOrderResult[]>
    allOrdersOCO(options: {
      timestamp: number
      fromId?: number
      startTime?: number
      endTime?: number
      limit?: number
      recvWindow: number
    }): Promise<QueryOrderResult[]>
    dailyStats(options?: { symbol: string }): Promise<DailyStatsResult | DailyStatsResult[]>
    candles(options: CandlesOptions): Promise<CandleChartResult[]>
    tradesHistory(options: {
      symbol: string
      limit?: number
      fromId?: number
    }): Promise<TradeResult[]>
    depositAddress(options: { coin: string }): Promise<DepositAddress>
    withdraw(options: {
      coin: string
      network?: string
      address: string
      amount: number
      name?: string
      transactionFeeFlag?: boolean
    }): Promise<WithrawResponse>
    assetDetail(): Promise<AssetDetail>
    getBnbBurn(): Promise<BNBBurn>
    setBnbBurn(opts: SetBNBBurnOptions): Promise<BNBBurn>
    accountSnapshot(options: {
      type: string
      startTime?: number
      endTime?: number
      limit?: number
    }): Promise<AccountSnapshot>
    withdrawHistory(options: {
      coin: string
      status?: number
      startTime?: number
      endTime?: number
      offset?: number
      limit?: number
    }): Promise<WithdrawHistoryResponse>
    depositHistory(options: {
      coin: string
      status?: number
      startTime?: number
      endTime?: number
      offset?: number
      limit?: number
    }): Promise<DepositHistoryResponse>
    universalTransfer(options: UniversalTransfer): Promise<{ tranId: number }>
    universalTransferHistory(
      options: UniversalTransferHistory,
    ): Promise<UniversalTransferHistoryResponse>
    futuresPing(): Promise<boolean>
    futuresTime(): Promise<number>
    futuresExchangeInfo(): Promise<ExchangeInfo>
    futuresBook(options: { symbol: string; limit?: number }): Promise<OrderBook>
    futuresCandles(options: CandlesOptions): Promise<CandleChartResult[]>
    futuresAggTrades(options?: {
      symbol: string
      fromId?: string
      startTime?: number
      endTime?: number
      limit?: number
    }): Promise<AggregatedTrade[]>
    futuresTrades(options: { symbol: string; limit?: number }): Promise<TradeResult[]>
    futuresUserTrades(options: {
      symbol: string
      startTime?: number
      endTime?: number
      fromId?: number
      limit?: number
    }): Promise<FuturesUserTradeResult[]>
    futuresDailyStats(options?: { symbol: string }): Promise<DailyStatsResult | DailyStatsResult[]>
    futuresPrices(): Promise<{ [index: string]: string }>
    futuresAllBookTickers(): Promise<{ [key: string]: Ticker }>
    futuresMarkPrice({symbol: string}): Promise<MarkPriceResult>
    futuresAllForceOrders(options?: {
      symbol?: string
      startTime?: number
      endTime?: number
      limit?: number
    }): Promise<AllForceOrdersResult[]>
    futuresFundingRate(options: {
      symbol: string
      startTime?: number
      endTime?: number
      limit?: number
    }): Promise<FundingRateResult[]>
    futuresOrder(options: NewFuturesOrder): Promise<FuturesOrder>
    futuresCancelOrder(options: {
      symbol: string
      orderId?: number
      origClientOrderId?: string
      useServerTime?: boolean
    }): Promise<CancelOrderResult>
    futuresGetOrder(options: {
      symbol: string
      orderId?: number
      origClientOrderId?: string
      recvWindow?: number
      timestamp?: number
    }): Promise<QueryFuturesOrderResult>
    futuresOpenOrders(options: {
      symbol?: string
      useServerTime?: boolean
    }): Promise<QueryOrderResult[]>
    futuresPositionRisk(options?: { recvWindow: number }): Promise<PositionRiskResult[]>
    futuresLeverageBracket(options?: {
      symbol?: string
      recvWindow: number
    }): Promise<LeverageBracketResult[]>
    futuresAccountBalance(options?: { recvWindow: number }): Promise<FuturesBalanceResult[]>
    futuresAccountInfo(options?: { recvWindow: number }): Promise<FuturesAccountInfoResult>
    futuresPositionMode(options?: { recvWindow: number }): Promise<PositionModeResult>
    futuresPositionModeChange(options: {
      dualSidePosition: string
      recvWindow: number
    }): Promise<ChangePositionModeResult>
    futuresLeverage(options: {
      symbol: string
      leverage: number
      recvWindow?: number
    }): Promise<FuturesLeverageResult>
    futuresMarginType(options: {
      symbol: string
      marginType: MarginType_LT
      recvWindow?: number
    }): Promise<FuturesMarginTypeResult>
    futuresIncome(options: {
      symbol?: string
      incomeType?: FuturesIncomeType_LT
      startTime?: number
      endTime?: number
      limit?: number
      recvWindow?: number
    }): Promise<FuturesIncomeResult[]>
    marginOrder(options: NewOrderMargin): Promise<Order>
    marginGetOrder(options: {
      symbol: string
      isIsolated?: string | boolean
      orderId?: string
      origClientOrderId?: string
      recvWindow?: number
    }): Promise<Order>
    marginAllOrders(options: {
      symbol: string
      useServerTime?: boolean
    }): Promise<QueryOrderResult[]>
    marginCancelOrder(options: {
      symbol: string
      orderId?: number
      useServerTime?: boolean
    }): Promise<CancelOrderResult>
    marginOpenOrders(options: {
      symbol?: string
      useServerTime?: boolean
    }): Promise<QueryOrderResult[]>
    marginRepay(options: MarginBorrowOptions): Promise<{ tranId: number }>
    marginLoan(options: MarginBorrowOptions): Promise<{ tranId: number }>
    marginAccountInfo(options?: { recvWindow?: number }): Promise<IsolatedCrossAccount>
    marginIsolatedAccount(options?: {
      symbols?: string
      recvWindow?: number
    }): Promise<IsolatedMarginAccount>
    marginMaxBorrow(options: {
      asset: string
      isolatedSymbol?: string
      recvWindow?: number
    }): Promise<{ amount: string; borrowLimit: string }>
    marginCreateIsolated(options: {
      base: string
      quote: string
      recvWindow?: number
    }): Promise<{ success: boolean; symbol: string }>
    marginIsolatedTransfer(options: marginIsolatedTransfer): Promise<{ tranId: string }>
    marginIsolatedTransferHistory(
      options: marginIsolatedTransferHistory,
    ): Promise<marginIsolatedTransferHistoryResponse>
    marginMyTrades(options: {
      symbol: string
      isIsolated?: string | boolean
      startTime?: number
      endTime?: number
      limit?: number
      fromId?: number
    }): Promise<MyTrade[]>
  }

  export interface HttpError extends Error {
    code: number
    url: string
  }

  export type UserDataStreamEvent =
    | OutboundAccountInfo
    | ExecutionReport
    | BalanceUpdate
    | OutboundAccountPosition

  export interface WebSocket {
    customSubStream: (
      pair: string | string[],
      callback: (data: any) => void,
    ) => ReconnectingWebSocketHandler
    futuresCustomSubStream: (
      pair: string | string[],
      callback: (data: any) => void,
    ) => ReconnectingWebSocketHandler
    depth: (
      pair: string | string[],
      callback: (depth: Depth) => void,
      transform?: boolean,
    ) => ReconnectingWebSocketHandler
    futuresDepth: (
      pair: string | string[],
      callback: (depth: Depth) => void,
      transform?: boolean,
    ) => ReconnectingWebSocketHandler
    partialDepth: (
      options: { symbol: string; level: number } | { symbol: string; level: number }[],
      callback: (depth: PartialDepth) => void,
      transform?: boolean,
    ) => ReconnectingWebSocketHandler
    futuresPartialDepth: (
      options: { symbol: string; level: number } | { symbol: string; level: number }[],
      callback: (depth: PartialDepth) => void,
      transform?: boolean,
    ) => ReconnectingWebSocketHandler
    ticker: (
      pair: string | string[],
      callback: (ticker: Ticker) => void,
    ) => ReconnectingWebSocketHandler
    miniTicker: (
      pair: string | string[],
      callback: (ticker: MiniTicker) => void,
    ) => ReconnectingWebSocketHandler
    futuresTicker: (
      pair: string | string[],
      callback: (ticker: Ticker) => void,
    ) => ReconnectingWebSocketHandler
    allTickers: (callback: (tickers: Ticker[]) => void) => ReconnectingWebSocketHandler
    futuresAllTickers: (callback: (tickers: Ticker[]) => void) => ReconnectingWebSocketHandler
    futuresAllMarkPrice: (callback: (result: MarkPriceResult[]) => void) => ReconnectingWebSocketHandler  
    futuresAllMiniTickers: (callback: (result: MiniTicker[]) => void) => ReconnectingWebSocketHandler
    candles: (
      pair: string | string[],
      period: string,
      callback: (ticker: Candle) => void,
    ) => ReconnectingWebSocketHandler
    futuresCandles: (
      pair: string | string[],
      period: string,
      callback: (ticker: Candle) => void,
    ) => ReconnectingWebSocketHandler
    trades: (
      pairs: string | string[],
      callback: (trade: WSTrade) => void,
    ) => ReconnectingWebSocketHandler
    aggTrades: (
      pairs: string | string[],
      callback: (trade: AggregatedTrade) => void,
    ) => ReconnectingWebSocketHandler
    futuresLiquidations: (
      symbol: string | string[],
      callback: (forecOrder: ForceOrder) => void,
    ) => ReconnectingWebSocketHandler
    futuresAllLiquidations: (
      callback: (forecOrder: ForceOrder) => void,
    ) => ReconnectingWebSocketHandler
    futuresAggTrades: (
      pairs: string | string[],
      callback: (trade: AggregatedTrade) => void,
    ) => ReconnectingWebSocketHandler

    user: (callback: (msg: UserDataStreamEvent) => void) => Promise<ReconnectingWebSocketHandler>
    marginUser: (
      callback: (msg: OutboundAccountInfo | ExecutionReport) => void,
    ) => Promise<ReconnectingWebSocketHandler>
    futuresUser: (
      callback: (msg: OutboundAccountInfo | ExecutionReport | AccountUpdate | OrderUpdateInfo) => void,
    ) => Promise<ReconnectingWebSocketHandler>
  }

  export type WebSocketCloseOptions = {
    delay: number
    fastClose: boolean
    keepClosed: boolean
  }

  export type ReconnectingWebSocketHandler = (options?: WebSocketCloseOptions) => void

  export type CandleChartInterval_LT = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h'
   | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M'

  export const enum CandleChartInterval {
    ONE_MINUTE = '1m',
    THREE_MINUTES = '3m',
    FIVE_MINUTES = '5m',
    FIFTEEN_MINUTES = '15m',
    THIRTY_MINUTES = '30m',
    ONE_HOUR = '1h',
    TWO_HOURS = '2h',
    FOUR_HOURS = '4h',
    SIX_HOURS = '6h',
    EIGHT_HOURS = '8h',
    TWELVE_HOURS = '12h',
    ONE_DAY = '1d',
    THREE_DAYS = '3d',
    ONE_WEEK = '1w',
    ONE_MONTH = '1M',
  }

  export type RateLimitType_LT = 'REQUEST_WEIGHT' | 'ORDERS'

  export const enum RateLimitType {
    REQUEST_WEIGHT = 'REQUEST_WEIGHT',
    ORDERS = 'ORDERS',
  }

  export type TradingType_LT = 'MARGIN' | 'SPOT'

  export const enum TradingType {
    MARGIN = 'MARGIN',
    SPOT = 'SPOT',
  }

  export type RateLimitInterval_LT = 'SECOND' | 'MINUTE' | 'DAY'

  export const enum RateLimitInterval {
    SECOND = 'SECOND',
    MINUTE = 'MINUTE',
    DAY = 'DAY',
  }

  export interface ExchangeInfoRateLimit {
    rateLimitType: RateLimitType_LT
    interval: RateLimitInterval_LT
    intervalNum: number
    limit: number
  }

  export type ExchangeFilterType_LT = 'EXCHANGE_MAX_NUM_ORDERS' | 'EXCHANGE_MAX_ALGO_ORDERS'

  export const enum ExchangeFilterType {
    EXCHANGE_MAX_NUM_ORDERS = 'EXCHANGE_MAX_NUM_ORDERS',
    EXCHANGE_MAX_ALGO_ORDERS = 'EXCHANGE_MAX_ALGO_ORDERS',
  }

  export interface ExchangeFilter {
    filterType: ExchangeFilterType_LT
    limit: number
  }

  export type SymbolFilterType_LT = 'PRICE_FILTER' | 'PERCENT_PRICE' | 'LOT_SIZE'
   | 'MIN_NOTIONAL' | 'MAX_NUM_ORDERS' | 'MAX_ALGO_ORDERS'

  export const enum SymbolFilterType {
    PRICE_FILTER = 'PRICE_FILTER',
    PERCENT_PRICE = 'PERCENT_PRICE',
    LOT_SIZE = 'LOT_SIZE',
    MIN_NOTIONAL = 'MIN_NOTIONAL',
    MAX_NUM_ORDERS = 'MAX_NUM_ORDERS',
    MAX_ALGO_ORDERS = 'MAX_ALGO_ORDERS',
  }

  export interface SymbolPriceFilter {
    filterType: SymbolFilterType.PRICE_FILTER
    minPrice: string
    maxPrice: string
    tickSize: string
  }

  export interface SymbolPercentPriceFilter {
    filterType: SymbolFilterType.PERCENT_PRICE
    multiplierDown: string
    multiplierUp: string
    avgPriceMins: number
  }

  export interface SymbolLotSizeFilter {
    filterType: SymbolFilterType.LOT_SIZE
    minQty: string
    maxQty: string
    stepSize: string
  }

  export interface SymbolMinNotionalFilter {
    filterType: SymbolFilterType.MIN_NOTIONAL
    applyToMarket: boolean
    avgPriceMins: number
    minNotional: string
  }

  export interface SymbolMaxNumOrdersFilter {
    filterType: SymbolFilterType.MAX_NUM_ORDERS
    maxNumOrders: number
  }

  export interface SymbolMaxAlgoOrdersFilter {
    filterType: SymbolFilterType.MAX_ALGO_ORDERS
    maxNumAlgoOrders: number
  }

  export type SymbolFilter =
    | SymbolPriceFilter
    | SymbolPercentPriceFilter
    | SymbolLotSizeFilter
    | SymbolMinNotionalFilter
    | SymbolMaxNumOrdersFilter
    | SymbolMaxAlgoOrdersFilter

  export interface Symbol {
    baseAsset: string
    baseAssetPrecision: number
    baseCommissionPrecision: number
    filters: SymbolFilter[]
    icebergAllowed: boolean
    isMarginTradingAllowed: boolean
    isSpotTradingAllowed: boolean
    ocoAllowed: boolean
    orderTypes: OrderType_LT[]
    permissions: TradingType_LT[]
    quoteAsset: string
    quoteAssetPrecision: number
    quoteCommissionPrecision: number
    quoteOrderQtyMarketAllowed: boolean
    quotePrecision: number
    status: string
    symbol: string
    pricePrecision: number
    quantityPrecision: number
  }

  export interface ExchangeInfo {
    timezone: string
    serverTime: number
    rateLimits: ExchangeInfoRateLimit[]
    exchangeFilters: ExchangeFilter[]
    symbols: Symbol[]
  }

  export interface OrderBook {
    lastUpdateId: number
    asks: Bid[]
    bids: Bid[]
  }

  export interface NewFuturesOrder {
    symbol: string
    side: OrderSide_LT
    positionSide?: PositionSide_LT
    type: OrderType_LT
    quantity?: string
    reduceOnly?: 'true' | 'false'
    price?: number
    timeInForce?: TimeInForce_LT
    newClientOrderId?: string
    stopPrice?: number
    closePosition?: 'true' | 'false'
    activationPrice?: number
    callbackRate?: number
    workingType?: WorkingType_LT
    newOrderRespType?: NewOrderRespType_LT
    recvWindow?: number
    timestamp?: number
  }

  export interface NewOcoOrder {
    symbol: string
    listClientOrderId?: string
    side: OrderSide_LT
    quantity: string
    limitClientOrderId?: string
    price: string
    limitIcebergQty?: string
    stopClientOrderId?: string
    stopPrice: string
    stopLimitPrice?: string
    stopIcebergQty?: string
    stopLimitTimeInForce?: TimeInForce_LT
    newOrderRespType?: NewOrderRespType_LT
    recvWindow?: number
    useServerTime?: boolean
  }

  export interface NewOrderParent {
    symbol: string
    side: OrderSide_LT
    type: OrderType_LT
    newClientOrderId?: string
    newOrderRespType?: NewOrderRespType_LT
    recvWindow?: number
  }

  export interface NewOrderMarketBase extends NewOrderParent {
    type: OrderType.MARKET
    quantity: string
  }

  export interface NewOrderMarketQuote extends NewOrderParent {
    type: OrderType.MARKET
    quoteOrderQty: string
  }

  export interface NewOrderLimit extends NewOrderParent {
    type: OrderType.LIMIT
    quantity: string
    price: string
    icebergQty?: string
  }

  export interface NewOrderSL extends NewOrderParent {
    type: OrderType.STOP_LOSS_LIMIT | OrderType.TAKE_PROFIT_LIMIT
    quantity: string
    price: string
    stopPrice: string
    icebertQty?: string
  }

  export interface NewMarginOrderParent {
    isIsolated?: 'TRUE' | 'FALSE' | boolean
    sideEffectType?: SideEffectType_LT
    timeInForce?: TimeInForce_LT
  }

  export type NewOrderSpot = NewOrderMarketBase | NewOrderMarketQuote | NewOrderLimit | NewOrderSL

  export type NewOrderMargin = NewOrderSpot & NewMarginOrderParent

  export type SideEffectType_LT = 'NO_SIDE_EFFECT' | 'MARGIN_BUY' | 'AUTO_REPAY'

  export const enum SideEffectType {
    NO_SIDE_EFFECT = 'NO_SIDE_EFFECT',
    MARGIN_BUY = 'MARGIN_BUY',
    AUTO_REPAY = 'AUTO_REPAY',
  }

  export interface OrderFill {
    tradeId: number
    price: string
    qty: string
    commission: string
    commissionAsset: string
  }

  export interface Order {
    clientOrderId: string
    cummulativeQuoteQty: string
    executedQty: string
    fills?: OrderFill[]
    icebergQty?: string
    isIsolated?: boolean
    isWorking: boolean
    orderId: number
    orderListId: number
    origQty: string
    price: string
    side: OrderSide_LT
    status: OrderStatus_LT
    stopPrice?: string
    symbol: string
    time: number
    timeInForce: TimeInForce_LT
    transactTime?: number
    type: OrderType_LT
    updateTime: number
  }

  export interface FuturesOrder {
    clientOrderId: string
    cumQty: string
    cumQuote: string
    executedQty: string
    orderId: number
    avgPrice: string
    origQty: string
    price: string
    reduceOnly: boolean
    side: OrderSide_LT
    positionSide: PositionSide_LT
    status: OrderStatus_LT
    stopPrice: string
    closePosition: boolean
    symbol: string
    timeInForce: TimeInForce_LT
    type: OrderType_LT
    origType: OrderType_LT
    activatePrice: string
    priceRate: string
    updateTime: number
    workingType: WorkingType_LT
  }

  export type ListOrderStatus_LT = 'EXECUTING' | 'ALL_DONE' | 'REJECT'

  export const enum ListOrderStatus {
    EXECUTING = 'EXECUTING',
    ALL_DONE = 'ALL_DONE',
    REJECT = 'REJECT',
  }

  export type ListStatusType_LT = 'RESPONSE' | 'EXEC_STARTED' | 'ALL_DONE'

  export const enum ListStatusType {
    RESPONSE = 'RESPONSE',
    EXEC_STARTED = 'EXEC_STARTED',
    ALL_DONE = 'ALL_DONE',
  }

  export type OcoOrderType_LT = 'OCO'

  export const enum OcoOrderType {
    CONTINGENCY_TYPE = 'OCO',
  }

  export interface OcoOrder {
    orderListId: number
    contingencyType: OcoOrderType.CONTINGENCY_TYPE
    listStatusType: ListStatusType_LT
    listOrderStatus: ListOrderStatus_LT
    listClientOrderId: string
    transactionTime: number
    symbol: string
    orders: Order[]
    orderReports: Order[]
  }

  export type OrderSide_LT = 'BUY' | 'SELL'

  export const enum OrderSide {
    BUY = 'BUY',
    SELL = 'SELL',
  }

  export type OrderStatus_LT = 'CANCELED' | 'EXPIRED' | 'FILLED' | 'NEW' | 'PARTIALLY_FILLED' | 'PENDING_CANCEL'
   | 'REJECTED'

  export const enum OrderStatus {
    CANCELED = 'CANCELED',
    EXPIRED = 'EXPIRED',
    FILLED = 'FILLED',
    NEW = 'NEW',
    PARTIALLY_FILLED = 'PARTIALLY_FILLED',
    PENDING_CANCEL = 'PENDING_CANCEL',
    REJECTED = 'REJECTED',
  }

  export type OrderType_LT = 'LIMIT' | 'LIMIT_MAKER' | 'MARKET' | 'STOP' | 'STOP_MARKET' | 'STOP_LOSS_LIMIT'
   | 'TAKE_PROFIT_LIMIT' | 'TAKE_PROFIT_MARKET' | 'TRAILING_STOP_MARKET'

  export const enum OrderType {
    LIMIT = 'LIMIT',
    LIMIT_MAKER = 'LIMIT_MAKER',
    MARKET = 'MARKET',
    STOP = 'STOP',
    STOP_MARKET = 'STOP_MARKET',
    STOP_LOSS_LIMIT = 'STOP_LOSS_LIMIT',
    TAKE_PROFIT_LIMIT = 'TAKE_PROFIT_LIMIT',
    TAKE_PROFIT_MARKET = 'TAKE_PROFIT_MARKET',
    TRAILING_STOP_MARKET = 'TRAILING_STOP_MARKET',
  }

  export type NewOrderRespType_LT = 'ACK' | 'RESULT' | 'FULL'

  export const enum NewOrderRespType {
    ACK = 'ACK',
    RESULT = 'RESULT',
    FULL = 'FULL',
  }

  export type TimeInForce_LT = 'GTC' | 'IOC' | 'FOK'

  export const enum TimeInForce {
    GTC = 'GTC',
    IOC = 'IOC',
    FOK = 'FOK',
  }

  export type OrderRejectReason_LT = 'ACCOUNT_CANNOT_SETTLE' | 'ACCOUNT_INACTIVE' | 'DUPLICATE_ORDER'
   | 'INSUFFICIENT_BALANCE' | 'MARKET_CLOSED' | 'NONE'
   | 'ORDER_WOULD_TRIGGER_IMMEDIATELY' | 'PRICE_QTY_EXCEED_HARD_LIMITS' | 'UNKNOWN_ACCOUNT'
   | 'UNKNOWN_INSTRUMENT' | 'UNKNOWN_ORDER'

  export const enum OrderRejectReason {
    ACCOUNT_CANNOT_SETTLE = 'ACCOUNT_CANNOT_SETTLE',
    ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE',
    DUPLICATE_ORDER = 'DUPLICATE_ORDER',
    INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
    MARKET_CLOSED = 'MARKET_CLOSED',
    NONE = 'NONE',
    ORDER_WOULD_TRIGGER_IMMEDIATELY = 'ORDER_WOULD_TRIGGER_IMMEDIATELY',
    PRICE_QTY_EXCEED_HARD_LIMITS = 'PRICE_QTY_EXCEED_HARD_LIMITS',
    UNKNOWN_ACCOUNT = 'UNKNOWN_ACCOUNT',
    UNKNOWN_INSTRUMENT = 'UNKNOWN_INSTRUMENT',
    UNKNOWN_ORDER = 'UNKNOWN_ORDER',
  }

  export type ExecutionType_LT = 'NEW' | 'CANCELED' | 'REPLACED'
   | 'REJECTED' | 'TRADE' | 'EXPIRED'

  export const enum ExecutionType {
    NEW = 'NEW',
    CANCELED = 'CANCELED',
    REPLACED = 'REPLACED',
    REJECTED = 'REJECTED',
    TRADE = 'TRADE',
    EXPIRED = 'EXPIRED',
  }

  export interface Depth {
    eventType: string
    eventTime: number
    symbol: string
    firstUpdateId: number
    finalUpdateId: number
    bidDepth: BidDepth[]
    askDepth: BidDepth[]
  }

  export interface BidDepth {
    price: string
    quantity: string
  }

  export interface PartialDepth {
    symbol: string
    level: number
    bids: Bid[]
    asks: Bid[]
  }

  export interface Bid {
    price: string
    quantity: string
  }

  export interface Ticker {
    eventType: string
    eventTime: number
    symbol: string
    priceChange: string
    priceChangePercent: string
    weightedAvg: string
    prevDayClose: string
    curDayClose: string
    closeTradeQuantity: string
    bestBid: string
    bestBidQnt: string
    bestAsk: string
    bestAskQnt: string
    open: string
    high: string
    low: string
    volume: string
    volumeQuote: string
    openTime: number
    closeTime: number
    firstTradeId: number
    lastTradeId: number
    totalTrades: number
  }

  export interface MiniTicker {
    eventType: string,
    eventTime: number,
    symbol: string,
    curDayClose: string,
    open: string,
    high: string,
    low: string,
    volume: string,
    volumeQuote: string
  }

  export interface Candle {
    eventType: string
    eventTime: number
    symbol: string
    startTime: number
    closeTime: number
    firstTradeId: number
    lastTradeId: number
    open: string
    high: string
    low: string
    close: string
    volume: string
    trades: number
    interval: string
    isFinal: boolean
    quoteVolume: string
    buyVolume: string
    quoteBuyVolume: string
  }

  export interface Trade {
    eventType: string
    eventTime: number
    symbol: string
    price: string
    quantity: string
    maker: boolean
    isBuyerMaker: boolean
    tradeId: number
  }

  export interface WSTrade extends Trade {
    tradeTime: number
    buyerOrderId: number
    sellerOrderId: number
  }

  export interface Balances {
    [key: string]: {
      available: string
      locked: string
    }
  }

  export type EventType_LT = 'account' | 'balanceUpdate' | 'outboundAccountPosition'
   | 'executionReport' | 'ACCOUNT_UPDATE'

  export const enum EventType {
    ACCOUNT = 'account',
    BALANCE_UPDATE = 'balanceUpdate',
    OUTBOUND_ACCOUNT_POSITION = 'outboundAccountPosition',
    EXECUTION_REPORT = 'executionReport',
    ACCOUNT_UPDATE = 'ACCOUNT_UPDATE',
    ORDER_UPDATE = 'ORDER_TRADE_UPDATE',
  }

  export interface OutboundAccountInfo {
    balances: Balances
    makerCommissionRate: number
    takerCommissionRate: number
    buyerCommissionRate: number
    sellerCommissionRate: number
    canTrade: boolean
    canWithdraw: boolean
    canDeposit: boolean
    lastAccountUpdate: number
    eventType: EventType.ACCOUNT
    eventTime: number
  }

  export interface OrderUpdateInfo {
    eventType: EventType.ORDER_UPDATE,
    eventTime: number,
    transactionTime: number,
    symbol: string,
    clientOrderId: string,
    side: OrderSide_LT,
    orderType: OrderType_LT,
    timeInForce: TimeInForce_LT,
    quantity: string,
    price: string,
    averagePrice: string,
    stopPrice: string,
    executionType: ExecutionType_LT,
    orderStatus: OrderStatus_LT,
    orderId: number,
    lastTradeQuantity: string,
    totalTradeQuantity: string,
    priceLastTrade: string,
    commissionAsset: string | null,
    commission: string,
    orderTime: number,
    tradeId: number,
    bidsNotional: number,
    asksNotional: number,
    isMaker: boolean,
    isReduceOnly: boolean,
    workingType: WorkingType_LT,
    originalOrderType: OrderType_LT,
    positionSide: OrderSide_LT,
    closePosition: boolean,
    activationPrice: string,
    callbackRate: string,
    realizedProfit: string,
  }

  export interface BalanceUpdate {
    asset: string
    balanceDelta: string
    clearTime: number
    eventTime: number
    eventType: EventType.BALANCE_UPDATE
  }

  export interface OutboundAccountPosition {
    balances: AssetBalance[]
    eventTime: number
    eventType: EventType.OUTBOUND_ACCOUNT_POSITION
    lastAccountUpdate: number
  }

  export interface ExecutionReport {
    commission: string // Commission amount
    commissionAsset: string | null // Commission asset
    creationTime: number // Order creation time
    eventTime: number
    eventType: EventType.EXECUTION_REPORT
    executionType: ExecutionType_LT // Current execution type
    icebergQuantity: string // Iceberg quantity
    isBuyerMaker: boolean // Is this trade the maker side?
    isOrderWorking: boolean // Is the order on the book?
    lastQuoteTransacted: string // Last quote asset transacted quantity (i.e. lastPrice * lastQty);
    lastTradeQuantity: string // Last executed quantity
    newClientOrderId: string // Client order ID
    orderId: number // Order ID
    orderListId: number // OrderListId
    orderRejectReason: OrderRejectReason // Order reject reason; will be an error code.
    orderStatus: OrderStatus_LT // Current order status
    orderTime: number // Transaction time
    orderType: OrderType_LT // Order type
    originalClientOrderId: string | null // Original client order ID; This is the ID of the order being canceled
    price: string // Order price
    priceLastTrade: string // Last executed price
    quantity: string // Order quantity
    quoteOrderQuantity: string // Quote Order Qty
    side: OrderSide_LT // Side
    stopPrice: string // Stop price
    symbol: string // Symbol
    timeInForce: TimeInForce_LT // Time in force
    totalQuoteTradeQuantity: string // Cumulative quote asset transacted quantity
    totalTradeQuantity: string // Cumulative filled quantity
    tradeId: number // Trade ID
  }

  export interface Balance {
    asset: string
    walletBalance: string
    crossWalletBalance: string
  }

  export interface Position {
    symbol: string
    positionAmount: string
    entryPrice: string
    accumulatedRealized: string
    unrealizedPnL: string
    marginType: string
    isolatedWallet: string
    positionSide: string
  }

  export interface AccountUpdate {
    eventTime: string
    eventType: EventType.ACCOUNT_UPDATE
    transactionTime: number
    eventReasonType: string
    balances: Balance[]
    positions: Position[]
  }

  export interface TradeResult {
    id: number
    price: string
    qty: string
    quoteQty: string
    time: number
    isBuyerMaker: boolean
    isBestMatch: boolean
  }

  export interface FuturesUserTradeResult {
    buyer: boolean
    commission: string
    commissionAsset: string
    id: number
    maker: boolean
    orderId: number
    price: string
    qty: string
    quoteQty: string
    realizedPnl: string
    side: OrderSide_LT
    positionSide: PositionSide_LT
    symbol: string
    time: number
  }

  export interface MyTrade {
    id: number
    symbol: string
    orderId: number
    orderListId: number
    price: string
    qty: string
    quoteQty: string
    commission: string
    commissionAsset: string
    time: number
    isBuyer: boolean
    isMaker: boolean
    isBestMatch: boolean
  }

  export interface QueryOrderResult {
    clientOrderId: string
    cummulativeQuoteQty: string
    executedQty: string
    icebergQty: string
    isWorking: boolean
    orderId: number
    orderListId: number
    origQty: string
    origQuoteOrderQty: string
    price: string
    side: OrderSide_LT
    status: OrderStatus_LT
    stopPrice: string
    symbol: string
    time: number
    timeInForce: TimeInForce_LT
    type: OrderType_LT
    updateTime: number
  }

  export interface QueryFuturesOrderResult {
    avgPrice: string
    clientOrderId: string
    cumQuote: string
    executedQty: string
    orderId: string
    origQty: string
    origType: OrderType_LT
    price: string
    side: OrderSide_LT
    positionSide: PositionSide_LT
    status: OrderStatus_LT
    stopPrice: string
    closePosition: boolean
    symbol: string
    time: number
    timeInForce: TimeInForce_LT
    type: OrderType_LT
    activatePrice: string
    priceRate: string
    updateTime: number
    workingType: WorkingType_LT
  }

  export interface QueryOrderOcoResult {
    orderListId: number
    contingencyType: OcoOrderType.CONTINGENCY_TYPE
    listStatusType: ListStatusType_LT
    listOrderStatus: ListOrderStatus_LT
    listClientOrderId: string
    transactionTime: number
    symbol: string
    orders: Order[]
  }

  export interface CancelOrderResult {
    symbol: string
    origClientOrderId: string
    orderId: number
    orderListId: number
    clientOrderId: string
    price: string
    origQty: string
    executedQty: string
    cummulativeQuoteQty: string
    status: string
    timeInForce: string
    type: OrderType_LT
    side: OrderSide_LT
  }

  export interface CancelOrderOcoResult {
    orderListId: number
    contingencyType: OcoOrderType.CONTINGENCY_TYPE
    listStatusType: ListStatusType_LT
    listOrderStatus: ListOrderStatus_LT
    listClientOrderId: string
    transactionTime: number
    symbol: string
    orders: Order[]
    orderReports: Order[]
  }

  export interface AvgPriceResult {
    mins: number
    price: string
  }

  export interface DailyStatsResult {
    symbol: string
    priceChange: string
    priceChangePercent: string
    weightedAvgPrice: string
    prevClosePrice: string
    lastPrice: string
    lastQty: string
    bidPrice: string
    bidQty: string
    askPrice: string
    askQty: string
    openPrice: string
    highPrice: string
    lowPrice: string
    volume: string
    quoteVolume: string
    openTime: number
    closeTime: number
    firstId: number // First tradeId
    lastId: number // Last tradeId
    count: number // Trade count
  }

  export interface CandlesOptions {
    symbol: string
    interval: CandleChartInterval_LT
    limit?: number
    startTime?: number
    endTime?: number
  }

  export interface CandleChartResult {
    openTime: number
    open: string
    high: string
    low: string
    close: string
    volume: string
    closeTime: number
    quoteVolume: string
    trades: number
    baseAssetVolume: string
    quoteAssetVolume: string
  }

  export interface MarkPriceResult {
    symbol: string
    markPrice: string
    lastFundingRate: string
    nextFundingTime: number
    time: number
  }

  export interface AllForceOrdersResult {
    symbol: string
    price: string
    origQty: string
    executedQty: string
    averagePrice: string
    status: string
    timeInForce: string
    type: OrderType_LT
    side: OrderSide_LT
    time: number
  }

  export interface FundingRateResult {
    symbol: string
    fundingRate: string
    fundingTime: number
    time: number
  }

  export interface PositionRiskResult {
    entryPrice: string
    marginType: string
    isAutoAddMargin: string
    isolatedMargin: string
    leverage: string
    liquidationPrice: string
    markPrice: string
    maxNotionalValue: string
    positionAmt: string
    symbol: string
    unRealizedProfit: string
    positionSide: string
  }

  export interface LeverageBracketResult {
    symbol: string
    brackets: Bracket[]
  }

  export interface Bracket {
    bracket: number // Notional bracket
    initialLeverage: number // Max initial leverage for this bracket
    notionalCap: number // Cap notional of this bracket
    notionalFloor: number // Notional threshold of this bracket
    maintMarginRatio: number // Maintenance ratio for this bracket
    cum: 0 // Auxiliary number for quick calculation
  }

  export interface FuturesBalanceResult {
    accountAlias: string
    asset: string
    balance: string
    crossWalletBalance: string
    crossUnPnl: string
    availableBalance: string
    maxWithdrawAmount: string
  }

  export interface FuturesAccountInfoResult {
    feeTier: number
    canTrade: boolean
    canDeposit: boolean
    canWithdraw: boolean
    updateTime: number
    totalInitialMargin: string
    totalMaintMargin: string
    totalWalletBalance: string
    totalUnrealizedProfit: string
    totalMarginBalance: string
    totalPositionInitialMargin: string
    totalOpenOrderInitialMargin: string
    totalCrossWalletBalance: string
    totalCrossUnPnl: string
    availableBalance: string
    maxWithdrawAmount: string
    assets: { [key: string]: string }[]
    positions: FuturesAccountPosition[]
  }

  export interface FuturesAccountPosition {
    symbol: string
    initialMargin: string
    maintMargin: string
    unrealizedProfit: string
    positionInitialMargin: string
    openOrderInitialMargin: string
    leverage: string
    isolated: boolean
    entryPrice: string
    maxNotional: string
    positionSide: string
    positionAmt: string
  }

  export interface FuturesLeverageResult {
    leverage: number
    maxNotionalValue: number
    symbol: string
  }

  export interface FuturesMarginTypeResult {
    code: number
    msg: string
  }

  export type FuturesIncomeType_LT = 'TRANSFER' | 'WELCOME_BONUS' | 'REALIZED_PNL'
   | 'FUNDING_FEE' | 'COMMISSION' | 'INSURANCE_CLEAR'

  export const enum FuturesIncomeType {
    TRANSFER = 'TRANSFER',
    WELCOME_BONUS = 'WELCOME_BONUS',
    REALIZED_PNL = 'REALIZED_PNL',
    FUNDING_FEE = 'FUNDING_FEE',
    COMMISSION = 'COMMISSION',
    INSURANCE_CLEAR = 'INSURANCE_CLEAR',
  }

  export interface FuturesIncomeResult {
    symbol: string
    incomeType: FuturesIncomeType_LT
    income: string
    asset: string
    info: string
    time: number
    tranId: string
    tradeId: string
  }

  export interface ChangePositionModeResult {
    code: number
    msg: string
  }

  export interface PositionModeResult {
    dualSidePosition: boolean
  }

  export interface IsolatedCrossAccount {
    borrowEnabled: boolean
    marginLevel: string
    totalAssetOfBtc: string
    totalLiabilityOfBtc: string
    totalNetAssetOfBtc: string
    tradeEnabled: boolean
    transferEnabled: boolean
    userAssets: CrossAsset[]
  }

  export interface CrossAsset {
    asset: string
    borrowed: string
    free: string
    interest: string
    locked: string
    netAsset: string
  }

  export interface IsolatedMarginAccount {
    assets: IsolatedAsset[]
    totalAssetOfBtc: string
    totalLiabilityOfBtc: string
    totalNetAssetOfBtc: string
  }

  export type MarginLevelStatus_LT = 'EXCESSIVE' | 'NORMAL' | 'MARGIN_CALL'
   | 'PRE_LIQUIDATION' | 'FORCE_LIQUIDATION'

  export const enum MarginLevelStatus {
    EXCESSIVE = 'EXCESSIVE',
    NORMAL = 'NORMAL',
    MARGIN_CALL = 'MARGIN_CALL',
    PRE_LIQUIDATION = 'PRE_LIQUIDATION',
    FORCE_LIQUIDATION = 'FORCE_LIQUIDATION',
  }

  export interface IsolatedAsset {
    baseAsset: IsolatedAssetSingle
    quoteAsset: IsolatedAssetSingle
    symbol: string
    isolatedCreated: boolean
    marginLevel: string
    marginLevelStatus: MarginLevelStatus_LT
    marginRatio: string
    indexPrice: string
    liquidatePrice: string
    liquidateRate: string
    tradeEnabled: boolean
  }

  export interface IsolatedAssetSingle {
    asset: string
    borrowEnabled: boolean
    borrowed: string
    free: string
    interest: string
    locked: string
    netAsset: string
    netAssetOfBtc: string
    repayEnabled: boolean
    totalAsset: string
  }

  export type WalletType_LT = 'SPOT' | 'ISOLATED_MARGIN'

  export const enum WalletType {
    SPOT = 'SPOT',
    ISOLATED_MARGIN = 'ISOLATED_MARGIN',
  }

  export interface marginIsolatedTransfer {
    asset: string
    symbol: string
    transFrom: WalletType_LT
    transTo: WalletType_LT
    amount: number
    recvWindow?: number
  }

  export interface marginIsolatedTransferHistory {
    asset?: string
    symbol: string
    transFrom?: WalletType_LT
    transTo?: WalletType_LT
    startTime?: number
    endTime?: number
    current?: number
    size?: number
    recvWindow?: number
  }

  export interface marginIsolatedTransferHistoryResponse {
    rows: {
      amount: string
      asset: string
      status: string
      timestamp: number
      txId: number
      transFrom: WalletType_LT
      transTo: WalletType_LT
    }[]
    total: number
  }

  export interface ForceOrder {
    symbol: string
    price: string
    origQty: string
    lastFilledQty: string
    accumulatedQty: string
    averagePrice: string
    status: string
    timeInForce: string
    type: OrderType_LT
    side: OrderSide_LT
    time: number
  }

  export interface GetFuturesOrder {
    avgPrice: string
    clientOrderId: string
    cumQuote: string
    executedQty: string
    orderId: number
    origQty: string
    origType: OrderType_LT
    price: string
    reduceOnly: boolean
    side: OrderSide_LT
    positionSide: PositionSide_LT
    status: OrderStatus_LT
    stopPrice: string
    closePosition: boolean
    symbol: string
    time: number
    timeInForce: TimeInForce_LT
    type: OrderType_LT
    activatePrice: string
    priceRate: string
    updateTime: number
    workingType: WorkingType_LT
    priceProtect: boolean
  }

  export type PositionSide_LT = 'BOTH' | 'SHORT' | 'LONG'

  export const enum PositionSide {
    BOTH = 'BOTH',
    SHORT = 'SHORT',
    LONG = 'LONG',
  }

  export type WorkingType_LT = 'MARK_PRICE' | 'CONTRACT_PRICE'

  export const enum WorkingType {
    MARK_PRICE = 'MARK_PRICE',
    CONTRACT_PRICE = 'CONTRACT_PRICE',
  }
}

