const Pet = require(`../models/Pet`);

module.exports = {
    async insert(req, res) {
        const petRequest = req.body;

        // Testando se já existe um Pet com o mesmo nome
        // Equivalente a 'SELECT * FROM pet WHERE nome = pet.nome'
        const petExisting = await Pet.findOne({ name: petRequest.name });

        if (petExisting) {
            console.log(`${petExisting.name} already exists.`);
            // Retornando 200 pois nada foi inserido.
            return res.status(200).json(petExisting);
        }

        const pet = await Pet.create({
            name: petRequest.name,
            breed: petRequest.breed,
            age: petRequest.age
        });

        console.log(`${pet.name} created!`);
        // Retornando 201 pois um novo recurso foi inserido.
        return res.status(201).json(pet);
    },

    async search(req, res) {
        const nameQuery = req.query.name;
        let pets = [];

        if (nameQuery) {
            pets = await Pet.find({ name: nameQuery });
        } else {
            pets = await Pet.find();
        }

        console.log(`${pets.length} pets found!`);

        return res.status(200).json(pets);
    },
};

