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
                name: "@getName(chenxuehui)"
            }
        }
    }, {
        url:'/login',
        method: 'GET',
        data: {}
    }, {
        url:'/huihui',
        proxy: 'http://localhost',
        method: 'POST',
        port: '3002',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Host': 'localhost:3003',
            // 'Origin': 'http://localhost',
            'Referer': 'http://localhost:3003/',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
        }
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
        
        }
    }, {
        url:'/index/getstarlist',
        proxy: 'https://www.imooc.com',
        method: 'GET',
        port: '443',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Host': 'www.imooc.com',
            'Referer': 'https://www.imooc.com/',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
            'Cookie': '_pk_id.2804852a3abc.ac81=cd8e392b-3702-469d-9b38-42b13dd1f6f4.1534147992.2.1534418441.1534148143.; cna=eSr4E356dFYCAWoLKdVGypbn; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.fnFbwGJjk4nFxjGfqUoWs6qSskRO-TkzWQYVlKElM7O3_VJgXB5FCQ.tUgwM5qL7FB6CzsRu1KU0A.DQhuBJkKRkfBzaeW7aaMPKFRjnkSwnwpLNylmm1mxwyU6lDpSePHIOcRGJ54Uyuqe5i8EC0nZGS0GOS37gHElCBuRK975AqsgbgIgyxPYVkZYgnHi965Y_KdwNH9vLCJf0w-RFuWOmZszMIlNe2123j7Z3hh_eGxNPAOsaC6SQtg7nJe-4NUbEWSaq3tEnNpnUb-aJxe-TSVoWYlAVkEtbjZgpp9p6ryOkJteHq8gOLz914Ue7xKaR0CjZWlF3aI7tDFTx9XmjmtG0e5QFRXS2p5hL1DtGPZgp7EpP4tBc-3prjacRBZNI01Mjyx4AD9Q8jnheg_ebtaFxBnElKhL-AM4h9vg1liXvNQ-PjYPIeTsrYSKov6meTSx7mlMb0q.d_pQJmBrQhGxT50bXtdAYA; UC-CSRF-TOKEN=852d2f8fabc618ad95bf5396cd6b93d5; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.fnFbwGJjk4nFxjGfqUoWs6qSskRO-TkzWQYVlKElM7O3_VJgXB5FCQ.tUgwM5qL7FB6CzsRu1KU0A.DQhuBJkKRkfBzaeW7aaMPKFRjnkSwnwpLNylmm1mxwyU6lDpSePHIOcRGJ54Uyuqe5i8EC0nZGS0GOS37gHElCBuRK975AqsgbgIgyxPYVkZYgnHi965Y_KdwNH9vLCJf0w-RFuWOmZszMIlNe2123j7Z3hh_eGxNPAOsaC6SQtg7nJe-4NUbEWSaq3tEnNpnUb-aJxe-TSVoWYlAVkEtbjZgpp9p6ryOkJteHq8gOLz914Ue7xKaR0CjZWlF3aI7tDFTx9XmjmtG0e5QFRXS2p5hL1DtGPZgp7EpP4tBc-3prjacRBZNI01Mjyx4AD9Q8jnheg_ebtaFxBnElKhL-AM4h9vg1liXvNQ-PjYPIeTsrYSKov6meTSx7mlMb0q.d_pQJmBrQhGxT50bXtdAYA"; _pk_cvar.test-123.ac81=%7B%221%22%3A%5B%22userId%22%2C%221061%22%5D%2C%222%22%3A%5B%22source%22%2C%22cpc%22%5D%7D; _pk_ses.test-123.ac81=*; _pk_id.test-123.ac81=e84d8e01-06ba-474d-872a-b7bc99cc3fcd.1540968266.2.1541150772.1540968281.',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }, {
        url:'/yingxiao/web/init/operator',
        proxy: 'https://crm.uc.cn',
        method: 'GET',
        port: '443',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Host': 'crm.uc.cn',
            'Referer': 'https://crm.uc.cn/',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
            'Cookie': 'SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.Tiw0lPbA2fud69hoSkDOawd4f0bfFm6XtcyF7Gj3l5t_Yva3i4KkJQ.QwPnWLexG9estc7Txk8oYw.tTASISJo3yBC4fsJQiBlKU93knaTO1SaU2ObRTD88ECcQaqcCsbnqHfxYPuXoEh6gpkhoRrHt0v_wG0QtMy6tPEuV49TrdtWGtuJqoWT61Q1IfDRx5Ge6Az027tADhJw1i4UROxU6w2WnkPN-1IYFzq58YAHI04DjE5VMZtyn-SqDRwM-dHHG4tJMRfD3VSEC55oHBYspypd9OxxNgW7cvrixaYf7Gms2qG_7_VJbM5qU8eQ7iWtfhbVKumiOYkhuBOvdVxTh2VGkFFexgv2HVLYpNam2mwzOg5vHW8lTBL0haAZkYtAcj8wJrRilXJdg1jZaqBSlLIRejNPyyBNLQPnDElgmXM7jYvFyB8rWWzOkQj7-zJxoZwqKH3GjQ1uSOhkblFFYoCujf7y2r2qQOaehJBzY4stlJdylHG8y8o.bDkLk8hIPJ8_kDg26NgwXw; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.Tiw0lPbA2fud69hoSkDOawd4f0bfFm6XtcyF7Gj3l5t_Yva3i4KkJQ.QwPnWLexG9estc7Txk8oYw.tTASISJo3yBC4fsJQiBlKU93knaTO1SaU2ObRTD88ECcQaqcCsbnqHfxYPuXoEh6gpkhoRrHt0v_wG0QtMy6tPEuV49TrdtWGtuJqoWT61Q1IfDRx5Ge6Az027tADhJw1i4UROxU6w2WnkPN-1IYFzq58YAHI04DjE5VMZtyn-SqDRwM-dHHG4tJMRfD3VSEC55oHBYspypd9OxxNgW7cvrixaYf7Gms2qG_7_VJbM5qU8eQ7iWtfhbVKumiOYkhuBOvdVxTh2VGkFFexgv2HVLYpNam2mwzOg5vHW8lTBL0haAZkYtAcj8wJrRilXJdg1jZaqBSlLIRejNPyyBNLQPnDElgmXM7jYvFyB8rWWzOkQj7-zJxoZwqKH3GjQ1uSOhkblFFYoCujf7y2r2qQOaehJBzY4stlJdylHG8y8o.bDkLk8hIPJ8_kDg26NgwXw',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }],
    state: {
        username:'cxh',
        password:'123456',
        isLogin: true,
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
        }
    }
}