const alarmMap = {
    "DB_0001": {
        id: 'DB_0001',
        description: 'MongoDB service unavailable.',
        raised: false,
        activations: [],
    }
};

module.exports = {
    async raise(req, res) {
        const alarmId = req.params.id;

        // Verificando se o alarme existe
        if (!alarmMap[alarmId]) {
            console.log(`Alarm ${alarmId} not found.`);
            return res.status(404).json({ msg: `Alarm not found.` });
        }

        // Ativando o alarme
        alarmMap[alarmId].raised = true;
        alarmMap[alarmId].activations.push(new Date());

        console.log(`Alarm ${alarmId} activated!`);
        return res.status(200).json(alarmMap[alarmId]);
    },

    async cease(req, res) {
        const alarmId = req.params.id;

        // Verificando se o alarme existe
        if (!alarmMap[alarmId]) {
            console.log(`Alarm ${alarmId} not found.`);
            return res.status(404).json({ msg: `Alarm not found.` });
        }

        // Desativando o alarme
        alarmMap[alarmId].raised = false;
        alarmMap[alarmId].activations = [];

        console.log(`Alarm ${alarmId} deactivated!`);
        return res.status(200).json(alarmMap[alarmId]);
    },

    async search(req, res) {
        const raisedQuery = req.query.raised;

        // Se a query ativado for fornecida, filtra os alarmes
        if (raisedQuery) {
            const list = Object.values(alarmMap).filter(alarm => {
                return String(alarm.raised) === raisedQuery;
            });
            return res.status(200).json(list);
        }
        // Se não, retorna todos os alarmes
        return res.status(200).json(Object.values(alarmMap));
    },
};
