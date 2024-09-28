import express from 'express';
import path, { dirname } from 'path'; // Import dirname
import { fileURLToPath } from 'url';
import mongoose from '../routs/conn.js';
import Usercol from '../models/students.js';

const router =new express.Router(); 

// Middleware to parse JSON and URL-encoded bodies
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
if (!Usercol) {
    console.error('Usercol model is not imported correctly');
} else {
    console.log('Usercol model imported successfully:', Usercol);
}
// GET all students
router.get('/students', (req, res) => {
res.sendFile("/home/zubair/Downloads/NewProject/public/index.html");

});

// GET student by name
router.get("/students/:name", (req, res) => {
    const newname = req.params.name;
    Usercol.find({ name: newname }).then((data) => {
        if (!data || data.length === 0) {
            return res.status(404).send("No student found with this name");
        }
        console.log("Data fetched successfully");
        res.send(data);
    }).catch((e) => {
        console.error('Error fetching data:', e);
        res.status(500).send("Failed to fetch data");
    });
});

router.post('/students', (req, res) => {
    console.log('Request body:', req.body); 
    const User = new Usercol(req.body);
    User.save()
        .then(() => {
            res.send("Data saved successfully");
        })
        .catch((e) => {
            console.error('Error saving data:', e);
            res.status(500).send("Failed to save data");
        });
});

// PATCH update student by name
router.patch("/students/:name", (req, res) => {
    const newname = req.params.name; 
    const updateFields = {
        email: req.body.email, 
        course: req.body.course 
    };

    Usercol.findOneAndUpdate(
        { name: newname }, 
        updateFields, 
        { new: true } 
    )
    .then((data) => {
        if (!data) {
            return res.status(404).send("No student found with this name");
        }
        console.log("Data updated successfully");
        res.send(data); 
    })
    .catch((e) => {
        console.error('Error updating data:', e);
        res.status(500).send("Failed to update data");
    });
});

// DELETE a student by name
router.delete('/students/:name', (req, res) => {
    const newname = req.params.name;
    Usercol.findOneAndDelete({ name: newname }).then((data) => {
        if (!data) {
            return res.status(404).send("No student found with this name");
        }
        console.log("Data deleted successfully");
        res.send(data);
    }).catch((e) => {
        console.error('Error deleting data:', e);
        res.status(500).send("Failed to delete data");
    });
});

// DELETE all students
router.delete("/students", (req, res) => {
    Usercol.deleteMany({})
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).send("No students found to delete");
            }
            res.send("All student records deleted successfully");
        })
        .catch((e) => {
            console.error('Error deleting students:', e.message);
            res.status(500).send("Failed to delete students");
        });
});

export default router;
