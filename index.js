const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

app.get('/', function (request, response) {
    return response.json({ message: "Api Mercado Livre" });
});

app.post('/token', async function (req, res) {
    /* Api para gerar o primerio token */
    const body = new URLSearchParams({
        grant_type: 'authorization_code', /* Definir o tipo para o request */
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: process.env.CODE,
        redirect_uri: process.env.REDIRECT_URI,
    });

    const url = "https://api.mercadolibre.com/oauth/token";
    const headers = {
        "accept": "application/json",
        "content-type": "application/x-www-form-urlencoded",
    };

    try {
        const apiResponse = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body.toString(),
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            return res.status(apiResponse.status).json(errorData);
        }

        const data = await apiResponse.json();
        console.log('Access Token: ', data);

        return res.json(data);
    } catch (error) {
        console.error('Erro: ', error);
        return res.status(500).json({ error: 'Erro ao fazer a requisição para a API' });
    }
});

app.post('/tokenGenerate', async function (req, res) {
    /* Api para gerar token a partir do refresh token */
    const body = new URLSearchParams({
        grant_type: 'refresh_token', /* Definir o tipo para o request */
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: process.env.REFRESH_TOKEN,
    });

    const url = "https://api.mercadolibre.com/oauth/token";
    const headers = {
        "accept": "application/json",
        "content-type": "application/x-www-form-urlencoded",
    };

    try {
        const apiResponse = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body.toString(),
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            return res.status(apiResponse.status).json(errorData);
        }

        const data = await apiResponse.json();
        console.log('Access Token: ', data);

        return res.json(data);
    } catch (error) {
        console.error('Erro: ', error);
        return res.status(500).json({ error: 'Erro ao fazer a requisição para a API' });
    }
});

app.listen(8888, function (error) {
    if (error) {
        console.log(`Erro ao iniciar o servidor: ${error}`);
    }

    console.log(`Servidor rodando na porta 8888`);
});
