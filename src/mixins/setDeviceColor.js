const { APP_ID } = require('ewelink-api/src/data/constants');
const { _get, timestamp, nonce } = require('ewelink-api/src/helpers/utilities');
const errors = require('ewelink-api/src/data/errors');

module.exports = {
  /**
   * Change power state for a specific device
   *
   * @param deviceId
   * @param state
   * @param channel
   *
   * @returns {Promise<{state: *, status: string}|{msg: string, error: *}>}
   */
  async setDeviceColor(deviceId, r, g, b) {
    const device = await this.getDevice(deviceId);
    const error = _get(device, 'error', false);
    
    if (error) {
        return { error, msg: errors[error] };
    }
        
    const params = {
        colorR: r,
        colorG: g,
        colorB: b
    };

    const response = await this.makeRequest({
      method: 'post',
      uri: '/user/device/status',
      body: {
        deviceid: deviceId,
        params,
        appid: APP_ID,
        nonce,
        ts: timestamp,
        version: 8,
      },
    });

    const responseError = _get(response, 'error', false);

    if (responseError) {
      return { error: responseError, msg: errors[responseError] };
    }

    return { status: 'ok', r, g , b };
  },
};
