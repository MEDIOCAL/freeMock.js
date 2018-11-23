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
        url:'/mc-web/*',
        proxy: 'https://ad-test1.sm.cn',
        headers: {
            'Cookie': '_pk_id.2804852a3abc.ac81=cd8e392b-3702-469d-9b38-42b13dd1f6f4.1534147992.2.1534418441.1534148143.; cna=eSr4E356dFYCAWoLKdVGypbn; isg=BNHRDlGNbhVymYIBDi6sYYT74Nt1c1-RfrzC1LNmghi3WvCs-4llgOnz-G4Z0t3o; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.L_KE_NZ2lH4kJ5JHet67Jyqe28_Z1sxgdt7lBOvbw4XVNkhO-cfLOg.NOv8_MgFbwUdwNy_kTtIsQ.OMTEWq_5etQdkr4B_6SgkG-eN10i3n0wrdFEkkCiMJna0uq2SmKbzy_9ihwEid0D_1fWJ9Wh5rowsz2D2sQQ0y12K-QF56T44d-V3M7Z-ZyZqV17Zso1-SEg3BlamNr6L--tGkopMF0R3WhPcP3RxGSg6NLZVUg6qGbqsfF-L5RL1nEjzQG7rkOrJH9-1qUOq4j5Mvrv99ayAVUPL422q-e_NFM7NoPTI6yfT7V8sAPqeb5tsYmnWHHJt1NQdDMlIcnAJD_Ib6wWXS1f7kD35Dcmaax-ZH3FRessYSSpHZP6em0aqSlM50DpntAC_rSynlrhFFQQXgiwvlFtYXxqSInSvYuUL5o29URbtVAtm4HMhepWDn9ZMmFluN4FM0nB.-YS_bcrnHv7gqM6xrYY_Pg"; UC-CSRF-TOKEN=565527629ac59555236d66c09c47bf96; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.L_KE_NZ2lH4kJ5JHet67Jyqe28_Z1sxgdt7lBOvbw4XVNkhO-cfLOg.NOv8_MgFbwUdwNy_kTtIsQ.OMTEWq_5etQdkr4B_6SgkG-eN10i3n0wrdFEkkCiMJna0uq2SmKbzy_9ihwEid0D_1fWJ9Wh5rowsz2D2sQQ0y12K-QF56T44d-V3M7Z-ZyZqV17Zso1-SEg3BlamNr6L--tGkopMF0R3WhPcP3RxGSg6NLZVUg6qGbqsfF-L5RL1nEjzQG7rkOrJH9-1qUOq4j5Mvrv99ayAVUPL422q-e_NFM7NoPTI6yfT7V8sAPqeb5tsYmnWHHJt1NQdDMlIcnAJD_Ib6wWXS1f7kD35Dcmaax-ZH3FRessYSSpHZP6em0aqSlM50DpntAC_rSynlrhFFQQXgiwvlFtYXxqSInSvYuUL5o29URbtVAtm4HMhepWDn9ZMmFluN4FM0nB.-YS_bcrnHv7gqM6xrYY_Pg; _pk_cvar.test-123.ac81=%7B%221%22%3A%5B%22userId%22%2C%221061%22%5D%2C%222%22%3A%5B%22source%22%2C%22cpc%22%5D%7D; _pk_ses.test-123.ac81=*; _pk_id.test-123.ac81=ea502154-23a7-4f2b-853a-b64d0c1afe85.1542707506.8.1542965041.1542961560.',
            'UC-CSRF-TOKEN': '565527629ac59555236d66c09c47bf96'
        }
    }, {
        url:'/wolongweb/*',
        proxy: 'https://ad-test1.sm.cn',
        headers: {
            'Cookie': '_pk_id.2804852a3abc.ac81=cd8e392b-3702-469d-9b38-42b13dd1f6f4.1534147992.2.1534418441.1534148143.; cna=eSr4E356dFYCAWoLKdVGypbn; isg=BNHRDlGNbhVymYIBDi6sYYT74Nt1c1-RfrzC1LNmghi3WvCs-4llgOnz-G4Z0t3o; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.L_KE_NZ2lH4kJ5JHet67Jyqe28_Z1sxgdt7lBOvbw4XVNkhO-cfLOg.NOv8_MgFbwUdwNy_kTtIsQ.OMTEWq_5etQdkr4B_6SgkG-eN10i3n0wrdFEkkCiMJna0uq2SmKbzy_9ihwEid0D_1fWJ9Wh5rowsz2D2sQQ0y12K-QF56T44d-V3M7Z-ZyZqV17Zso1-SEg3BlamNr6L--tGkopMF0R3WhPcP3RxGSg6NLZVUg6qGbqsfF-L5RL1nEjzQG7rkOrJH9-1qUOq4j5Mvrv99ayAVUPL422q-e_NFM7NoPTI6yfT7V8sAPqeb5tsYmnWHHJt1NQdDMlIcnAJD_Ib6wWXS1f7kD35Dcmaax-ZH3FRessYSSpHZP6em0aqSlM50DpntAC_rSynlrhFFQQXgiwvlFtYXxqSInSvYuUL5o29URbtVAtm4HMhepWDn9ZMmFluN4FM0nB.-YS_bcrnHv7gqM6xrYY_Pg"; UC-CSRF-TOKEN=565527629ac59555236d66c09c47bf96; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.L_KE_NZ2lH4kJ5JHet67Jyqe28_Z1sxgdt7lBOvbw4XVNkhO-cfLOg.NOv8_MgFbwUdwNy_kTtIsQ.OMTEWq_5etQdkr4B_6SgkG-eN10i3n0wrdFEkkCiMJna0uq2SmKbzy_9ihwEid0D_1fWJ9Wh5rowsz2D2sQQ0y12K-QF56T44d-V3M7Z-ZyZqV17Zso1-SEg3BlamNr6L--tGkopMF0R3WhPcP3RxGSg6NLZVUg6qGbqsfF-L5RL1nEjzQG7rkOrJH9-1qUOq4j5Mvrv99ayAVUPL422q-e_NFM7NoPTI6yfT7V8sAPqeb5tsYmnWHHJt1NQdDMlIcnAJD_Ib6wWXS1f7kD35Dcmaax-ZH3FRessYSSpHZP6em0aqSlM50DpntAC_rSynlrhFFQQXgiwvlFtYXxqSInSvYuUL5o29URbtVAtm4HMhepWDn9ZMmFluN4FM0nB.-YS_bcrnHv7gqM6xrYY_Pg; _pk_cvar.test-123.ac81=%7B%221%22%3A%5B%22userId%22%2C%221061%22%5D%2C%222%22%3A%5B%22source%22%2C%22cpc%22%5D%7D; _pk_ses.test-123.ac81=*; _pk_id.test-123.ac81=ea502154-23a7-4f2b-853a-b64d0c1afe85.1542707506.8.1542965041.1542961560.',
            'UC-CSRF-TOKEN': '565527629ac59555236d66c09c47bf96'
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
        proxymethod: 0,
        username:'cxh',
        password:'123456',
        isLogin: true,
        debugger: false,
        Cookie: 'cna=eSr4E356dFYCAWoLKdVGypbn; isg=BNHRDlGNbhVymYIBDi6sYYT74Nt1c1-RfrzC1LNmghi3WvCs-4llgOnz-G4Z0t3o; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.QuFh7sYXrFCoOKO4gM9bHFwp7gxmE6_N0JICHwUagcoHSlLJnMYzjw.8m7fsF_8rFFdrteYGawwjQ.e4jgKjvW9HncD1mT5oC8PPwRxVenlgIVMUtpXmoFVwMmawhXOLFbE6Obbpzb3R5zHwpIsf3Qo1aWZ6Hcq_dJgea5rDvJZ4nTJY-E_7F6vGbzTYSn5sbpkw53w4JRwdmpW4eH593z74FMTXxl-kwPse6rkRP9l2Qbj5yC8TQ9b3ItbqI-HajMQctyKuEn3dDlMg2g4uU9Xb5kpHs3lDAI-UwhkcyHwZZjQnNFQe6k05L0UTDtbwuFOW2V3pIKZtKWYVxLYWpE6V1ASI1b5PdaLBxdgYE4YykNxQkp42hkODWSB0Y1lAaoCfwqPjYP7FYLq-AnePoY7VtTafEuCbWL7pvnvyRBpEi_W3FpZ4oYpZUyR19kxFuhyVhHA-sHmPLwjp_g8-Evy9QsEeI84cdXUQ.gKJbC3eNlLa4J4ZtA1HDeQ"; UC-CSRF-TOKEN=e37d83b4e29f9f01195bea7c80c8c5aa; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.QuFh7sYXrFCoOKO4gM9bHFwp7gxmE6_N0JICHwUagcoHSlLJnMYzjw.8m7fsF_8rFFdrteYGawwjQ.e4jgKjvW9HncD1mT5oC8PPwRxVenlgIVMUtpXmoFVwMmawhXOLFbE6Obbpzb3R5zHwpIsf3Qo1aWZ6Hcq_dJgea5rDvJZ4nTJY-E_7F6vGbzTYSn5sbpkw53w4JRwdmpW4eH593z74FMTXxl-kwPse6rkRP9l2Qbj5yC8TQ9b3ItbqI-HajMQctyKuEn3dDlMg2g4uU9Xb5kpHs3lDAI-UwhkcyHwZZjQnNFQe6k05L0UTDtbwuFOW2V3pIKZtKWYVxLYWpE6V1ASI1b5PdaLBxdgYE4YykNxQkp42hkODWSB0Y1lAaoCfwqPjYP7FYLq-AnePoY7VtTafEuCbWL7pvnvyRBpEi_W3FpZ4oYpZUyR19kxFuhyVhHA-sHmPLwjp_g8-Evy9QsEeI84cdXUQ.gKJbC3eNlLa4J4ZtA1HDeQ',
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
        writeFile: {
            '/yingxiao/web/article/list': ["channelId"]
        },
        readFile: ['channelId'],
        headers: {
            "UC-CSRF-TOKEN": "e37d83b4e29f9f01195bea7c80c8c5aa"
        }
    }
}