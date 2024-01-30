import AnonymousUser from "./AnonymousUser";
import Session from "./Session";
import User from "./User";


export default class SessionStore {
    constructor(storage, key = "session") {
        this._storage = storage;
        this._key = key;
    }

    load() {
        let paramsObject = this._storage.getJson(this._key, {user: null, token: null});
        const user = this._userFrom(paramsObject.user);
        return new Session(user, paramsObject.token);
    }

    store(session) {
        return this._storage.storeJson(this._key, {
            token: session.token(),
            user: {
                email: session.user().email(),
                name: session.user().name(),
                picture: session.user().picture(),
            },
            origin: session.origin()
        });
    }

    remove() {
        this._storage.remove(this._key);
    }

    _userFrom(jsonUser) {
        if (this._isAnonymousUser(jsonUser)) {
            return new AnonymousUser()
        } else {
            return new User(jsonUser);
        }
    }

    _isAnonymousUser(paramsObject) {
        return paramsObject == null || paramsObject.email == null;
    }
}
