const path = require('path')
const { contacts } = require('../models')

exports.getContact = async (req, res) => {
    try {
        const response = await contacts.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

exports.saveContact = (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const name = req.body.title;
    const age = req.body.age;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await contacts.create({
                name: name,
                age: age,
                image: fileName,
                url: url,
                created_date: Date.now(),
                updated_date: Date.now(),
            });
            res.status(201).json({ msg: "contact Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    })

}

