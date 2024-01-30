import {FakeRequester, RemoteRequester} from "@eryxcoop/appyx-comm";
import SessionStore from "./SessionStore";
import LocalStorage from "./LocalStorage";
import AppAuthorizationManager from "./AppAuthorizationManager";
import Session from "./Session";
import UniApiClient from "../communication/UniApiClient";

export class App {

    constructor() {
        this._sessionStore = new SessionStore(new LocalStorage())
        this._session = this._sessionStore.load();
        this._client = null;
    }

    session() {
        return this._session;
    }

    loginUser(user, token) {
        this._session = new Session(user, token);
        this._sessionStore.store(this._session);
    }

    logoutUser() {
        this._session = new Session();
        this._sessionStore.remove();
    }

    isATeacher() {
        return false;
    }

    currentUser() {
        return this._session.user()
    }

    apiClient() {
        if (this._client === null) {
            this._setUpApiClient();
        }

        return this._client;
    }

    routes() {
        return {
            login: '/',
            home: '/app/home',
        }
    }


    "Privates"

    _setUpApiClient() {
        const requester = this._setUpRequester();
        this._client = new UniApiClient(requester);
    }

    _setUpRequester() {
        if (this._isUsingFakeApi()) {
            return new FakeRequester();
        }

        const remoteApiUrl = this._defineApiUrl();
        const authorizationManager = new AppAuthorizationManager(this);
        return new RemoteRequester(remoteApiUrl, authorizationManager);
    }

    _isUsingFakeApi() {
        return false;
    }

    _defineApiUrl() {
        return '/'
    };

}

export let app = new App();
