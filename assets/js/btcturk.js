class BtcTurkApi {
  base = "https://api.btcturk.com";
  headers = {
    method: "GET",
    mode:'cors',
    headers: {
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Credentials":"*",
    },
  };
  constructor() {}
  ticker(pairSymbol) {
    return new Promise((resolve, reject) => {
      fetch(this.base + "/api/v2/ticker?pairSymbol=" + pairSymbol,this.headers)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
  orderbook(pairSymbol) {
    return new Promise((resolve, reject) => {
      fetch(this.base + "/api/v2/orderbook?pairSymbol=" + pairSymbol)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
  trades(pairSymbol, count) {
    return new Promise((resolve, reject) => {
      fetch(
        this.base + "/api/v2/trades?pairSymbol=" + pairSymbol + "&last=" + count
      )
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}
