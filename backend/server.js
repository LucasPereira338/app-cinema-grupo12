const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); 
app.use(express.json()); 

// 1. Listar filmes (com suporte a filtro nacional)
app.get('/api/filmes', (req, res) => {
    const isNacional = req.query.nacional === 'true';
    
    // Dados simulados para testar o funcionamento antes do Banco de Dados
    res.json([
        { id: 1, titulo: 'O Auto da Compadecida 2', nacional: true, avaliacao: 4.8 },
        { id: 2, titulo: 'Deadpool & Wolverine', nacional: false, avaliacao: 4.5 }
    ]);
});

// 2. Detalhes de um filme específico
app.get('/api/filmes/:id', (req, res) => {
    const filmeId = req.params.id;
    res.json({ id: filmeId, titulo: 'O Auto da Compadecida 2', sinopse: 'O retorno de João Grilo e Chicó.' });
});

// 3. Buscar sessões disponíveis para o filme selecionado
app.get('/api/sessoes', (req, res) => {
    const filmeId = req.query.filmeId;
    res.json([
        { id: 1, cinema: 'Cinema Central', horario: '2026-09-05 19:00', preco: 35.00 }
    ]);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Backend rodando na porta ${PORT}`);
});
