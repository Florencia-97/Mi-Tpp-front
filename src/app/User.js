export default class User {

    constructor({id, email, firstName, lastName, realStateName}) {
        this._id = id;
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
        this._realStateName = realStateName;
    }

    id(){
        return this._id;
    }

    email(){
        return this._email;
    }

    firstName(){
        return this._firstName;
    }

    lastName(){
        return this._lastName;
    }

    realStateName(){
        return this._realStateName;
    }

    fullName() {
        const fullName = (this._firstName + " " + this._lastName).replace(/\s\s+/g, ' ');
        return fullName || this.defaultFullName();
    }

    initials() {
        return this.fullName().split(" ").map(name => {
            if (name) {
                return name[0].toUpperCase();
            }
            return name;
        }).join("").slice(0, 2);
    }

    defaultFullName() {
        return "Usuario Sin Nombre";
    }
}
