const axios = require('axios');
const CryptoJS = require('crypto-js');

export default async function handler(req, res) {
    let responseData = null;

    try {
        if (req.method === 'POST') {
            responseData = await smsApi(req.body);
        }
        if (req.method === 'GET') {
            responseData = await getMessageHistory(req.query);
        }

        res.end(JSON.stringify(responseData));
    } catch (e) {
        res.end(e);
    }
}

async function smsApi(body) {
    const { from, to, content } = body;

    const uri = process.env.SMS_SERVICE_ID;
    const url = `${process.env.SMS_API_URL}/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
    const headers = getAuthHeaders(url2, 'POST');
    return await axios
        .post(
            url,
            {
                type: 'SMS',
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
        });
}

async function getMessageHistory(query) {
    const { requestId } = query;

    const uri = process.env.SMS_SERVICE_ID;
    const url = `${process.env.SMS_API_URL}/services/${uri}/messages?requestId=${requestId}`;
    const url2 = `/sms/v2/services/${uri}/messages?requestId=${requestId}`;
    const headers = getAuthHeaders(url2, 'GET');

    return await axios.get(url, { headers }).then((res) => {
        return res.data;
    });
}

function getAuthHeaders(url, method) {
    const date = Date.now().toString();
    const accessKey = process.env.SMS_ACCESS_KEY;
    const secretKey = process.env.SMS_SECRET_KEY;
    const signature = makeSignature(url, method, date, accessKey, secretKey);
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
