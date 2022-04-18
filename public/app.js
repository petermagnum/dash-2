const socket = io();

let output = document.getElementById('output');



socket.on('server:message', function(data){
    output.innerHTML+=  `<p>
    <strong>ID: ${data.ID}</strong> | Hora: ${data.Hora}  | Fecha:${data.Fecha} 
    </p>`
    output.innerHTML+=  `<p>
    
    </p>`
});