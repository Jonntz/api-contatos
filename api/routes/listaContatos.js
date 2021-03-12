module.exports = app => {
    const controller = app.controllers.listaContatos;
  
    app.route('/api/v1/lista-contatos')
        .get(controller.listListaContatos)
        .post(controller.saveListaContatos);

    app.route('/api/v1/lista-contatos/:contatoId')
        .delete(controller.removeListaContatos)
        .put(controller.updateContatos);
  }