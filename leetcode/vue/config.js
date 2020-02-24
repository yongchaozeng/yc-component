module.exports = {
  dev: {
    baseUrl: "http://ccc-api",
    clientBaseUrl: "https://ccc-api-dev.dev-test.dragonest.com",
    loginUrl: "https://ccc-sso.dev-test.mmxlr.com",
    service: "https://ccc-registration-dev.dev-test.dragonest.com"
  },
  // dev: {
  //   baseUrl: "https://ccc-api-qa.dev-test.dragonest.com",
  //   clientBaseUrl: "https://ccc-api-qa.dev-test.dragonest.com",
  //   loginUrl: "https://ccc-sso-qa.dev-test.mmxlr.com",
  //   service: "http://127.0.0.1:3001"
  // },
  qa: {
    baseUrl: "http://ccc-api",
    clientBaseUrl: "https://ccc-api-qa.dev-test.dragonest.com",
    loginUrl: "https://ccc-sso-qa.dev-test.mmxlr.com",
    service: "http://ccc.qa.cnccbm.org.cn"
  },
  prod: {
    baseUrl: "https://ccc-api-prod.dev-test.dragonest.com",
    loginUrl: "https://ccc-sso.dev-test.mmxlr.com",
    service: "https://ccc-registration-dev.dev-test.dragonest.com"
  }
};
