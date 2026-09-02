const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 Conexão com o Banco de Dados Supabase
const pool = new Pool({
  connectionString: 'postgresql://postgres:Projetogrupo12@db.xlfafzjdiodpryfwdzqb.supabase.co:5432/postgres' 
});

// 1. Listar filmes (com suporte a filtro nacional para a Jornada da Giovana)
app.get('/api/filmes', async (req, res) => {
  try {
    const isNacional = req.query.nacional === 'true';
    let query = 'SELECT * FROM Filmes';
    if (isNacional) {
      query += ' WHERE nacional = true';
    }
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar filmes' });
  }
});

// 2. Detalhes de um filme específico
app.get('/api/filmes/:id', async (req, res) => {
  try {
    const filmeId = req.params.id;
    const result = await pool.query('SELECT * FROM Filmes WHERE id = $1', [filmeId]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar filme' });
  }
});

// 3. Buscar sessões disponíveis para o filme selecionado
app.get('/api/sessoes', async (req, res) => {
  try {
    const filmeId = req.query.filmeId;
    const result = await pool.query('SELECT * FROM Sessoes WHERE filme_id = $1', [filmeId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar sessões' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
  console.log('🔌 Conectado ao banco de dados Supabase!');
});