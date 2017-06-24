export default class Warn{

    objectName: string;
    reason: string;
    canContinue: boolean;
    context: any
    continueMessage: string;

    constructor(objectName: string, reason: string, canContinue: boolean, context?: any, continueMessage?: string){
        this.objectName = objectName;
        this.reason = reason;
        this.canContinue = canContinue;
        this.context = context;
        this.continueMessage = continueMessage;
    }

    getObjectName(): string { return this.objectName; }

    getReason(): string { return this.reason; }

    getCanContinue(): boolean { return this.canContinue; }

    getContext(): any { return this.context; }

    getContinueMessage(): string {

        if ( this.continueMessage !== null && this.continueMessage !== undefined ){
            return this.continueMessage;
        }else {
            return this.canContinue ?
                `Will continue with ${ this.objectName } despite the warning: ${ this.reason }.` :
                `Cannot continue with ${ this.objectName }. Please fix the issue : ${ this.reason } and try again.`;
        }

    }

    log(){ //TODO: need to create a log file to put these logs into besides printing it to the console.
        console.info(
            "***************** WARN ********************* \n" +
            `Warn object: ${ this.getObjectName() } \n` +
            `Warn reason: ${ this.getReason() } \n` +
            `Can current process continue: ${ this.getCanContinue() ? "Yes" : "No" } \n` +
            `Context where warning occurred: ${ this.getContext() } \n` +
            `Warn message: ${ this.getContinueMessage() } \n`+
            "***************** WARN ********************* \n"
        )
    }

}