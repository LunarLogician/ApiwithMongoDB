import mongoose from 'mongoose';
import validator from 'validator';

const studentschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    age: {
        type: Number,
        min: 12,
        validate(value) { // Changed from 'validator' to 'validate'
            if (value < 0) {
                throw new Error("Age cannot be negative");
            }
        }
    },
    course: {
        type: String,
        required: true,
    },
});

const Usercol = new mongoose.model('Usercol', studentschema);

export default Usercol;
