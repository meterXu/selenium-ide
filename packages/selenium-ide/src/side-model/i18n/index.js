"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _zh = _interopRequireDefault(require("./zh"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let i18n = function () {
  this.langList = {
    zh: _zh.default
  };
  this.type = 'zh';
  this.lang = this.langList[this.type];
};

var _default = new i18n();

exports.default = _default;