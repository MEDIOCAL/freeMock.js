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
        proxy: true,
        getMockData() {
            return true
        }
    }, {
        url: '/wolong',
        method: 'GET',
        data: {
            name: "123",
            template: "456"
        }
    }, {
        url:'/api/post.php',
        proxy: 'http://192.168.1.7:8080'
    }, {
        url:'/mc-web/*',
        proxy: 'https://ad-test1.sm.cn',
        headers: {
            'Cookie': '_pk_id.2804852a3abc.ac81=cd8e392b-3702-469d-9b38-42b13dd1f6f4.1534147992.2.1534418441.1534148143.; cna=eSr4E356dFYCAWoLKdVGypbn; UC-CSRF-TOKEN=557e044f14187bc4215e02d0a2a92bb3; isg=BOnpw0heluAAf6pZ1rZEqdzz-JODHtzv1qQqbIveJ1APUghk0wOMuEFLEbZBE3Ug; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.X4o06ApoIiEWabiqLIAq7T1UCnv0e_jZyaUUtKihtG4KZjSCUadZSQ.mnCv-qqlh4n1isegRx9xcg.Nz6-nqnFDIioSKqr7W4Cq946Fatmo1nkbS-Wz5Er1ajhr2ExFK_mir5gUxNybfC-AFe2TNyV37OyA7T0HE3nx-e9XTHeNdNdFvaJWo7UC9IW_dhV3pZKIZycX4Qh_bJz4DfgFhgSqyAamcYEd5ML0RUubK3TesPqQT9tRFSEckjNuchue1tufQtLN_grEVEao-lKrhQgfLy-dvELgUzFM6trzCOjtauUVce8w86JoQ1Rgq3uWOQ-RxInSr5nZ1-edog4OKlJ4eYQbgX3CrFa7M-ol1TFugv2H6Z6u4jT44NurcfpxoNaUzxD4c2VN4KZwBLdGBQjNGXL9UOOw9KNQb-BR0bbi5DfPngqN1r94v16aR_6u8Pf1lILjXwUZAZR.ppvwVOT5Z4-_jkm1rqZMVA; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.X4o06ApoIiEWabiqLIAq7T1UCnv0e_jZyaUUtKihtG4KZjSCUadZSQ.mnCv-qqlh4n1isegRx9xcg.Nz6-nqnFDIioSKqr7W4Cq946Fatmo1nkbS-Wz5Er1ajhr2ExFK_mir5gUxNybfC-AFe2TNyV37OyA7T0HE3nx-e9XTHeNdNdFvaJWo7UC9IW_dhV3pZKIZycX4Qh_bJz4DfgFhgSqyAamcYEd5ML0RUubK3TesPqQT9tRFSEckjNuchue1tufQtLN_grEVEao-lKrhQgfLy-dvELgUzFM6trzCOjtauUVce8w86JoQ1Rgq3uWOQ-RxInSr5nZ1-edog4OKlJ4eYQbgX3CrFa7M-ol1TFugv2H6Z6u4jT44NurcfpxoNaUzxD4c2VN4KZwBLdGBQjNGXL9UOOw9KNQb-BR0bbi5DfPngqN1r94v16aR_6u8Pf1lILjXwUZAZR.ppvwVOT5Z4-_jkm1rqZMVA"; _pk_cvar.test-123.ac81=%7B%221%22%3A%5B%22userId%22%2C%221061%22%5D%2C%222%22%3A%5B%22source%22%2C%22cpc%22%5D%7D; _pk_ses.test-123.ac81=*; _pk_id.test-123.ac81=ea502154-23a7-4f2b-853a-b64d0c1afe85.1542707506.11.1543129742.1543026806.',
            'UC-CSRF-TOKEN': '565527629ac59555236d66c09c47bf96'
        }
    }, {
        url:'/wolongweb/*',
        proxy: 'https://ad-test1.sm.cn',
        headers: {
            'Cookie': '_pk_id.2804852a3abc.ac81=cd8e392b-3702-469d-9b38-42b13dd1f6f4.1534147992.2.1534418441.1534148143.; cna=eSr4E356dFYCAWoLKdVGypbn; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0._eyDXP-bcq6uTcKOb7CEmB5tDbVbcOUPmNFR3SlCcd2Vsc8vhtBi3Q.VEnBztZ3erv48547pzH4Tg.BAnfbOPowchRy7_S1Hy5vsNJdBIcqlej3PABCV3NOuTqV4gJRTHu8U518O4CtBzgk82aH_65CDjHlxNvyhR2lYkzcLbqqmL7Fg3XdkPjQPF7KjO5YEUfsqME8V1kyLw9Usq9MpJl6oGNonOFVdE3yRnrUnrv420brGvFDkeqz_MFawuqIVHPGraVDHCrOMO3MK6RABWVPf9V67poAAimeU1-v_oLUXwkOWbS53IuHYYprAAxnhKdrMVUUdULYx1pezPY8IGZqgDQ5c3YlA6gNkuRt1rjHcElX-uvoOx65veoS6wuL6B4RpBr8L7MbeKTHVGniVUHx0EPlUmufzII1nAUa9xEMg5wTqHnVSkL9iV7DyahqjTtp2F76FQPBThA.qJqzQqqiOKHwcV5qfrQ08w"; UC-CSRF-TOKEN=b8e198e5698f36f1058d1c00432053f8; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0._eyDXP-bcq6uTcKOb7CEmB5tDbVbcOUPmNFR3SlCcd2Vsc8vhtBi3Q.VEnBztZ3erv48547pzH4Tg.BAnfbOPowchRy7_S1Hy5vsNJdBIcqlej3PABCV3NOuTqV4gJRTHu8U518O4CtBzgk82aH_65CDjHlxNvyhR2lYkzcLbqqmL7Fg3XdkPjQPF7KjO5YEUfsqME8V1kyLw9Usq9MpJl6oGNonOFVdE3yRnrUnrv420brGvFDkeqz_MFawuqIVHPGraVDHCrOMO3MK6RABWVPf9V67poAAimeU1-v_oLUXwkOWbS53IuHYYprAAxnhKdrMVUUdULYx1pezPY8IGZqgDQ5c3YlA6gNkuRt1rjHcElX-uvoOx65veoS6wuL6B4RpBr8L7MbeKTHVGniVUHx0EPlUmufzII1nAUa9xEMg5wTqHnVSkL9iV7DyahqjTtp2F76FQPBThA.qJqzQqqiOKHwcV5qfrQ08w; _pk_cvar.test-123.ac81=%7B%221%22%3A%5B%22userId%22%2C%221061%22%5D%2C%222%22%3A%5B%22source%22%2C%22cpc%22%5D%2C%223%22%3A%5B%22operatorId%22%2C%22-%22%5D%2C%224%22%3A%5B%22userRoles%22%2C%22-%22%5D%2C%225%22%3A%5B%22operatorRoles%22%2C%22-%22%5D%2C%226%22%3A%5B%22operatorName%22%2C%22-%22%5D%7D; _pk_ses.test-123.ac81=*; _pk_id.test-123.ac81=56e3e648-437b-4936-af0f-822bf64189a0.1544689485.1.1544689487.1544689485.',
            'UC-CSRF-TOKEN': 'b8e198e5698f36f1058d1c00432053f8'
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
    },{
        url:'/ncrm/*',
        proxy: 'https://imp-daily.uc.test',
    }],
    state: {
        dirpath: ['./example', [0, 1]],
        proxy: 'https://crm.uc.cn',
        proxymethod: 0,
        username:'cxh',
        password:'123456',
        isLogin: true,
        debugger: true,
        Cookie: 'cna=22eSr4E356dFYCAWoLKdVGypbn; isg=BNHRDlGNbhVymYIBDi6sYYT74Nt1c1-RfrzC1LNmghi3WvCs-4llgOnz-G4Z0t3o; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.QuFh7sYXrFCoOKO4gM9bHFwp7gxmE6_N0JICHwUagcoHSlLJnMYzjw.8m7fsF_8rFFdrteYGawwjQ.e4jgKjvW9HncD1mT5oC8PPwRxVenlgIVMUtpXmoFVwMmawhXOLFbE6Obbpzb3R5zHwpIsf3Qo1aWZ6Hcq_dJgea5rDvJZ4nTJY-E_7F6vGbzTYSn5sbpkw53w4JRwdmpW4eH593z74FMTXxl-kwPse6rkRP9l2Qbj5yC8TQ9b3ItbqI-HajMQctyKuEn3dDlMg2g4uU9Xb5kpHs3lDAI-UwhkcyHwZZjQnNFQe6k05L0UTDtbwuFOW2V3pIKZtKWYVxLYWpE6V1ASI1b5PdaLBxdgYE4YykNxQkp42hkODWSB0Y1lAaoCfwqPjYP7FYLq-AnePoY7VtTafEuCbWL7pvnvyRBpEi_W3FpZ4oYpZUyR19kxFuhyVhHA-sHmPLwjp_g8-Evy9QsEeI84cdXUQ.gKJbC3eNlLa4J4ZtA1HDeQ"; UC-CSRF-TOKEN=e37d83b4e29f9f01195bea7c80c8c5aa; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.QuFh7sYXrFCoOKO4gM9bHFwp7gxmE6_N0JICHwUagcoHSlLJnMYzjw.8m7fsF_8rFFdrteYGawwjQ.e4jgKjvW9HncD1mT5oC8PPwRxVenlgIVMUtpXmoFVwMmawhXOLFbE6Obbpzb3R5zHwpIsf3Qo1aWZ6Hcq_dJgea5rDvJZ4nTJY-E_7F6vGbzTYSn5sbpkw53w4JRwdmpW4eH593z74FMTXxl-kwPse6rkRP9l2Qbj5yC8TQ9b3ItbqI-HajMQctyKuEn3dDlMg2g4uU9Xb5kpHs3lDAI-UwhkcyHwZZjQnNFQe6k05L0UTDtbwuFOW2V3pIKZtKWYVxLYWpE6V1ASI1b5PdaLBxdgYE4YykNxQkp42hkODWSB0Y1lAaoCfwqPjYP7FYLq-AnePoY7VtTafEuCbWL7pvnvyRBpEi_W3FpZ4oYpZUyR19kxFuhyVhHA-sHmPLwjp_g8-Evy9QsEeI84cdXUQ.gKJbC3eNlLa4J4ZtA1HDeQ223',
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
        // writeFile: {
        //     '/yingxiao/web/article/list': ["channelId"]
        // },
        readFile: ['channelId'],
        headers: {
            "UC-CSRF-TOKEN": "e37d83b4e29f9f01195bea7c80c8c5aa"
        },
        swagger: 'imp-daily.uc.test/ncrm/v2/api-docs',
        pureProxy: false,
        swaggerManualProps: {
            pageSize: 20,
            pageNo: req => req.query.pageNo,
            businessTypes: () => {
                return '2'
            }
        }
    }
}