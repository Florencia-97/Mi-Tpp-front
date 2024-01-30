export default class User {

    constructor({email, name, picture}) {
        this._email = email;
        this._name = name;
        this._picture = picture;
    }

    email() {
        return this._email;
    }

    name() {
        return this._name;
    }

    picture() {
        return this._picture;
    }

    defaultFullName() {
        return "Usuario Sin Nombre";
    }
}
