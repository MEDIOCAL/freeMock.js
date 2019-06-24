const path = require("path")

module.exports = {
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
    

    // 接入 swagger api。 （ swagger 在前面并且空一格，用于区别代理地址和 swagger 地址 ）
    "/ncrm/*": "swagger https://imp-daily.uc.test/ncrm/v2/api-docs",


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
    
    Cookie: '_pk_id.2804852a3abc.ac81=cd8e392b-3702-469d-9b38-42b13dd1f6f4.1534147992.2.1534418441.1534148143.; cna=eSr4E356dFYCAWoLKdVGypbn; _pk_id..ac81=6a098f87-2431-48ba-bf14-35e7ef0135e5.1555578393.1.1555578394.1555578393.; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.NKjjhtPl-e-fkKQaXvtvk-PFDPaxY0RsxUON6A5DoVaXlLCLwABYYw.4jk7w2J7KKNkhUWTgk5JbQ.rc9NjRShL-4aDP-NeIWNfdKmdyqE9rkJVGhVlJIu_e2eIoMpsT9vU3yXuav-mO-PJavz6uomFoDJ1nlh_oVx6iI_MK-z6nyXAepj3SlEMHTMhgb1KTBOe2dJIPI3DMlBPWkcwhDwsiaJvlFr5zw3wWCFB2V991q9JoDGdXSrEQR50R1v-Zq6CtrDxNRp2zNoLRhMtb9GWyVVN1WO--zYQN2pY-WNEdBZCFdaDGvKfv1gn5UC47SufxuYl7QOUXQowAF1Ty7fgzgNJAS5O7jPVGL2iUa5Hk9OUYnKjuhQ9BxLnTNrU0fPa6u54EQsU9bmsZOYl0JtDQQtFeBiss4Y6z3g_MHftz3Rq26WBUqg-l4ouzKiQJGkxMVk7USS1-ov.s2yXWbYeu5sSK5LM-ooh4Q"; UC-CSRF-TOKEN=99f43bf30e0401246fc92f2e2505bff1; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.NKjjhtPl-e-fkKQaXvtvk-PFDPaxY0RsxUON6A5DoVaXlLCLwABYYw.4jk7w2J7KKNkhUWTgk5JbQ.rc9NjRShL-4aDP-NeIWNfdKmdyqE9rkJVGhVlJIu_e2eIoMpsT9vU3yXuav-mO-PJavz6uomFoDJ1nlh_oVx6iI_MK-z6nyXAepj3SlEMHTMhgb1KTBOe2dJIPI3DMlBPWkcwhDwsiaJvlFr5zw3wWCFB2V991q9JoDGdXSrEQR50R1v-Zq6CtrDxNRp2zNoLRhMtb9GWyVVN1WO--zYQN2pY-WNEdBZCFdaDGvKfv1gn5UC47SufxuYl7QOUXQowAF1Ty7fgzgNJAS5O7jPVGL2iUa5Hk9OUYnKjuhQ9BxLnTNrU0fPa6u54EQsU9bmsZOYl0JtDQQtFeBiss4Y6z3g_MHftz3Rq26WBUqg-l4ouzKiQJGkxMVk7USS1-ov.s2yXWbYeu5sSK5LM-ooh4Q; userinfo=gK6kakJIYDbgs5bA5ixDjQz7vUKwLdC6OEn3Xzicy%2Fg5%2FyLFlnt1LZ6uJafKe5U%2B; _pk_id.281d154241f7.ac81=fe17d531-754b-4ba4-aea0-3c67cf00a19e.1558576590.1.1558576590.1558576590.; _pk_ses.281d154241f7.ac81=*; _pk_cvar.test-123.ac81=%7B%221%22%3A%5B%22userId%22%2C%221061%22%5D%2C%222%22%3A%5B%22source%22%2C%22cpc%22%5D%2C%223%22%3A%5B%22operatorId%22%2C%221061%22%5D%2C%224%22%3A%5B%22userRoles%22%2C%22account_management_service%2Csuper_token%2Cinternal_api%2CROLE_TUIGUANG_CHILD%2CROLE_ABSTRACT_TUIGUANG%2CROLE_TUIGUANG_VIP%22%5D%2C%225%22%3A%5B%22operateRoles%22%2C%22account_management_service%2Csuper_token%2Cinternal_api%2CROLE_TUIGUANG_CHILD%2CROLE_ABSTRACT_TUIGUANG%2CROLE_TUIGUANG_VIP%22%5D%2C%226%22%3A%5B%22operatorName%22%2C%22%E6%90%BA%E7%A8%8B%E6%97%85%E8%A1%8C%E7%BD%91%22%5D%7D; _pk_ses.test-123.ac81=*; _pk_id.test-123.ac81=0d47ff9f-345a-4a7b-b7cb-0f748b76762a.1558576599.1.1558576601.1558576599.'

}