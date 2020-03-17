const geoip = require('geoip-lite');

const getIp = function(req) {
    let ip;

    if(req.headers['x-forwarded-for']) {
        const ips = req.headers['x-forwarded-for'].split(',');
        ip = ips[0].replace(/\s/g, '');
    }

    ip = ip || req.connection.remoteAddress;

    return ip.replace('::ffff:', '');
};

const getCountryCode = function(req) {
    const geo = geoip.lookup(getIp(req));
    return geo ? geo.country : '';
};

// Exports
exports.getIp = getIp;
exports.getCountryCode = getCountryCode;
