import { RegistroSonoroRepository } from "../repository/registrosSonoros.js";

export class registroSonoroController {

    static async getAll(req,res){
        const user = req.session.user;

        if(!user) {return res.send('fuera de aqui pesado!!!!!')}

        const model = await RegistroSonoroRepository.getAllRegister();
        return res.json(model)
    }

  static async create(req, res) {
    const user = req.session.user;
    const { nivelSonoro, lugar } = req.body;

    if (!user) {
      return res.send("no tienes permitido hacer esto!!!!!!!");
    }

    const result = {
      nivelSonoro,
      lugar,
      ...user,
    };

    const model = await RegistroSonoroRepository.createResgister({
      input: result,
    });

    return res.send(model);
  }


  static async getMyRegister(req,res){

    const user = req.session.user
    if(!user)return res.send('no')
    const model = await RegistroSonoroRepository.getMyRegister({ input: user.userName })
     return res.json(model)

  }
}
