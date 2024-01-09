require('dotenv').config({ path: './.env' });
const debug = require('debug')(process.env.DEBUG); // Mode debug dipanggil

module.exports = {
    Sys(params) {
        return debug(params);
    },
    Info(params) {
        return console.info(params);
    },
    OError(params) {
        return console.error(params);
    },
    Out_Obj(params_object) {
        return console.dir(params_object);
    },
    Table(params) {
        return console.table(params);
    },
    Trace() {
        return console.trace();
    },
    Warning(params) {
        return console.warn(params);
    },
    ConvJson(params) {
        return console.log(JSON.stringify(params));
    }

};