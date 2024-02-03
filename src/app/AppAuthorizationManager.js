import {AuthorizationManager} from "@eryxcoop/appyx-comm";


export default class AppAuthorizationManager extends AuthorizationManager {

    constructor(app) {
        super();
        this._app = app;
    }

    configureHeaders(headers) {
        return headers['Authorization'] = `Bearer ${this.token()}`;
    }

    token() {
        return this._app.session.token();
    }
}
