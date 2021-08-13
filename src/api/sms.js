import axios from 'axios';

const accessKey = process.env.NEXT_PUBLIC_SMS_ACCESS_KEY; // access key id (from portal or Sub Account)
const secretKey = process.env.NEXT_PUBLIC_SMS_SECRET_KEY; // secret key (from portal or Sub Account)

// export const makeSignature = (url, method, timestamp) => {
//     if (!window) return;
//     const CryptoJS = window?.CryptoJS;
//     const space = ' '; // one space
//     const newLine = '\n'; // new line
//
//     const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
//     hmac.update(method);
//     hmac.update(space);
//     hmac.update(url);
//     hmac.update(newLine);
//     hmac.update(timestamp);
//     hmac.update(newLine);
//     hmac.update(accessKey);
//
//     const hash = hmac.finalize();
//
//     return hash.toString(CryptoJS.enc.Base64);
// };

function makeSignature() {
    var CryptoJS = window.CryptoJS;
    var space = ' '; // one space
    var newLine = '\n'; // new line
    var method = 'GET'; // method
    var url = `/services/${process.env.NEXT_PUBLIC_SMS_SERVICE_ID}/messages?requestId=0-ESG-202108-33579215-0`;
    const timestamp = new Date().getTime().toString();

    var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    console.log(`${method} ${url}\n${timestamp}\n${accessKey}`);
    hmac.update(`${method} ${url}\n${timestamp}\n${accessKey}`);
    // hmac.update(space);
    // hmac.update(url);
    // hmac.update(newLine);
    // hmac.update(timestamp);
    // hmac.update(newLine);
    // hmac.update(accessKey);

    var hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
}

export const smsApi = (url, method, body) => {
    const timestamp = new Date().getTime().toString();
    console.log(makeSignature(url, method, timestamp));
    return axios
        .create({
            baseURL: '/sms',
            // baseURL: process.env.NEXT_PUBLIC_SMS_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'x-ncp-apigw-timestamp': timestamp,
                'x-ncp-iam-access-key': accessKey,
                'x-ncp-apigw-signature-v2': makeSignature(
                    url,
                    method,
                    timestamp,
                ),
            },
        })
        [method.toLowerCase()](url, { ...body });
};
