var request = require('supertest')
const express = require('express')
var bodyParser = require('body-parser')
var freeMock = require('../src')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

describe('Mock Data', function() {
    app.use(freeMock({
        '/test11/*': {
            status: 0,
            'data|@param.pageSize': [{
                id: '@increment',
                name: "@name",
                age: "@integer(0, 100)",
            }]
        }
    }))

    it('GET', function(done) {
        request(app)
        .get('/test11/a')
        .query({pageSize: 20})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
            res.body = {
                status: res.body.status,
                datalength: res.body.data.length,
                datakeys: Object.keys(res.body.data[0]).join()
            }
        })
        .expect(200, {
            status: 0,
            datalength: 20,
            datakeys: 'id,name,age'
          }, done);
    })

    it('POST', function(done) {
        request(app)
        .post('/test11/b')
        .send({pageSize: 10})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
            res.body = {
                status: res.body.status,
                datalength: res.body.data.length,
                datakeys: Object.keys(res.body.data[0]).join()
            }
          })
        .expect(200, {
            status: 0,
            datalength: 10,
            datakeys: 'id,name,age'
          }, done);
    })
})


describe('Mock Path', function() {
    app.use(freeMock({
        '/test22/*': '/mock'
    }))

    it('GET', function(done) {
        request(app)
        .get('/test22/a')
        .query({pageSize: 20})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
            res.body = {
                status: res.body.status,
                datalength: res.body.data.length,
                data_title: typeof res.body.data[0].title,
                data_id: typeof res.body.data[0].id
            }
        })
        .expect(200, {
            status: 1,
            datalength: 20,
            data_title: 'string',
            data_id: 'number'
          }, done);
    })

    it('POST', function(done) {
        request(app)
        .post('/test22/a')
        .send({pageSize: 15})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
            res.body = {
                status: res.body.status,
                datalength: res.body.data.length,
                data_title: typeof res.body.data[0].title,
                data_id: typeof res.body.data[0].id
            }
          })
        .expect(200, {
            status: 1,
            datalength: 15,
            data_title: 'string',
            data_id: 'number'
          }, done);
    })
})

describe('Mock Proxy', function() {
    app.use(freeMock({
        '/ncrm/promotionUser/siteUrlList': 'https://mocks.alibaba-inc.com/mock'
    }))

    it('GET', function(done) {
        request(app)
        .get('/ncrm/promotionUser/siteUrlList')
        .query({pageSize: 20})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
            "status": 0,
            "message": "success",
            "data": [
              {
                "id": 3046,
                "cid": 178278,
                "ccid": 100024373,
                "creatorId": 1179,
                "creatorType": 0,
                "creatorTypeText": "代理商签约",
                "creatorUserName": null,
                "siteUrl": "https://jishi-zhike-17.com",
                "urlMd5": "f2997103f5828b93018517c20b508bdc",
                "siteName": "n-jishi-zhike-17",
                "industry1": 4000000,
                "industry1Text": null,
                "industry2": 4002000,
                "industry2Text": null,
                "industry3": 4002001,
                "industry3Text": null,
                "salesId": 210000056,
                "salesName": "sdfewfwefsdf",
                "custId": 210000056,
                "custName": "sdfewfwefsdf",
                "businessTypes": [
                  1
                ],
                "businessTypesText": [
                  "卧龙"
                ],
                "businessSystem": 1,
                "businessSystemText": "KA",
                "state": 1,
                "stateText": null,
                "agentSalesId": 0,
                "agentSalesName": "",
                "createTime": "2019-01-22 11:16:57",
                "modifyTime": "2019-01-22 11:25:21"
              }
            ],
            "extend": null,
            "success": true
          }, done);
    })
})

describe('Mock function', function() {
    app.use(freeMock({
        '/test/function1': function(req, state, res) {
            const param = req.body
            res.json(state.mock({
                status: 0,
                [`result|${param.pageParam.pageSize}`]: [{
                    pageSize: param.pageParam.pageSize,
                    header: req.headers,
                    Cookie: state.Cookie
                }]
            }))
        },
        "/test/function2": function(req, state) {
            const param = req.body
            return {
                status: 0,
                'result|@param.pageParam.pageSize': [{
                    pageSize: param.pageParam.pageSize,
                    header: req.headers,
                    Cookie: state.Cookie
                }]
            }
        },
        Cookie: '1234'
    }))

    it('POST', function(done) {
        request(app)
        .post('/test/function1')
        .send({pageParam: { pageSize: 15}})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
            res.body = {
                status: res.body.status,
                datalength: res.body.result.length,
                pageSize: res.body.result[0].pageSize
            }
          })
        .expect(200, {
            status: 0,
            datalength: 15,
            pageSize: 15
          }, done);
    })

    it('POST', function(done) {
        request(app)
        .post('/test/function2')
        .send({pageParam: { pageSize: 15}})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
            res.body = {
                status: res.body.status,
                datalength: res.body.result.length,
                pageSize: res.body.result[0].pageSize
            }
          })
        .expect(200, {
            status: 0,
            datalength: 15,
            pageSize: 15
          }, done);
    })
})
