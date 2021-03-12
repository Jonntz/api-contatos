const uuidv4 = require('uuid');

module.exports = app => {
    const listaContatosDB = app.data.listaContatos;
    const controller = {};
    
    const { listaContatos: listaContatosMock } = listaContatosDB;

    controller.listListaContatos = (req, res) => {res.status(200).json(listaContatosDB)};

    controller.saveListaContatos = (req, res) => {
        listaContatosMock.data.push({
            id: uuidv4(),
            nome: req.body.nome,
            celular: req.body.celular,
            telefone: req.body.telefone,
            email: req.body.email
        });

        res.status(201).json(listaContatosMock);
    };

    controller.removeListaContatos = (req, res) => {

        const { contatoId } = req.params;
        const foundListIndex = listaContatosMock.data.findIndex((contato) => contato.id === contatoId);

        if (foundListIndex == -1) {
            res.status(404).json({
                message: "Cliente não encontrado na base",
                success: false,
                listaContatos: listaContatosMock
            });
        } else {
            listaContatosMock.data.splice(foundListIndex, 1);
            res.status(200).json({
                message: "Cliente encontrado com sucesso",
                success: true,
                listaContatos: listaContatosMock
            });
        }
    };

    controller.updateContatos = (req, res) => {
        const { contatoId } = req.params;
        const foundListIndex = listaContatosMock.data.findIndex((contato) => contato.id === contatoId);

        if (foundListIndex == -1) {
            res.status(404).json({
                message: "Cliente não encontrado na base",
                success: false,
                listaContatos: listaContatosMock
            });

        } else {

            const novoContato = {
                id: contatoId,
                nome: req.body.nome,
                celular: req.body.celular,
                telefone: req.body.telefone,
                email: req.body.email
            };
            
            listaContatosMock.data.splice(foundListIndex, 1, novoContato);

            res.status(200).json({
                message: "Cliente encontrado com sucesso!",
                success: true,
                listaContatos: listaContatosMock
            });
        }

    }
  
    return controller;
  }