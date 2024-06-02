var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

const dbURI = 'mongodb://127.0.0.1:27017/list';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
});

var db = mongoose.connection;
db.on('error', (err) => {
    console.error("Error in connecting to the Database:", err);
});
db.once('open', () => {
    console.log("Connected to Database");
});

app.post("/add", (req, res) => {
    var category_select = req.body.category_select;
    var amount_input = req.body.amount_input;
    var info = req.body.info;
    var date_input = req.body.date_input;

    var data = {
        "Category": category_select,
        "Amount": amount_input,
        "Info": info,
        "Date": date_input
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).send({ message: "Error inserting record" });
        }
        console.log("Record Inserted Successfully");
        return res.status(200).send({ message: "Record Inserted Successfully" });
    });
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('index.html');
}).listen(5000, () => {
    console.log("Listening on port 5000");
});