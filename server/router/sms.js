const express = require('express');
const axios = require('axios');
const CryptoJS = require('crypto-js');

const router = express.Router();

function makeSignature(url, method, timestamp) {
    const accessKey = process.env.SMS_ACCESS_KEY; // access key id (from portal or Sub Account)
    const secretKey = process.env.SMS_SECRET_KEY; // secret key (from portal or Sub Account)
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

const getMessageHistory = async (req, res, next) => {
    const { requestId } = req.query;

    const date = Date.now().toString();
    const uri = process.env.SMS_SERVICE_ID;
    const accessKey = process.env.SMS_ACCESS_KEY; // access key id (from portal or Sub Account)
    const url = `${process.env.SMS_API_URL}/services/${uri}/messages?requestId=${requestId}`;
    const url2 = `/sms/v2/services/${uri}/messages?requestId=${requestId}`;
    const signature = makeSignature(url2, 'GET', date);

    try {
        const data = await axios
            .get(url, {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'x-ncp-iam-access-key': accessKey,
                    'x-ncp-apigw-timestamp': date,
                    'x-ncp-apigw-signature-v2': signature,
                },
            })
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
};

const smsApi = async (req, res, next) => {
    const { from, to, content } = req.body;

    const date = Date.now().toString();
    const uri = process.env.SMS_SERVICE_ID;
    const accessKey = process.env.SMS_ACCESS_KEY; // access key id (from portal or Sub Account)
    const url = `${process.env.SMS_API_URL}/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
    const signature = makeSignature(url2, 'POST', date);

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
                    headers: {
                        'Content-type': 'application/json; charset=utf-8',
                        'x-ncp-iam-access-key': accessKey,
                        'x-ncp-apigw-timestamp': date,
                        'x-ncp-apigw-signature-v2': signature,
                    },
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
};

router.post('/message', smsApi);
router.get('/message', getMessageHistory);

module.exports = router;
