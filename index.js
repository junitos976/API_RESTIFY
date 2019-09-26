const restify = require('restify');

const errors = require('restify-errors');

const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});


var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'dbphp7'
    }
});


server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


server.listen(5000, function () {
    console.log('Rodando na porta: ', server.name, server.url);
});


//Rotas
server.post('/create', (req, res, next) => {

    knex('rest')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next)
});

server.get('/verificar/:id', (req, res, next) => {

    const { id } = req.params

    knex('rest')
        .where('id', id)
        .then((dados) => {
            if (!dados) return res.send(new errors.BadRequestError("Nda foi encontrado"))
            res.send(dados);
        }, next)

});


server.put('/atualizar/:id', (req, res, next) => {

    const { id } = req.params

    knex('rest')
        .where('id', id)
        .update(req.body)
        .then((dados) => {
            if (!dados) return res.send(new errors.BadRequestError("Nda foi encontrado"))
            res.send('dados atualizados');
        }, next)

});

server.del('/deletar/:id', (req, res, next) => {

    const { id } = req.params

    knex('rest')
        .where('id', id)
        .delete(req.body)
        .then((dados) => {
            if (!dados) return res.send(new errors.BadRequestError("Nda foi encontrado"))
            res.send('dados excluidos');
        }, next)

});

server.get('/verificarAll', (req, res, next) => {

    knex('rest')
        .then((dados) => {
            if (!dados) return res.send(new errors.BadRequestError("Nda foi encontrado"))
            res.send(dados);
        }, next)
});
