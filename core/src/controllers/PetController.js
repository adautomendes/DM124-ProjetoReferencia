const Pet = require(`../models/Pet`);

module.exports = {
    async inserir(req, res) {
        const petRequest = req.body;

        // Testando se já existe um Pet com o mesmo nome
        // Equivalente a 'SELECT * FROM pet WHERE nome = pet.nome'
        const petExistente = await Pet.findOne({ nome: petRequest.nome });

        if (petExistente) {
            console.log(`${petExistente.nome} já existe.`);
            // Retornando 200 pois nada foi inserido.
            return res.status(200).json(petExistente);
        }

        const pet = await Pet.create({
            nome: petRequest.nome,
            raca: petRequest.raca,
            idade: petRequest.idade
        });

        console.log(`${pet.nome} criado!`);
        // Retornando 201 pois um novo recurso foi inserido.
        return res.status(201).json(pet);
    },

    async buscar(req, res) {
        const nomeQuery = req.query.nome;
        let pets = [];

        if (nomeQuery) {
            pets = await Pet.find({ nome: nomeQuery });
        } else {
            pets = await Pet.find();
        }

        console.log(`${pets.length} pets encontrados!`);

        return res.status(200).json(pets);
    },
};

