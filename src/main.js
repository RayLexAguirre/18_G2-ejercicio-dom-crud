import Participant from './participant.js'
import Registry from './registry.js'

class App{ 
    constructor(){
        this._registry = new Registry();
        let btnRegister = document.querySelector('#btnRegister');
        btnRegister.addEventListener('click', this._addParticipant);
    }

    _addParticipant = () => {
        let participant = Participant.readForm();

        if(participant === false){
            Swal.fire('Error', 'Todos los campos son requeridos', 'error');
            return;
        }

        let added = this._registry.add(participant);

        if(added === false){
            Swal.fire('Error', 'Participante ya Registrado', 'error');
            return;
        }

        Swal.fire('Correcto', 'Se agregó un nuevo participante', 'success');
    }
}

new App()