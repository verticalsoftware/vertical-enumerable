/**
 * Represents a token that can be observed for cancellation requests.
 */
export interface CancelToken {

    /**
     * Returns whether cancellation is requested.
     */
    signaled: boolean;
}

/**
 * Represents a cancellable token that can be optionally linked with another source.
 */
export class CancelTokenSource implements CancelToken {
    /**
     * Constructs a new instance
     * @param {CancelToken} linkedToken An option token to link to this instance.
     */
    constructor(linkedToken?: CancelToken){
        this._linkedToken = linkedToken;
    }

    /**
     * Gets a @type {CancelToken} that is never cancelled.
     * @type {CancelToken}
     */
    public static readonly NEVER: CancelToken = {
        get signaled(): boolean{
            return false;
        }
    }

    private readonly _linkedToken?: CancelToken;
    private _signaled: boolean = false;

    get signaled(): boolean {
        return this._linkedToken?.signaled ?? this._signaled;
    }

    /**
     * Requests cancellation of the operation.
     */
    cancel = () => {
        this._signaled = true;
    }
}