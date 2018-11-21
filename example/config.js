module.exports = {
    mockData: [{
        url: '/test',
        data: {
            people: {
                name: "@name()",
                age: "@number(req.fixed)",
            }
        }
    }, {
        url: '/login',
        interceptors: function(state, req) {
            if(
                req.query.name === state.username &&
                req.query.password === state.password
            ) {
                state.isLogin = true
            }
            return {
                msg:'登陆成功'
            }
        }
    }, {
        url: '/logout',
        interceptors: function(state, req) {
            state.isLogin = false
            return {
                msg:'登出成功'
            }
        }
    }, {
        url:'/test1',
        method:'GET',
        "data|<2": {
            name: "@name()",
            "list|<req.size": {
                title:"@title()",
                time: "@time()",
                height: "@number(2)",
                size: function(ctx, state) {
                    return ctx.query.size
                },
                pageNo: "@params(pageNo)",
                name: "@getName(chenxuehui)",
                lists: [
                    {
                        name: "chenxuhui"
                    },
                    {
                        name: "mingjie"
                    }
                ],
                met: {
                    title: "nihao",
                    list: [
                        'nihao',
                        {
                            color: "#fff"
                        }
                    ]
                }
            }
        }
    }, {
        url: '/test2',
        method: 'get',
        data: {
            status: 0,
            result: [
                {
                    name: "zhaohang"
                }, {
                    name: "minjie"
                }
            ],
            tag: {
                title: "biaoqian",
                options: [
                    {
                        name: "biaoqian1"
                    }, {
                        name: "biaoqian2"
                    },
                    "niaho"
                ]
            }
        }
    }, {
        url: '/test3',
        method: 'get',
        data: {
            status: 1,
            name: "@name()",
            list: [
                {
                    name: "@name",
                    age: "@number()"
                },
                "nihao",
                "@name()",
                [
                    "nihaoya",
                    "@title()",
                    {
                        age: "@date()"
                    }
                ]
            ]
        }
    }, {
        url:'/huihui',
        data: {
            "nihao": 'nis'
        },
        proxy: true
    }, {
        url: '/wolong',
        method: 'GET',
        data: {
            name: "123",
            template: "456"
        }
    }, {
        url:'/wolongweb/plan/listNaive',
        proxy: 'https://ad-test1.sm.cn',
        method: 'GET',
        port: '443',
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Host': 'ad-test1.sm.cn',
            'Referer': 'https://ad-test1.sm.cn/cpc/static/index.html?uid=1061',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
            'Cookie': '_pk_id.2804852a3abc.ac81=cd8e392b-3702-469d-9b38-42b13dd1f6f4.1534147992.2.1534418441.1534148143.; cna=eSr4E356dFYCAWoLKdVGypbn; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.fnFbwGJjk4nFxjGfqUoWs6qSskRO-TkzWQYVlKElM7O3_VJgXB5FCQ.tUgwM5qL7FB6CzsRu1KU0A.DQhuBJkKRkfBzaeW7aaMPKFRjnkSwnwpLNylmm1mxwyU6lDpSePHIOcRGJ54Uyuqe5i8EC0nZGS0GOS37gHElCBuRK975AqsgbgIgyxPYVkZYgnHi965Y_KdwNH9vLCJf0w-RFuWOmZszMIlNe2123j7Z3hh_eGxNPAOsaC6SQtg7nJe-4NUbEWSaq3tEnNpnUb-aJxe-TSVoWYlAVkEtbjZgpp9p6ryOkJteHq8gOLz914Ue7xKaR0CjZWlF3aI7tDFTx9XmjmtG0e5QFRXS2p5hL1DtGPZgp7EpP4tBc-3prjacRBZNI01Mjyx4AD9Q8jnheg_ebtaFxBnElKhL-AM4h9vg1liXvNQ-PjYPIeTsrYSKov6meTSx7mlMb0q.d_pQJmBrQhGxT50bXtdAYA; UC-CSRF-TOKEN=852d2f8fabc618ad95bf5396cd6b93d5; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.fnFbwGJjk4nFxjGfqUoWs6qSskRO-TkzWQYVlKElM7O3_VJgXB5FCQ.tUgwM5qL7FB6CzsRu1KU0A.DQhuBJkKRkfBzaeW7aaMPKFRjnkSwnwpLNylmm1mxwyU6lDpSePHIOcRGJ54Uyuqe5i8EC0nZGS0GOS37gHElCBuRK975AqsgbgIgyxPYVkZYgnHi965Y_KdwNH9vLCJf0w-RFuWOmZszMIlNe2123j7Z3hh_eGxNPAOsaC6SQtg7nJe-4NUbEWSaq3tEnNpnUb-aJxe-TSVoWYlAVkEtbjZgpp9p6ryOkJteHq8gOLz914Ue7xKaR0CjZWlF3aI7tDFTx9XmjmtG0e5QFRXS2p5hL1DtGPZgp7EpP4tBc-3prjacRBZNI01Mjyx4AD9Q8jnheg_ebtaFxBnElKhL-AM4h9vg1liXvNQ-PjYPIeTsrYSKov6meTSx7mlMb0q.d_pQJmBrQhGxT50bXtdAYA"; _pk_cvar.test-123.ac81=%7B%221%22%3A%5B%22userId%22%2C%221061%22%5D%2C%222%22%3A%5B%22source%22%2C%22cpc%22%5D%7D; _pk_ses.test-123.ac81=*; _pk_id.test-123.ac81=e84d8e01-06ba-474d-872a-b7bc99cc3fcd.1540968266.2.1541150772.1540968281.',
            'UC-CSRF-TOKEN': '852d2f8fabc618ad95bf5396cd6b93d5',
            'Transfer-Encoding': 'chunked'
        }
    }, {
        url:'/index/getstarlist',
        proxy: 'https://www.imooc.com',
        method: 'GET',
        headers: {
            'Cookie': '_pk_id.2804852a3abc.ac81=cd8e392b-3702-469d-9b38-42b13dd1f6f4.1534147992.2.1534418441.1534148143.; cna=eSr4E356dFYCAWoLKdVGypbn; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.fnFbwGJjk4nFxjGfqUoWs6qSskRO-TkzWQYVlKElM7O3_VJgXB5FCQ.tUgwM5qL7FB6CzsRu1KU0A.DQhuBJkKRkfBzaeW7aaMPKFRjnkSwnwpLNylmm1mxwyU6lDpSePHIOcRGJ54Uyuqe5i8EC0nZGS0GOS37gHElCBuRK975AqsgbgIgyxPYVkZYgnHi965Y_KdwNH9vLCJf0w-RFuWOmZszMIlNe2123j7Z3hh_eGxNPAOsaC6SQtg7nJe-4NUbEWSaq3tEnNpnUb-aJxe-TSVoWYlAVkEtbjZgpp9p6ryOkJteHq8gOLz914Ue7xKaR0CjZWlF3aI7tDFTx9XmjmtG0e5QFRXS2p5hL1DtGPZgp7EpP4tBc-3prjacRBZNI01Mjyx4AD9Q8jnheg_ebtaFxBnElKhL-AM4h9vg1liXvNQ-PjYPIeTsrYSKov6meTSx7mlMb0q.d_pQJmBrQhGxT50bXtdAYA; UC-CSRF-TOKEN=852d2f8fabc618ad95bf5396cd6b93d5; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.fnFbwGJjk4nFxjGfqUoWs6qSskRO-TkzWQYVlKElM7O3_VJgXB5FCQ.tUgwM5qL7FB6CzsRu1KU0A.DQhuBJkKRkfBzaeW7aaMPKFRjnkSwnwpLNylmm1mxwyU6lDpSePHIOcRGJ54Uyuqe5i8EC0nZGS0GOS37gHElCBuRK975AqsgbgIgyxPYVkZYgnHi965Y_KdwNH9vLCJf0w-RFuWOmZszMIlNe2123j7Z3hh_eGxNPAOsaC6SQtg7nJe-4NUbEWSaq3tEnNpnUb-aJxe-TSVoWYlAVkEtbjZgpp9p6ryOkJteHq8gOLz914Ue7xKaR0CjZWlF3aI7tDFTx9XmjmtG0e5QFRXS2p5hL1DtGPZgp7EpP4tBc-3prjacRBZNI01Mjyx4AD9Q8jnheg_ebtaFxBnElKhL-AM4h9vg1liXvNQ-PjYPIeTsrYSKov6meTSx7mlMb0q.d_pQJmBrQhGxT50bXtdAYA"; _pk_cvar.test-123.ac81=%7B%221%22%3A%5B%22userId%22%2C%221061%22%5D%2C%222%22%3A%5B%22source%22%2C%22cpc%22%5D%7D; _pk_ses.test-123.ac81=*; _pk_id.test-123.ac81=e84d8e01-06ba-474d-872a-b7bc99cc3fcd.1540968266.2.1541150772.1540968281.'
        }
    }, {
        url:'/yingxiao/*',
        proxy: 'https://ad-test1.sm.cn'
    }],
    state: {
        dirpath: './example',
        proxy: 'https://crm.uc.cn',
        proxymethod: 1,
        username:'cxh',
        password:'123456',
        isLogin: true,
        debugger: false,
        Cookie: 'cna=eSr4E356dFYCAWoLKdVGypbn; unify_code=40b72ca4-5dfe-4f4c-802e-89f3dd6d723d; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.DUHUdNZiZFKec_9sTIPloDb3ud_7_iwV5aFklUVBLSpA57QyxtefTQ.Su9c7Q-d9s_M3LvQn_DY-Q.6Zb4066dNmfJnHaIl7UwM-pP3vKyo18FzPkMJptY6MXhA1Db6YtJ6Hyzpm2SlovzSkDn9dmkuBcpMHFR3PtW1lAqmjIO35ttFhVABi76FL8_MVfVBLS2FOHQlGsfvkqZzp86LKs22gkuJZ_WbmEM2fwHKhdInqqCHFXwu1hZi7jlEUTMsHaCNffqvN4kHphe_pTKamvW6_2qzO-hcyH0jsJS1FnT_Eze3M71FfTVRPb-AvRN3bDL1wPYiNmOj8PzSTOuGfHNJO0-RmzCSFFXuENxLnFR-TA3LCtpu6NYdwdDXiW4oSib-y7koWSkaj5g79cbT3POCSGtV9Bi5f99jV5wFSj7Eux0k7yhyCZ0JW-UxJqeuK16tbrhL_2jY_RbxYoetdd2rC95L-j1mWEahw.kR6sJSWGyMrxGsR6LC-tyA"; UC-CSRF-TOKEN=e45ccc7f3d0552d9fd6ba846304f0ead; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.DUHUdNZiZFKec_9sTIPloDb3ud_7_iwV5aFklUVBLSpA57QyxtefTQ.Su9c7Q-d9s_M3LvQn_DY-Q.6Zb4066dNmfJnHaIl7UwM-pP3vKyo18FzPkMJptY6MXhA1Db6YtJ6Hyzpm2SlovzSkDn9dmkuBcpMHFR3PtW1lAqmjIO35ttFhVABi76FL8_MVfVBLS2FOHQlGsfvkqZzp86LKs22gkuJZ_WbmEM2fwHKhdInqqCHFXwu1hZi7jlEUTMsHaCNffqvN4kHphe_pTKamvW6_2qzO-hcyH0jsJS1FnT_Eze3M71FfTVRPb-AvRN3bDL1wPYiNmOj8PzSTOuGfHNJO0-RmzCSFFXuENxLnFR-TA3LCtpu6NYdwdDXiW4oSib-y7koWSkaj5g79cbT3POCSGtV9Bi5f99jV5wFSj7Eux0k7yhyCZ0JW-UxJqeuK16tbrhL_2jY_RbxYoetdd2rC95L-j1mWEahw.kR6sJSWGyMrxGsR6LC-tyA',
        interceptors: function(state) {
            if(!state.isLogin) {
                return {
                    status: 101,
                    msg: '没有登录'
                }
            } else {
                return false
            }
        },
        plugin: {
            "getName": function(name) {
                return name
            }
        },
        writeFile: ['channelId']
    }
}