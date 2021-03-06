'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _colors = require('colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express'),
    app = express(),
    fs = require('fs'),
    getStat = require('util').promisify(fs.stat);

app.get('/audio/:music', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var filePath;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        filePath = './musics/' + req.params.music + '.mp3';


                        getStat(filePath).then(function (stat) {
                            console.log(stat);
                            res.writeHead(200, {
                                'Content-Type': 'audio/mpeg',
                                'Content-Length': stat.size
                            });

                            var stream = fs.createReadStream(filePath);

                            // stream.on('end', () => console.log(bold('>') + ' requested ' + bold(gray(req.params.music))));

                            // streaming of the music
                            stream.pipe(res);
                        }).catch(function (err) {
                            res.status(404).json({ code: 404, message: "Music not found" });
                        });

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

app.listen(3000, function () {
    return console.log((0, _colors.green)('➜  ') + (0, _colors.bold)((0, _colors.cyan)('Streamer')) + ' running in ' + (0, _colors.blue)((0, _colors.bold)(":3000")));
});