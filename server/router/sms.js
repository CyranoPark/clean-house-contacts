const express = require('express');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const hmacSHA256 = require('crypto-js/hmac-sha256');
const Base64 = require('crypto-js/enc-base64');

const router = express.Router();

function makeSignature(url, method, timestamp) {
    const accessKey = process.env.SMS_ACCESS_KEY; // access key id (from portal or Sub Account)
    const secretKey = process.env.SMS_SECRET_KEY; // secret key (from portal or Sub Account)
    const text = `${method} ${url}\n${timestamp}\n${accessKey}`;

    console.log(secretKey);
    const hash = CryptoJS.HmacSHA256(text, secretKey);
    return hash.toString(CryptoJS.enc.Base64);
}

const getMessageHistory = async (req, res, next) => {
    const accessKey = process.env.SMS_ACCESS_KEY; // access key id (from portal or Sub Account)
    const secretKey = process.env.SMS_SECRET_KEY; // secret key (from portal or Sub Account)
    const timestamp = new Date().getTime().toString();
    const headers = {
        'Content-type': 'application/json',
        'x-ncp-iam-access-key': accessKey,
        'x-ncp-apigw-timestamp': timestamp,
        'x-ncp-apigw-signature-v2': makeSignature(
            `/services/${process.env.SMS_SERVICE_ID}/messages?requestId=0-ESG-202108-33579215-0`,
            'GET',
            timestamp,
        ),
    };
    console.log(headers);

    try {
        const data = await axios.get(
            `${process.env.SMS_API_URL}/services/${process.env.SMS_SERVICE_ID}/messages?requestId=0-ESG-202108-33579215-0`,
            {
                headers,
            },
        );
        console.log(data);
    } catch (e) {
        console.log(e);
        res.send(e);
        // next(e);
    }
};

const smsApi = async (req, res, next) => {
    const headers = req.headers;
    console.log(req.body);
    console.log(headers);

    try {
        const data = await axios.post(
            `${process.env.SMS_API_URL}/services/${process.env.SMS_SERVICE_ID}/messages`,
            {
                ...req.body,
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'x-ncp-iam-access-key': headers['x-ncp-iam-access-key'],
                    'x-ncp-apigw-signature-v2':
                        headers['x-ncp-apigw-signature-v2'],
                    'x-ncp-apigw-timestamp': headers['x-ncp-apigw-timestamp'],
                },
            },
        );
        console.log(data);
    } catch (e) {
        res.send(e);
        // next(e);
    }

    // return axios
    //     .create({
    //         baseURL: '/sms',
    //         // baseURL: process.env.NEXT_PUBLIC_SMS_API_URL,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'x-ncp-apigw-timestamp': timestamp,
    //             'x-ncp-iam-access-key': accessKey,
    //             'x-ncp-apigw-signature-v2': makeSignature(
    //                 url,
    //                 method,
    //                 timestamp,
    //             ),
    //         },
    //     })
    //     [method.toLowerCase()](url, { ...body });
};

router.post('/message', smsApi);
router.get('/message', getMessageHistory);

module.exports = router;
