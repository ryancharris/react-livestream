'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var react = require('react');
var core = require('@emotion/core');
var PropTypes = _interopDefault(require('prop-types'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    position: relative;\n    &::before {\n      content: '';\n      display: block;\n      padding-bottom: calc(100% / (16 / 9));\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var MIXER_API_URL = 'https://mixer.com/api/v1/channels/';
var TWITCH_API_URL = 'https://api.twitch.tv/helix/streams?user_login=';

function ReactLivestream(props) {
  var twitchClientId = props.twitchClientId,
      mixerChannelId = props.mixerChannelId,
      offlineComponent = props.offlineComponent,
      platform = props.platform,
      twitchUserName = props.twitchUserName,
      youtubeChannelId = props.youtubeChannelId,
      youtubeApiKey = props.youtubeApiKey;

  var _useState = react.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLive = _useState2[0],
      setIsLive = _useState2[1];

  var _useState3 = react.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      youtubeVideoId = _useState4[0],
      setYoutubeVideoId = _useState4[1];

  var iframeWrapperStyles = core.css(_templateObject());
  var iframeStyles = core.css(_templateObject2());

  function fetchTwitchData() {
    fetch("".concat(TWITCH_API_URL).concat(twitchUserName), {
      headers: {
        'Client-ID': twitchClientId
      }
    }).then( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
        var response, streamInfo;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return res.json();

              case 2:
                response = _context.sent;
                streamInfo = Boolean(response.data && response.data[0]);

                if (streamInfo) {
                  setIsLive(true);
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }())["catch"](function (err) {
      console.log('Error fetching data from Twitch API: ', err);
    });
  }

  function fetchMixerData() {
    fetch("".concat(MIXER_API_URL).concat(mixerChannelId, "/broadcast")).then( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(res) {
        var response, channelId, online;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return res.json();

              case 2:
                response = _context2.sent;
                channelId = response.channelId, online = response.online;

                if (channelId === mixerChannelId && online) {
                  setIsLive(true);
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }())["catch"](function (err) {
      console.log('Error fetching data from Mixer API: ', err);
    });
  }

  function fetchYoutubeData() {
    fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=".concat(youtubeChannelId, "&eventType=live&type=video&key=").concat(youtubeApiKey), {
      headers: {
        Accept: 'application/json'
      }
    }).then( /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(res) {
        var response, streamInfo;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return res.json();

              case 2:
                response = _context3.sent;

                if (response.items && response.items.length > 1) {
                  streamInfo = response.items[0];
                  setIsLive(true);
                  setYoutubeVideoId(streamInfo.id.videoId);
                }

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }())["catch"](function (err) {
      console.log('Error fetching data from YouTube API: ', err);
    });
  }

  function processMixerStream() {
    if (mixerChannelId) {
      fetchMixerData();
    } else {
      console.error('[react-livestream] Mixer support requires a mixerChannelId prop');
    }
  }

  function processTwitchStream() {
    if (twitchClientId && twitchUserName) {
      fetchTwitchData();
    } else {
      console.error('[react-livestream] Twitch support requires a twitchClientId and twitchUserName prop');
    }
  }

  function processYoutubeStream() {
    if (youtubeChannelId && youtubeApiKey) {
      fetchYoutubeData();
    } else {
      console.error('[react-livestream] YouTube support requires a youtubeApiKey and youtubeChannelId prop');
    }
  }

  function embedIframe() {
    switch (platform) {
      case 'mixer':
        return core.jsx("iframe", {
          css: iframeStyles,
          "i18n-title": "channel#ShareDialog:playerEmbedFrame|Embed player Frame copied from share dialog",
          allowFullScreen: "true",
          src: "https://mixer.com/embed/player/".concat(mixerChannelId, "?disableLowLatency=1")
        });

      case 'twitch':
        return core.jsx("iframe", {
          css: iframeStyles,
          allowFullScreen: true,
          src: "https://player.twitch.tv/?channel=".concat(twitchUserName),
          frameBorder: "0"
        });

      case 'youtube':
        return core.jsx("iframe", {
          css: iframeStyles,
          src: "https://www.youtube.com/embed/".concat(youtubeVideoId, "?autoplay=1&mute=1"),
          frameBorder: "0",
          allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true
        });
    }
  }

  react.useEffect(function () {
    switch (platform) {
      case 'mixer':
        processMixerStream();
        break;

      case 'twitch':
        processTwitchStream();
        break;

      case 'youtube':
        processYoutubeStream();
        break;

      default:
        console.error('[react-livestream] Platform prop is required for this package to work 🤘');
        break;
    }
  }, []);
  return isLive ? core.jsx("div", {
    className: "ReactLivestream",
    css: iframeWrapperStyles
  }, embedIframe()) : offlineComponent ? offlineComponent : null;
}
ReactLivestream.propTypes = {
  mixerChannelId: PropTypes.num,
  offlineComponent: PropTypes.element,
  platform: PropTypes.string.isRequired,
  twitchClientId: PropTypes.string,
  twitchUserName: PropTypes.string,
  youtubeChannelId: PropTypes.string,
  youtubeApiKey: PropTypes.string
};
ReactLivestream.defaultProps = {
  mixerChannelId: null,
  offlineComponent: null,
  twitchClientId: null,
  twitchUserName: null,
  youtubeChannelId: null,
  youtubeApiKey: null
};

module.exports = ReactLivestream;
