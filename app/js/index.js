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
 * This file is beeing called by index.html
 */
var api = require('./js/api');
var stylus = require('stylus');
var str = require('fs').readFileSync(__dirname + '/css/main.styl', 'utf8');

stylus(str)
  .set('filename', __dirname + '/css/main.styl', 'utf8')
  .render(function(err, css) {
    if (err) throw err;
    var style = document.createElement('style');
    style.innerText = css;
    style.type = 'text/css'
    document.head.appendChild(style);
  })

api.initialize({
  server: 'michaelslab-muon-fe.azurewebsites.net',
  port: 80
});

setInterval(function() {
  api.getConfigData('D1', 90, null, null, function(begin, end, min, max, count) {
    console.log(count);

    $('#count').text(count);
    $('#begin').text(begin);
    $('#end').text(end);
  });
}, 10000);
