/**
 * Defines the interface of a token that can be observed for cancellation requests.
 */
export interface CancelToken {
    /**
     * Returns whether cancellation has been requested.
     */
    readonly signaled: boolean;
}

/**
 * Defines a CancelToken implementation that can be signated.
 */
export class CancelTokenSource implements CancelToken {

    /**
     * Defines an instance that is never cancelled.
     */
    public static readonly NEVER: CancelToken = {
        signaled: false
    }

    private _signaled = false;

    /**
     * Creates a new instance of this type.
     * @param _linkedSource Optional token to link with this instance.
     */
    constructor(private readonly _linkedSource?: CancelToken) {
    }

    get signaled(): boolean {
        return this._linkedSource?.signaled || this._signaled;
    }

    /**
     * Sets the signaled state which will cancel an emit operation.
     */
    cancel(): void {
        this._signaled = true;
    }
}