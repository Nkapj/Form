
express = require ('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/form', (req,res) => {
    const userForm = (req.body);

    const filePath = path.join(__dirname, 'data.json');
    let existData = [];
    if (fs.existsSync(filePath)) {
        existData = JSON.parse(fs.readFileSync(filePath, 'utf-8') );
    }
    existData.push(userForm);
    fs.writeFileSync(filePath, JSON.stringify(existData, null, 2));
    
    console.log('donnes reçues',userForm);
    res.status(201).json({ message: 'Form data received successfully!' });
})




app.get('/form', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    let userData = [];
    if (fs.existsSync(filePath)) {
        userData = JSON.parse(fs.readFileSync(filePath, 'utf-8') );
    }
    res.status(200).json(userData);
});



app.listen(3000, () => {
    console.log('Server is running on {PORT}');
});