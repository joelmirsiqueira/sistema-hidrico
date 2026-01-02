import swaggerJSDoc from "swagger-jsdoc";


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentação da API do Sistema Hidrico',
            description: 'Documentação das rotas da API do Sistema Hidrico',
            version: '1.0.0',
        },
    },
    apis: ['./routers/routers.js', './routers/usuario.router.js']
}

const documentacao = swaggerJSDoc(options);

export default documentacao;