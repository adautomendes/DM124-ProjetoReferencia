const Pet = require('../models/Pet');

module.exports = {
    /**
    POST http://localhost:3000/pet
    {
        "nome": "Rex",
        "raca": "Boxer",
        "idade": 22
    }
    */
    async inserir(req, res) {
        const { nome, raca, idade } = req.body;

        const petExistente = await Pet.findOne({ nome });

        if (petExistente) {
            return res.status(200).json(petExistente);
        }

        const petCriado = await Pet.create({
            nome: nome,
            raca: raca,
            idade: idade
        });

        return res.status(201).json(petCriado);
    },

    async atualizar(req, res) {
        const { nome } = req.params;
        const { idade } = req.body;

        // UPDATE Pet SET idade = XX WHERE NOME = XX
        const resUpdate = await Pet.updateOne({ nome }, { idade });

        if (resUpdate.modifiedCount === 1) {
            const petAtualizado = await Pet.find({ nome });
            return res.status(200).json(petAtualizado[0]);
        } else {
            return res.status(404).json({
                codigo: 'PET0002',
                msg: `Pet com nome '${nome}' não encontrado.`
            });
        }
    },

    /**
    GET http://localhost:3000/pet
    */
    async buscar(req, res) {
        // Spread operator
        let queryParams = { ...req.query };
        let petList = await Pet.find(queryParams);

        return res.status(200).json({
            count: petList.length,
            petList
        });
    },

    async excluir(req, res) {
        const { nome } = req.params;

        let petList = await Pet.find({ nome });

        if (petList.length > 0) {
            await Pet.deleteOne({ nome });
            return res.status(204).json();
        } else {
            return res.status(404).json({
                codigo: 'PET0002',
                msg: `Pet com nome '${nome}' não encontrado.`
            });
        }

    },

    validaPet(req, res, next) {
        const { idade } = req.body;

        if (idade < 0 || idade > 100) {
            return res.status(400).json({
                codigo: 'PET0001',
                msg: 'Idade do pet inválida.'
            });
        } else {
            next();
        }
    }
}