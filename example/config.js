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
        url:'/test1',
        method:'GET',
        "data|<2": {
            name: "@name()",
            "list|<req.size": {
                title:"@title()",
                time: "@time()",
                height: "@number(2)"
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
            'Cookie': '_pk_id.2804852a3abc.ac81=cd8e392b-3702-469d-9b38-42b13dd1f6f4.1534147992.2.1534418441.1534148143.; sm_diu=363e41dd52ca9676ebc14101fa437f8d%7C%7C1Fe0ffe04498da41f4%7C1535624542; cna=eSr4E356dFYCAWoLKdVGypbn; SSO_IDT="Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.UzPxAY9Xk4CtzYCqifawmAXUJWqUkH7DYYAniz9mv4yAS8m3WoCjdA.i3nEjWwh__p7cQbbKAGsIg.Qe72UQftq9mKF3XjSj2iV3nwXlNJKgBzIVjNoUXZ9DS0zZINPFPl2FUOz0bIg8gqAx5JL2i_Zf6cz3kikeACQrR6dlJIg_2TVFTf0FKQ8dKx5JoXIL6JA55wui77-H_wxnTdKx7ZJ3vmfKqlRCV2VXFPzqakx3EXjmzMaxytnbYd0fb5qVU-5RSBZ1l0mZS7vhCfRJiPHFkRZfIz6pHL0L41i_n_VuMrklSM8jf07i3c8CRIexnuuVp825cwrkzEzgRh3F7UtIBxLKVIqjruAxmK8F0QUQans1tjU3ePl7epVG5-o3Vd91C2Fh1Xza1aGs1m6pSfea_Oa_fktlDe0ShVtzAnJjaRD7TLToF6MXCIkYQX9osxoF9cuGSTvOQC.lLUhaNjFVbtVUFM85HTjuQ"; UC-CSRF-TOKEN=391a8ffad08b099e05dea291e45c8174; SSO_IDT_V2=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiQTEyOEtXIn0.UzPxAY9Xk4CtzYCqifawmAXUJWqUkH7DYYAniz9mv4yAS8m3WoCjdA.i3nEjWwh__p7cQbbKAGsIg.Qe72UQftq9mKF3XjSj2iV3nwXlNJKgBzIVjNoUXZ9DS0zZINPFPl2FUOz0bIg8gqAx5JL2i_Zf6cz3kikeACQrR6dlJIg_2TVFTf0FKQ8dKx5JoXIL6JA55wui77-H_wxnTdKx7ZJ3vmfKqlRCV2VXFPzqakx3EXjmzMaxytnbYd0fb5qVU-5RSBZ1l0mZS7vhCfRJiPHFkRZfIz6pHL0L41i_n_VuMrklSM8jf07i3c8CRIexnuuVp825cwrkzEzgRh3F7UtIBxLKVIqjruAxmK8F0QUQans1tjU3ePl7epVG5-o3Vd91C2Fh1Xza1aGs1m6pSfea_Oa_fktlDe0ShVtzAnJjaRD7TLToF6MXCIkYQX9osxoF9cuGSTvOQC.lLUhaNjFVbtVUFM85HTjuQ; _pk_cvar.test-123.ac81=%7B%221%22%3A%5B%22userId%22%2C%221061%22%5D%2C%222%22%3A%5B%22source%22%2C%22cpc%22%5D%7D; _pk_ses.test-123.ac81=*; _pk_id.test-123.ac81=15642aa9-5c5c-4b5e-9d8e-22226fb94780.1539223421.1.1539223428.1539223421.'
        }
    }],
    state: {
        
    }
}