const { Schema, model } = require(`mongoose`);

const PetSchema = new Schema(
    {
        name: { type: String, required: true },
        breed: { type: String, required: true },
        age: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = model(`Pet`, PetSchema);

