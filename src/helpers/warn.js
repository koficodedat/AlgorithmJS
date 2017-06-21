"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Warn = (function () {
    function Warn(objectName, reason, canContinue, context, continueMessage) {
        this.objectName = objectName;
        this.reason = reason;
        this.canContinue = canContinue;
        this.context = context;
        this.continueMessage = continueMessage;
    }
    Warn.prototype.getObjectName = function () { return this.objectName; };
    Warn.prototype.getReason = function () { return this.reason; };
    Warn.prototype.getCanContinue = function () { return this.canContinue; };
    Warn.prototype.getContext = function () { return this.context; };
    Warn.prototype.getContinueMessage = function () {
        if (this.continueMessage !== null && this.continueMessage !== undefined) {
            return this.continueMessage;
        }
        else {
            return this.canContinue ?
                "Will continue with " + this.objectName + " despite the warning: " + this.reason + "." :
                "Cannot continue with " + this.objectName + ". Please fix the issue : " + this.reason + " and try again.";
        }
    };
    Warn.prototype.log = function () {
        console.info("***************** WARN ********************* \n" +
            ("Warn object: " + this.getObjectName() + " \n") +
            ("Warn reason: " + this.getReason() + " \n") +
            ("Can current process continue: " + (this.getCanContinue() ? "Yes" : "No") + " \n") +
            ("Context where warning occurred: " + this.getContext() + " \n") +
            ("Warn message: " + this.getContinueMessage() + " \n") +
            "***************** WARN ********************* \n");
    };
    return Warn;
}());
exports.default = Warn;
