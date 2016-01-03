/*
 * Muon Client - A portable client for the Muon experiment
 *
 * Written in 2016 by Michael Erdmann <Michael.erdmann@snafu.de>
 *
 * To the extent possible under law, the author(s) have dedicated all copyright and
 * related and neighboring rights to this software to the public domain worldwide.
 *
 * This software is distributed without any warranty.
 *
 * You should have received a copy of the CC0 Public Domain Dedication along with
 * this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */
 
/**
 * This file contains the client side of the API to retrieve data from the
 * server.
 */

/*jslint node: true */
/*global console, require, restful, window */

var api = null;

/**
 * @brief Initialize the interface to the server
 * @details This method either takes an argument or it is empty
 *
 * @param  [description]
 * @return [description]
 */
exports.initialize = function(init) {
  'use strict';
  var port, server;

  if (!init) {
    port = window.location.port;
    server = window.location.hostname;
  } else {
    port = init.port;
    server = init.server;
  }

  //console.log("port: " + port + ", server: " + server);
  api = restful(server).port(port);
};

/**
 * retrive the condifguration data from and call the callback when it
 * has become available.
 */
exports.getConfigData = function(detector, tilt, begin, end, callback) {
  'use strict';

  var args = {
    detector: detector,
    startDate: begin,
    endDate: end,
    tilt: tilt
  };

  api.one('api/config', JSON.stringify(args)).get().then(function(response) {
    var config = response.body().data(),
      count = config.result.count,
      from = config.result.startDate,
      till = config.result.endDate,
      min = config.result.minValue,
      max = config.result.maxValue;

    if (callback) {
      return callback(from, till, min, max, count);
    }
  });
};

/**
 * This functuion requests data from the server
 */
exports.requestData = function(detector, tilt, begin, end, compression, callback) {
  "use strict";

  var args = {
    detector: detector,
    startDate: begin,
    endDate: end,
    tilt: tilt,
    compression: compression
  };

  console.log(args);

  api.one("api/data", JSON.stringify(args)).get().then(
    function(response) {
      var b = response.body().data();

      if (callback) {
        callback(args, b.data);
      }
    },
    function(ignore) {
      callback(null, null);
    }
  );
};

exports.requestRandom = function(items, bits, callback) {
  "use strict";

  var args = {
    items: items,
    bits: bits
  };

  api.one("api/random", JSON.stringify(args)).get().then(
    function(response) {
      var b = response.body().data();

      if (callback) {
        callback(b.data);
      }
    },
    function(ignore) {
      if (callback) {
        callback(null);
      }
    }
  );
};

/**
 * @brief get all tilts in the database
 * @details THis function returns a list of tilts which are stored in the database.Upon
 * receving the data the call back will be called with the data as an argument. If there
 * is any kind of error the call back will be called with the argument null!
 *
 * @param  none
 * @return data
 */
exports.getTilts = function(callback) {
  "use strict";

  var args = {};

  api.one("api/tilt", JSON.stringify(args)).get().then(
    function(response) {
      var b = response.body().data();

      if (callback) {
        callback(b.result);
      }
    },
    function(ignore) {
      if (callback) {
        callback(null, b);
      }
    }
  );
};
