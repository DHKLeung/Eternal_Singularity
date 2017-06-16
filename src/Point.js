var Framework;
Framework = (function (Framework) {
    'use strict'

    Framework.Point = function(x, y) {
        this._x = x;
        this._y = y;
    };

    Object.defineProperty(Framework.Point.prototype, 'x', {
        set: function(newValue) {
            this._x = newValue;
        },
        get: function() {
            return this._x;
        }
    });

    Object.defineProperty(Framework.Point.prototype, 'y', {
        set: function(newValue) {
            this._y = newValue;       
        },
        get: function() {
            return this._y;
        }
    });

    return Framework;
})(Framework || {});
