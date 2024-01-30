import AnonymousUser from "./AnonymousUser";
import User from "./User";

export default class Session {
    constructor(user = null, token = null) {
        this._user = user || new AnonymousUser();
        this._token = token
    }

    user(){
        return this._user
    }

    token() {
        return this._token
    }

    origin() {
        return this._origin;
    }

    isLoggedIn() {
        console.log("asdf")
        console.log(this._token);
        return this._token != null;
    }

}
