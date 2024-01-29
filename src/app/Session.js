import AnonymousUser from "./AnonymousUser";
import User from "./User";

export default class Session {
    constructor(user = null, token = null, origin=null) {
        this._user = user || new AnonymousUser();
        this._token = token
        this._origin =  origin
    }

    loginUser(userId, email, token, origin, extra) {
        this._user = new User({id: userId, email, ...extra});
        this._token = token;
        this._origin = origin;
        return this._user;
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
        console.log(this._token);
        return this._token != null;
    }

}
