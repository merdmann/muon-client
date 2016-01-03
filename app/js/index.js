/*
 * The file index.js is part of the muon-be project.
 *
 * The MIT License (MIT) applies.
 *
 * Copyright (c) 2015 Michael Erdmann
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
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
  api.getConfigData('D1', 90, null, null, function(from, till, min, max, count) {
    console.log(count);

    $('#count').text(count + " " + from + " " + till);
  });
}, 10000);
