const path = require("path")

module.exports = {
    // "/kehubao/downward": "SSE /mock",
    "/kehubao/downward": function(param, req, state) {
        return {
            // LONG: true,
            status: 0,
            "messsage": "OK",
            "data|1-5": [
                {
                    "eventId": 1,
                    "eventType": "@integer(1, 3)",
                    "eventContent": {
                        "conversationId": "@integer(1, 999)",
                    }
                }
            ]
        }
    },
    
    // 接入第三方 mock 平台。 （同样是 ncrm/* 下的接口，排在前面优先级更高）请求 https://mocks.alibaba-inc.com/mock/ncrm/promotionUser/siteUrlList
    "/ncrm/promotionUser/siteUrlList": "https://mocks.alibaba-inc.com/mock",

    // 读取本地 json 文件 （ 如果没有文件，会新建 /mock/ctp/a.json ）
    "/cpt/a": path.resolve(__dirname, "../mock"),

    // 读取本地 json 同上（简写模式）
    "/cpt/b": "/mock",

    // 代理，读取测试环境  http://ad-test1.sm.cn/pmtools/* 的数据 
    "/pmtools/*": "http://ad-test1.sm.cn",

    // 直接生成数据，格式支持 mockjs 语法， 可以使用 @param 拿到接口传递的参数， 例如  @param.pageSize 拿到的是 /test11/a?pageSize=10 中的 10
    "/test11/*": {
        status: 0,
        "result|@param.pageSize": [{
            id: '@increment',
            name: "@name",
            age: "@integer(0, 100)",
        }]
    },
    
    "/sso/*": "http://imp-daily.uc.test",
    // 接入 swagger api。 （ swagger 在前面并且空一格，用于区别代理地址和 swagger 地址 ）
    "/ncrm/*": "http://imp-daily.uc.test",


    // function 得到执行 function 返回值的数据。 param：同上 @param；req：请求头； state： 本文件中所有除路径之外的配置
    "/test22/*": function(param, req, state) {
        return {
            status: 0,
            result: {
                pageSize: param.pageSize,
                header: req.header,
                Cookie: state.Cookie
            }
        }
    },

    "/test33/*": function(req, state, res) {
        const param = req.query
        res.json(state.mock({
            status: 0,
            result: {
                pageSize: param.pageSize,
                header: req.headers,
                Cookie: state.Cookie
            }
        }))
    },
    
    Cookie: '_bl_uid=7jjIOx7ktkFvqvpdkpwt7hzlX50e; _pk_ses.2a3b3ad3164a.1d7f=*; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.deJt3W8rTvJsTn2tpJOiFvUnlALbZbU0bGKDwbliQwXEyAmKAOVWnQ.qv0bfMyCHJVmnVTjziVazw.oW4qsLQWDITxAkH3Mphrjjno0UkFgI29E5HIXPAkME93Chges71JJtmQ30FSPR7qwyqhtFPsNyskED5MEOVb3O8_CZAFlV8oVu2KAu7m6PrbKhjO3wM-fQoMtamJyecA1ID6s9OSmskogF_y9fbIm7E84IHb_8_e_Vi4vV8J3OmOjp9o3aqTyynUqV0wbwoJ0md4Vhm5JohYiJony2AsAOr0wyLXVJ1pZ6GXiaG_zQ0YNrAPoOQEhVLgD8gtCY0spakuvglw9T8uY-JMYguVrIHiEiKnp5VrjLhDavi2oVMQ5_x-9hoL7YfVXQ1dD2UEW5jlGzqKkngCSMJH6e82u7Q9tudsEzMJTKmBGuDPE_hC3B3cyhP-qevStHHCg8FC53JwfyLvmY9FL1SS1h9N3A.vFTxQvWyozm2Mgeg8kaEXA; UC-CSRF-TOKEN=be010c9abf158c0ef3f5f96e6e1b0185; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.deJt3W8rTvJsTn2tpJOiFvUnlALbZbU0bGKDwbliQwXEyAmKAOVWnQ.qv0bfMyCHJVmnVTjziVazw.oW4qsLQWDITxAkH3Mphrjjno0UkFgI29E5HIXPAkME93Chges71JJtmQ30FSPR7qwyqhtFPsNyskED5MEOVb3O8_CZAFlV8oVu2KAu7m6PrbKhjO3wM-fQoMtamJyecA1ID6s9OSmskogF_y9fbIm7E84IHb_8_e_Vi4vV8J3OmOjp9o3aqTyynUqV0wbwoJ0md4Vhm5JohYiJony2AsAOr0wyLXVJ1pZ6GXiaG_zQ0YNrAPoOQEhVLgD8gtCY0spakuvglw9T8uY-JMYguVrIHiEiKnp5VrjLhDavi2oVMQ5_x-9hoL7YfVXQ1dD2UEW5jlGzqKkngCSMJH6e82u7Q9tudsEzMJTKmBGuDPE_hC3B3cyhP-qevStHHCg8FC53JwfyLvmY9FL1SS1h9N3A.vFTxQvWyozm2Mgeg8kaEXA"; _pk_cvar.2a3b3ad3164a.1d7f=%7B%221%22%3A%5B%22crm%22%2C%22%E6%B1%87%E5%B7%9DCRM%E7%AE%A1%E7%90%86%E5%91%98%22%5D%7D; _pk_id.2a3b3ad3164a.1d7f=99073497-a710-41f0-81a5-889bd9a7523f.1562559725.1.1562559857.1562559725.'

}