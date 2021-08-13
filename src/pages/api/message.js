const app = require('express')();
const axios = require('axios');
const CryptoJS = require('crypto-js');

app.post('/api/message', smsApi);
app.get('/api/message', getMessageHistory);

module.exports = app;

async function smsApi(req, res, next) {
    const { from, to, content } = req.body;

    const uri = process.env.SMS_SERVICE_ID;
    const url = `${process.env.SMS_API_URL}/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
    const headers = getAuthHeaders(url2);

    try {
        const data = await axios
            .post(
                url,
                {
                    type: 'SMS',
                    countryCode: '82',
                    from,
                    content,
                    messages: [
                        {
                            to: `${to}`,
                        },
                    ],
                },
                {
                    headers,
                },
            )
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
        res.json(data);
    } catch (e) {
        next(e);
    }
}

async function getMessageHistory(req, res, next) {
    const { requestId } = req.query;

    const uri = process.env.SMS_SERVICE_ID;
    const url = `${process.env.SMS_API_URL}/services/${uri}/messages?requestId=${requestId}`;
    const url2 = `/sms/v2/services/${uri}/messages?requestId=${requestId}`;
    const headers = getAuthHeaders(url2);

    try {
        const data = await axios
            .get(url, { headers })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
        res.json(data);
    } catch (e) {
        next(e);
    }
}

function getAuthHeaders(url) {
    const date = Date.now().toString();
    const accessKey = process.env.SMS_ACCESS_KEY;
    const secretKey = process.env.SMS_SECRET_KEY;
    const signature = makeSignature(url, 'GET', date, accessKey, secretKey);
    return {
        'Content-type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': accessKey,
        'x-ncp-apigw-timestamp': date,
        'x-ncp-apigw-signature-v2': signature,
    };
}

function makeSignature(url, method, timestamp, accessKey, secretKey) {
    const space = ' ';
    const newLine = '\n';

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);

    const hash = hmac.finalize();
    return hash.toString(CryptoJS.enc.Base64);
}
