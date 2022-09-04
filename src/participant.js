export default class Participant{
    constructor(id, name, age){
        this._id = id;
        this._name = name.toUpperCase();
        this._age = age; 
    }

    getId(){
        return this._id;
    }

    getName(){
        return this._name;
    }

    getAge(){
        return this._age;
    }

    setName(name){
        this._name = name;
    }

    setAge(age){
        this._age = age;
    }

    static readForm(){
        let inpId = document.querySelector('#id');
        let inpName = document.querySelector('#name');
        let inpAge = document.querySelector('#age');

        let id = inpId.value;
        let name = inpName.value;
        let age = Number(inpAge.value);

        if(id && name && age){
            
            inpId.value = "";
            inpName.value = "";
            inpAge.value = "";

            return new Participant(id, name, age);
        }

        return false;

    }
}