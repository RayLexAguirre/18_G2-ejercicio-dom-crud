export default class registry{
    constructor(){
        this._registry = new Array();
        this._table = document.querySelector('#participants');
    }

    add(participant){
        let pos = this._find(participant);

        if(pos >= 0){
            return false;
        }

        this._show(participant);
        this._registry.push(participant);
  
        return true;
    }

    _show(participant){
        let row = this._table.insertRow(-1);

        let colId = row.insertCell(0);
        let colName = row.insertCell(1);
        let colAge = row.insertCell(2);
        let colActions = row.insertCell(3);

        row.setAttribute('id', `row${participant.getId()}`);

        colId.setAttribute('id', `colId${participant.getId()}`);
        colName.setAttribute('id', `colName${participant.getId()}`);
        colAge.setAttribute('id', `colAge${participant.getId()}`);
        colActions.setAttribute('id', `colActions${participant.getId()}`);

        colId.innerHTML = participant.getId();
        colName.innerHTML = participant.getName();
        colAge.innerHTML = participant.getAge();

        this._addActionButtons(colActions, participant);
    }

    _addActionButtons(column, participant){
        let btnUpdate = document.createElement('input')
        let btnDelete = document.createElement('input')

        btnUpdate.setAttribute('type', 'button');
        btnUpdate.setAttribute('value', 'Modificar');
        btnUpdate.setAttribute('id', `btnU${participant.getId()}`);

        btnDelete.setAttribute('type', 'button');
        btnDelete.setAttribute('value', 'Eliminar');
        btnDelete.setAttribute('id', `btnD${participant.getId()}`);

        btnUpdate.addEventListener('click', () =>{
            this._onUpdate(participant);
        })

        btnDelete.addEventListener('click', () =>{
            this._onDelete(participant);
        });

        column.appendChild(btnUpdate);
        column.appendChild(btnDelete);
    }

    _onDelete(participant){
        //borrar de la tabla 
        let row = document.querySelector(`#row${participant.getId()}`);
        row.remove();

        //borrar del vector
        let pos = this._find(participant);
        this._registry.splice(pos, 1);

        console.log(this._registry);
    }

    _onUpdate(participant){
        let colName = document.querySelector(`#colName${participant.getId()}`);
        let colAge = document.querySelector(`#colAge${participant.getId()}`);
        
        colName.innerHTML = '';
        colAge.innerHTML = '';

        let inpName = document.createElement('input');
        let inpAge = document.createElement('input');

        inpName.setAttribute('type', 'text');
        inpName.setAttribute('size', '35');
        inpName.setAttribute('value', participant.getName());
        inpName.setAttribute('id', `inpName${participant.getId()}`);

        inpAge.setAttribute('type', 'number');
        inpAge.setAttribute('value', participant.getAge());
        inpAge.setAttribute('id', `inpAge${participant.getId()}`);


        colName.appendChild(inpName);
        colAge.appendChild(inpAge);

        this._addUpdateCancelButtons(participant);
    }

    _addUpdateCancelButtons(participant){
        let colActions = document.querySelector(`#colActions${participant.getId()}`);

        colActions.innerHTML = '';

        let btnSave = document.createElement('input');
        let btnCancel = document.createElement('input');

        btnSave.setAttribute('type', 'button');
        btnSave.setAttribute('value', 'Grabar');
        btnSave.setAttribute('id', `btnS${participant.getId()}`);

        btnCancel.setAttribute('type', 'button');
        btnCancel.setAttribute('value', 'Cancelar');
        btnCancel.setAttribute('id', `btnC${participant.getId()}`);

        btnSave.addEventListener('click', () => {
            this._onSave(participant);
        });

        btnCancel.addEventListener('click', () => {
            this._onCancel(participant);
        });

        colActions.appendChild(btnSave);
        colActions.appendChild(btnCancel);
    

    }

    _onCancel(participant) {
        let colName = document.querySelector(`#colName${participant.getId()}`);
        let colAge = document.querySelector(`#colAge${participant.getId()}`);
        let colActions = document.querySelector(`#colActions${participant.getId()}`);

        colName.innerHTML = participant.getName();
        colAge.innerHTML = participant.getAge();
        colActions.innerHTML = '';

        this._addActionButtons(colActions, participant);

        console.log(participant);
        console.log(this._registry);
    }
    
    _onSave(participant){
        let name = document.querySelector(`#inpName${participant.getId()}`).value;
        let age = document.querySelector(`#inpAge${participant.getId()}`).value;

        participant.setName(name.toUpperCase());
        participant.setAge(Number(age));

        this._onCancel(participant);

    }

    _find(participant){
        let pos = this._registry.findIndex((p) => {
            if(p.getId() === participant.getId()){
                return true;
            }

            return false;
        });

        return pos;
    }
}