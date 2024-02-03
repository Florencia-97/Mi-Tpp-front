export default class User {

    constructor({email, name, picture}) {
        this._email = email;
        this._name = name;
        this._picture = picture;
        this._role = 'STUDENT';
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

    setRole(role) {
        this._role = role;
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
