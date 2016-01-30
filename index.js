'use strict';

const got = require('got');
const CronJob = require('cron').CronJob;
const env = require('envalid');

// Configure
env.validate(process.env, {
    DOMAIN: {required: true},
    USERNAME: {required:true},
    PASSWORD: {required:true}
});

const ipUrl = 'https://api.ipify.org',
 domainName = process.env.DOMAIN,
 username = process.env.USERNAME,
 password = process.env.PASSWORD,
 updateUrl = `https://www.ovh.com/nic/update?system=dyndns&hostname=${domainName}&myip=`;
var prevIp;

const ipUpdater = () => {
    got(ipUrl)
        .then(function (res) {
            return res.body;
        })
        .then(function (ip) {
            if (!prevIp || prevIp !== ip) {
                prevIp = ip;
                const opts = {
                    headers: {
                        'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
                    }
                };
                const url = `${updateUrl}${ip}`;
                return got(url, opts);
            }
        })
        .catch(function (err) {
            console.error(err);
            console.error(err.response && err.response.body);
        });
};

new CronJob('0 */5 * * * *', ipUpdater, null, true);
ipUpdater();
