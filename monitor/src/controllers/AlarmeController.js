const alarmeMap = {
    "DB0001": {
        id: "DB0001",
        descricao: "MongoDB está fora do ar.",
        ativo: false,
        ativacoes: []
    }
}

module.exports = {
    alterar(req, res) {
        const { id, acao } = req.params;

        if (acao === 'ativar') {
            alarmeMap[id].ativo = true;
            alarmeMap[id].ativacoes.push(new Date());
        }

        if (acao === 'desativar') {
            alarmeMap[id].ativo = false;
            alarmeMap[id].ativacoes = [];
        }

        return res.status(200).json(alarmeMap[id]);
    },

    buscar(req, res) {
        const { ativo } = req.query;

        if (ativo) {
            const list = Object.values(alarmeMap).filter(alarme => {
                return String(alarme.ativo) === ativo;
            });
            return res.status(200).json(list);
        }

        return res.status(200).json(Object.values(alarmeMap));
    },

    validaAlarme(req, res, next) {
        const { id } = req.params;

        if (!alarmeMap[id]) {
            return res.status(404).json({
                codigo: 'MON0001',
                msg: 'Alarme não encontrado'
            });
        } else {
            next();
        }
    }
}