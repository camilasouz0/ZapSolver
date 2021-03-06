const mathsteps = require('mathsteps');
const mathzap = require('@open-wa/wa-automate');
const math = require('mathjs');

mathzap.create().then(client => start(client));

function start(client) {
    client.onMessage(async message => {
        if (message.body) {
            const equa = message.body.toLowerCase()
            
            const steps = mathsteps.solveEquation(equa.replace(/\s{2,}/g, ''));
            var resultado, passo = 1
            const resEqua = steps.map(step => {
                resultado = ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, PASSO: "+ passo++ +" ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\n*Equação:* " + step.oldEquation.ascii() + "\n\n*Aplicando-se:* " + step.changeType + "\n\n*Resultado:* " + step.newEquation.ascii() + "\n\n"
                return resultado
            })
            await client.sendText(message.from, String(resEqua))

            if (resEqua == '') {
                const tipo = message.body.toLowerCase()
                const steps = mathsteps.simplifyExpression(tipo.replace(/\s{2,}/g, ''));
                var resultado, passo = 1
                const res = steps.map(step => {
                    resultado = ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, PASSO: "+ passo++ +" ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\n*Expressão:* " + step.oldNode.toString() + "\n\n*Aplicando-se:* " + step.changeType + "\n\n*Resultado:* " + step.newNode.toString() + "\n\n"
                    return resultado
                })
                    client.sendText(message.from, String(res))
                    
                    if(String(res) == ''){
                        const res2 = math.parse(tipo)
                    console.log(res2)
    
                    let scope = {
                        x:1 
                    } 
                    client.sendText(message.from, '*Resultado:* ' + String(res2.eval(scope))) 
                    }  
            }


        }
    });
} 