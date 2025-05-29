const alarmeMap = {
    "DB_0001": {
        id: 'DB_0001',
        descricao: 'MongoDB fora do ar.',
        ativo: false,
        ativacoes: [],
    }
};

module.exports = {
    async ativar(req, res) {
        const alarmeId = req.params.id;

        // Verificando se o alarme existe
        if (!alarmeMap[alarmeId]) {
            console.log(`Alarme ${alarmeId} não encontrado.`);
            return res.status(404).json({ msg: `Alarme não encontrado.` });
        }

        // Ativando o alarme
        alarmeMap[alarmeId].ativo = true;
        alarmeMap[alarmeId].ativacoes.push(new Date());

        console.log(`Alarme ${alarmeId} ativado!`);
        return res.status(200).json(alarmeMap[alarmeId]);
    },

    async desativar(req, res) {
        const alarmeId = req.params.id;

        // Verificando se o alarme existe
        if (!alarmeMap[alarmeId]) {
            console.log(`Alarme ${alarmeId} não encontrado.`);
            return res.status(404).json({ msg: `Alarme não encontrado.` });
        }

        // Desativando o alarme
        alarmeMap[alarmeId].ativo = false;
        alarmeMap[alarmeId].ativacoes = [];

        console.log(`Alarme ${alarmeId} desativado!`);
        return res.status(200).json(alarmeMap[alarmeId]);
    },

    async buscar(req, res) {
        const ativoQuery = req.query.ativo;

        // Se a query ativado for fornecida, filtra os alarmes
        if (ativoQuery) {
            const list = Object.values(alarmeMap).filter(alarme => {
                return String(alarme.ativo) === ativoQuery;
            });
            return res.status(200).json(list);
        }
        // Se não, retorna todos os alarmes
        return res.status(200).json(Object.values(alarmeMap));
    },
};
