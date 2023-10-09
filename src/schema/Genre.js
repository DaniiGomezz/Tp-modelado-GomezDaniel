import { Schema, model } from "mongoose";

const GenreSchema = new Schema({
    nameGenre: { type: String, required: true }
}, {
    timestamps: true
})

export const Genre = model("Genre", GenreSchema);