const { APP_ID } = require('ewelink-api/src/data/constants');
const { _get, timestamp, nonce } = require('ewelink-api/src/helpers/utilities');
const errors = require('ewelink-api/src/data/errors');

module.exports = {
  /**
   * Change color of a specific device
   *
   * @param deviceId
   * @param r
   * @param g
   * @param b
   * 
   * @returns {Promise<{state: *, r: integer, g: integer, b: integer}|{msg: string, error: *}>}
   */
  async setDeviceColor(deviceId, r, g, b) {
    const device = await this.getDevice(deviceId);
    const error = _get(device, 'error', false);

    if (error) {
      return { error, msg: errors[error] };
    }

    const params = {};

    if (device.params.colorR !== r) {
      params.colorR = r;
    }
    if (device.params.colorG !== g) {
      params.colorG = g;
    }
    if (device.params.colorB !== b) {
      params.colorB = b;
    }

    if (Object.keys(params).length !== 0) {
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
    }

    return { status: 'ok', r, g, b };
  },
};
