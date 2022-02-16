"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = require("./init");
var args = process.argv.slice(2);
var index_1 = require("./index");
var command = args[0];
var config = require('config');
function loadConfig() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function helper() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = command;
                    switch (_a) {
                        case "add": return [3 /*break*/, 1];
                        case "remove": return [3 /*break*/, 3];
                        case "init": return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, add(args.slice(1))];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 3:
                    {
                        remove(args.slice(1));
                        return [3 /*break*/, 6];
                    }
                    _b.label = 4;
                case 4:
                    {
                        (0, init_1.initScript)();
                        return [3 /*break*/, 6];
                    }
                    _b.label = 5;
                case 5:
                    {
                        console.error("Wrong command: " + command);
                    }
                    _b.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function add(args) {
    return __awaiter(this, void 0, void 0, function () {
        var operator, _a, chanks, configPath, entriesPath, pagesPath, configJson, _i, chanks_1, chank;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    operator = args[0];
                    _a = operator;
                    switch (_a) {
                        case "page": return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 9];
                case 1:
                    chanks = args.slice(1);
                    configPath = config.get('projectSettings.configPath');
                    entriesPath = config.get('projectSettings.entriesPath');
                    pagesPath = config.get('projectSettings.pagesPath');
                    return [4 /*yield*/, (0, index_1.readJson)(configPath)];
                case 2:
                    configJson = _b.sent();
                    _i = 0, chanks_1 = chanks;
                    _b.label = 3;
                case 3:
                    if (!(_i < chanks_1.length)) return [3 /*break*/, 7];
                    chank = chanks_1[_i];
                    return [4 /*yield*/, (0, index_1.createFile)(pagesPath, chank + ".html")];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, (0, index_1.createFile)(entriesPath, chank + ".ts")];
                case 5:
                    _b.sent();
                    configJson.projectSettings.pages.push(chank);
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7: return [4 /*yield*/, (0, index_1.saveJson)(configPath, configJson)];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 9:
                    {
                        console.error("Wrong operator: " + operator);
                    }
                    _b.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
function remove(args) {
    return __awaiter(this, void 0, void 0, function () {
        var operator, _a, chanks, configPath, entriesPath_1, pagesPath_1, configJson, _loop_1, _i, chanks_2, chank;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    operator = args[0];
                    _a = operator;
                    switch (_a) {
                        case "page": return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 9];
                case 1:
                    chanks = args.slice(1);
                    configPath = config.get('projectSettings.configPath');
                    entriesPath_1 = config.get('projectSettings.entriesPath');
                    pagesPath_1 = config.get('projectSettings.pagesPath');
                    return [4 /*yield*/, (0, index_1.readJson)(configPath)];
                case 2:
                    configJson = _b.sent();
                    if (!(chanks.length == 1 && chanks[0] == '*')) return [3 /*break*/, 3];
                    configJson.projectSettings.pages.forEach(function (page) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, index_1.removeFile)(pagesPath_1, page + ".html")];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, (0, index_1.removeFile)(entriesPath_1, page + ".ts")];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    configJson.projectSettings.pages = [];
                    return [3 /*break*/, 7];
                case 3:
                    _loop_1 = function (chank) {
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, (0, index_1.removeFile)(pagesPath_1, chank + ".html")];
                                case 1:
                                    _c.sent();
                                    return [4 /*yield*/, (0, index_1.removeFile)(entriesPath_1, chank + ".ts")];
                                case 2:
                                    _c.sent();
                                    configJson.projectSettings.pages = configJson.projectSettings.pages.filter(function (item) { return item !== chank; });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, chanks_2 = chanks;
                    _b.label = 4;
                case 4:
                    if (!(_i < chanks_2.length)) return [3 /*break*/, 7];
                    chank = chanks_2[_i];
                    return [5 /*yield**/, _loop_1(chank)];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, (0, index_1.saveJson)(configPath, configJson)];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 9:
                    {
                        console.error("Wrong operator: " + operator);
                    }
                    _b.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
loadConfig();
