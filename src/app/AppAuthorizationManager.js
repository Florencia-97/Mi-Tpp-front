import { AuthorizationManager } from "@eryxcoop/appyx-comm";


export default class AppAuthorizationManager extends AuthorizationManager {

    constructor(app) {
        super();
        this._app = app;
    }

    token() {
        return this._app.session().token();
    }
}
