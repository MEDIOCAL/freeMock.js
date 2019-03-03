module.exports = {
    mockData: [{
        url: '/test',
        data: {
            people: {
                name: "@name()",
                age: "@integer(@param.fixed, @param.fixed+10)",
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
        "data|2": [{
            name: "@name()",
            "list|@param.size": [{
                title:"@title()",
                time: "@time()",
                height: "@integer(2, 10)",
                pageNo: "@param.pageNo",
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
            }]
        }]
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
                    age: "@integer(1, 100)"
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
        proxy: 'http://ad-test1.sm.cn',
        headers: {
            'Cookie': '_pk_id.2804852a3abc.ac81=cd8e392b-3702-469d-9b38-42b13dd1f6f4.1534147992.2.1534418441.1534148143.; cna=eSr4E356dFYCAWoLKdVGypbn; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.dvPXpX4XLkdk_ycdWYn6NRIkeyG48rOFV4sZq-GqtLfNnN2SbIkRpw.6XiD4SbWQNfrZYGj1TJz9w.WHGJkZKiJJoAURiP_Pz7EYxnS5AZ26LDDbvCTU4e1GqYwIb0mtxJ_T4jEbOGfOFBRHUuknvVvbH29iwAvJqtQtkO1D7AKX59W7AFdu98x6XtAvFqwQlRCz8VQ-CQTPKOUmFMf6XL5UBT1Wbc_Z1Keqy6ZTzJUDVrIvszi4jQgt5H65ps-kO0Vosl-aL5iQSYiX8jgL2K8V-mbA8Sucm3m6LxhzxdUlLqLImn_cbAABg7PgFzYsElvez5Ae3WwmPPXua2PLiJdXSZWVdjZCAkF1rwZsx7CpmzP7en07M_z3Eyl5OFMDPk8bEFLAkph_CzTHxWy_CTkmAbIRPuJi6KnlS70CX1D54B0F69ZwgBDL1yb_jBehyWJ5ludyfilIDa.bV9n5y5Xvj52Q6dA1F_EVQ"; UC-CSRF-TOKEN=d8185d628346261935969fea29e4a153; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.dvPXpX4XLkdk_ycdWYn6NRIkeyG48rOFV4sZq-GqtLfNnN2SbIkRpw.6XiD4SbWQNfrZYGj1TJz9w.WHGJkZKiJJoAURiP_Pz7EYxnS5AZ26LDDbvCTU4e1GqYwIb0mtxJ_T4jEbOGfOFBRHUuknvVvbH29iwAvJqtQtkO1D7AKX59W7AFdu98x6XtAvFqwQlRCz8VQ-CQTPKOUmFMf6XL5UBT1Wbc_Z1Keqy6ZTzJUDVrIvszi4jQgt5H65ps-kO0Vosl-aL5iQSYiX8jgL2K8V-mbA8Sucm3m6LxhzxdUlLqLImn_cbAABg7PgFzYsElvez5Ae3WwmPPXua2PLiJdXSZWVdjZCAkF1rwZsx7CpmzP7en07M_z3Eyl5OFMDPk8bEFLAkph_CzTHxWy_CTkmAbIRPuJi6KnlS70CX1D54B0F69ZwgBDL1yb_jBehyWJ5ludyfilIDa.bV9n5y5Xvj52Q6dA1F_EVQ; _pk_cvar.test-123.ac81=%7B%221%22%3A%5B%22userId%22%2C%221061%22%5D%2C%222%22%3A%5B%22source%22%2C%22cpc%22%5D%2C%223%22%3A%5B%22operatorId%22%2C%221061%22%5D%2C%224%22%3A%5B%22userRoles%22%2C%22account_management_service%2Creport_service%2Csuper_token%2Cinternal_api%2CAPI2%2CROLE_TUIGUANG_CHILD%2CROLE_ABSTRACT_TUIGUANG%2CROLE_TUIGUANG_VIP%22%5D%2C%225%22%3A%5B%22operateRoles%22%2C%22account_management_service%2Creport_service%2Csuper_token%2Cinternal_api%2CAPI2%2CROLE_TUIGUANG_CHILD%2CROLE_ABSTRACT_TUIGUANG%2CROLE_TUIGUANG_VIP%22%5D%2C%226%22%3A%5B%22operatorName%22%2C%22%E6%90%BA%E7%A8%8B%E6%97%85%E8%A1%8C%E7%BD%91%22%5D%7D; _pk_ses.test-123.ac81=*; _pk_id.test-123.ac81=d4cc0da8-26ea-4bda-91fe-a2ef8810086d.1551576590.1.1551576605.1551576590.',
            'UC-CSRF-TOKEN': 'b8e198e5698f36f1058d1c00432053f8'
        }
    }, {
        url:'/article/recommenduser',
        proxy: 'http://www.imooc.com',
        method: 'GET',
        headers: {
            'Cookie': 'imooc_uuid=cfb047b6-3005-46d2-9192-14b32bff59a1; imooc_isnew=1; imooc_isnew_ct=1551569327; zg_did=%7B%22did%22%3A%20%2216940bd1b5557f-0168fcd9749402-36607103-13c680-16940bd1b56223%22%7D; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1551569329; loginstate=1; apsid=JiNzQ4ZmViNzdjMTU0ZTU5ZWJmMmM2NTE1YTRmYjUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDA5MjU4MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA0ODY4MjYwNzkxN2RlMDZhMDFiYTAzNGY3ZTM2MTFmwhF7XMIRe1w%3DZD; IMCDNS=0; zg_f375fe2f71e542a4b890d9a620f9fb32=%7B%22sid%22%3A%201551569328988%2C%22updated%22%3A%201551569366949%2C%22info%22%3A%201551569328992%2C%22superProperty%22%3A%20%22%7B%5C%22%E5%BA%94%E7%94%A8%E5%90%8D%E7%A7%B0%5C%22%3A%20%5C%22%E6%85%95%E8%AF%BE%E7%BD%91%E6%95%B0%E6%8D%AE%E7%BB%9F%E8%AE%A1%5C%22%2C%5C%22Platform%5C%22%3A%20%5C%22web%5C%22%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.imooc.com%22%2C%22cuid%22%3A%20%22rLkIl7Weebc%2C%22%7D; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1551569367; cvde=5c7b11af88df4-11'
        }
    }, {
        url:'/yingxiao/*',
        proxy: 'http://crm-test1.sm.cn',
        headers: {
            Cookie: 'cna=eSr4E356dFYCAWoLKdVGypbn; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.o6E8Hv54QVof38MrevF1Rbzr5pBHJWxtzoRpbSMT9CWi0ILGXYD7AA.6fgQNTG8IqlL4ioaEUSurA.ihSWLToZSmYkd9bUXP3ex5COlTyakqfXzf7rdRbn5tbXuEWdeFA3kDAKGTc6V7E_F1_qYc7sqOu54O7_LF83EBzN97F1Dred1F_rrssZzzeztwUsvmp2A3JdieRqZgMiVawMiJILWTeKrJFbTw0X1dir0aFLkMS6yt74PPrNy2Z44FnqKk35xOGPpFf-Ta6BuI6Z0vgFj0HCtKwYZJebuxcffBIeOI0tSZmpKdlR5HCAEWE2uDm6FV2rciz5o0HxYwUEAFHkmQgIGBvL23MDe33bpteHEdu8tC8L7zVn0iz8j_s8faLWzqo8AdRG5y485uWHgVs-2mZB7ZWg3Ncrn7RzbbkEPtpgKcgt595RtoFh_eckPGu67dFuijjfZKOn0RY-Ckw5WYwFencR47k5Ow.p0WZFmOUmVc5O6PILRtClA; UC-CSRF-TOKEN=bf776a94718706482fab7e92507134a2; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.o6E8Hv54QVof38MrevF1Rbzr5pBHJWxtzoRpbSMT9CWi0ILGXYD7AA.6fgQNTG8IqlL4ioaEUSurA.ihSWLToZSmYkd9bUXP3ex5COlTyakqfXzf7rdRbn5tbXuEWdeFA3kDAKGTc6V7E_F1_qYc7sqOu54O7_LF83EBzN97F1Dred1F_rrssZzzeztwUsvmp2A3JdieRqZgMiVawMiJILWTeKrJFbTw0X1dir0aFLkMS6yt74PPrNy2Z44FnqKk35xOGPpFf-Ta6BuI6Z0vgFj0HCtKwYZJebuxcffBIeOI0tSZmpKdlR5HCAEWE2uDm6FV2rciz5o0HxYwUEAFHkmQgIGBvL23MDe33bpteHEdu8tC8L7zVn0iz8j_s8faLWzqo8AdRG5y485uWHgVs-2mZB7ZWg3Ncrn7RzbbkEPtpgKcgt595RtoFh_eckPGu67dFuijjfZKOn0RY-Ckw5WYwFencR47k5Ow.p0WZFmOUmVc5O6PILRtClA"'
        }
    }, {
        url:'/ncrm/*',
        proxy: 'http://imp-daily.uc.test',
        headers: {
            Cookie: 'SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.MkMuO8afKzBvrdh0OI0WelYq9fGt5j9Hgs1X2_eU6M76hnRtOXIqqw.xBM-8Mw_tmcRo_ZofpdprA.QtyU3XkDXSId4yB3FRkcl4jTEte2SaVl5-Ct588PCg4WdD0qwPeuGEGs3CXOmu4ZdGv1Uy3GrjGRV5g13JmoQuMd4ccf75GewQZy9YoVKunPQKR-JQiUQmlaEN9ZwBKF82ucowKhz603sWHzROaKCjI9ndFfe79EWReyaiRLZj_8oWUSokBb_zTfoo-USsmrHLc25Cq2aE6It7GGpzXyoVEsCulQMfvrMDOR9V2x-dQPPc4BR8v93SESmhIH9iGLrxOPUAOBCvqFMnl0m69vaQ0QirpDxPB_aUK8Cm1aAcaU2AVRpc2x9Kt3bowneA0n406wQHoZczMbmtnV1Gtt9xPvOt3mc0YJMvrVS8CALERL37XYiM3W9f0u6h3l9zIWHFxUIbYLyULPjfF4lqS2Qw.y2vLKYMkL4xpVjgogB5pwA"; UC-CSRF-TOKEN=e294dc8754c9d34cd7845c9f488dbb72; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.MkMuO8afKzBvrdh0OI0WelYq9fGt5j9Hgs1X2_eU6M76hnRtOXIqqw.xBM-8Mw_tmcRo_ZofpdprA.QtyU3XkDXSId4yB3FRkcl4jTEte2SaVl5-Ct588PCg4WdD0qwPeuGEGs3CXOmu4ZdGv1Uy3GrjGRV5g13JmoQuMd4ccf75GewQZy9YoVKunPQKR-JQiUQmlaEN9ZwBKF82ucowKhz603sWHzROaKCjI9ndFfe79EWReyaiRLZj_8oWUSokBb_zTfoo-USsmrHLc25Cq2aE6It7GGpzXyoVEsCulQMfvrMDOR9V2x-dQPPc4BR8v93SESmhIH9iGLrxOPUAOBCvqFMnl0m69vaQ0QirpDxPB_aUK8Cm1aAcaU2AVRpc2x9Kt3bowneA0n406wQHoZczMbmtnV1Gtt9xPvOt3mc0YJMvrVS8CALERL37XYiM3W9f0u6h3l9zIWHFxUIbYLyULPjfF4lqS2Qw.y2vLKYMkL4xpVjgogB5pwA'
        },
    }, {
        url:'/api/*',
        proxy: 'https://dmp-pre.sm.cn',
    }],
    state: {
        dirpath: ['./example', [0, 1]],
        proxy: 'http://crm.uc.cn',
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
                return this.req.query.name + name
            }
        },
        writeFile: ["channelId"],
        
        readFile: false,
        // readFile: ['channelId'],
        headers: {
            "UC-CSRF-TOKEN": "e37d83b4e29f9f01195bea7c80c8c5aa"
        },
        // swagger: 'imp-daily.uc.test/ncrm/v2/api-docs',
        // swagger: 'dmp-pre.sm.cn/api/v2/api-docs',
        pureProxy: false,
        swaggerManualProps: {
            // pageSize: 20,
            // businessTypes: () => {
            //     return '2'
            // },
            // result: {
            //     length: 19,
            // }
        }
    }
}