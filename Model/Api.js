
//DB
const { connection, hoy, generarToken} = require("./Db.js");

class Api{

    generateToken(req,res){

        let token = generarToken()
        let fecharegist = hoy()
        
        connection.query("insert into tb_tokens values (?,?)",[token,fecharegist],(err,result)=>{
            if (err) {
                res.json({response:"Ocurrió un error vuelve a intentarlo."})
            }else{
                res.json({response: token})
            }
        })
        

    }

    addTodo(req,res){
        const token = req.headers["authorization"];
        const todo = req.body["tarea"];
        const estado = "1"
        const fecharegist = hoy()

        if (todo.trim().length < 3) {
            res.json({response:"Tarea vacía."})
            return 
        }

        if (!token) {
            return res.status(401).json({ response: "Token no proporcionado." });
        }else{
            connection.query("select * from tb_tokens where token =?",[token],(err,result)=>{
                if (err) {
                    res.json({response:"Ocurrió un error vuelve a intentarlo."})
                }else{
                    if (result.length > 0) {
                        connection.query("insert into tb_todo values (null,?,?,?,?)",[token,todo,estado,fecharegist],(error,resultado)=>{
                            if (!error) {
                                res.json({response: "Tarea agregada"})
                            }
                        })
                    }else{
                        res.json({response:"Token inválido."})
                    }
                }
            })
        }

    }

    getTodo(req,res){
        const token = req.headers["authorization"];
        const estado = req.body["estado"]

        if (!token) {
            return res.status(401).json({ response: "Token no proporcionado." });
        }else{
            connection.query("select * from tb_tokens where token =?",[token],(err,result)=>{
                if (err) {
                    res.json({response:"Ocurrió un error vuelve a intentarlo."})
                }else{
                    if (result.length > 0) {
                        connection.query("select * from tb_todo where token=? and estado=?",[token,estado],(error,resultado)=>{
                            if (!error) {
                                //let resultado_ =""
                                res.json(resultado)
                                /*resultado.forEach(r=>{
                                    resultado_ = resultado_ + `{todo:'${r.id} - ${r.todo}'},`
                                })
                                res.json({response:resultado_})*/
                            }
                        })
                    }else{
                        res.json({response:"Token inválido."})
                    }
                }
            })
        }
    }

    updateTodo(req,res){
        const token = req.headers["authorization"];
        const todos = req.body["tareas"];
        const estado = req.body["estado"];

        const fecharegist = hoy()

        if (!token) {
            return res.status(401).json({ response: "Token no proporcionado." });
        }else{
            connection.query("select * from tb_tokens where token =?",[token],(err,result)=>{
                if (err) {
                    res.json({response:"Ocurrió un error vuelve a intentarlo."})
                }else{
                    if (result.length > 0) {

                        todos.split("\n").forEach(todo => {
                            connection.query("update tb_todo set estado=? where todo = ? and token = ?",[estado,todo,token])
                        });
                       
                    }else{
                        res.json({response:"Token inválido."})
                    }
                }
            })
        }

    }



}

module.exports = Api