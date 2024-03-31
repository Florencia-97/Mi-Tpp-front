export default class User {

    constructor({email, name, picture, role, canOperate}) {
        this._email = email;
        this._name = name;
        this._picture = picture;
        this._role = role;
        this._canOperate = canOperate
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

    canOperate() {
        return this._canOperate;
    }

    role() {
        return this._role;
    }

    isStudent() {
        return this.role() === 'STUDENT';
    }

    isTeacher() {
        return this.role() === 'TEACHER';
    }

    isAdmin() {
        return this.role() === 'ADMIN';
    }
}
