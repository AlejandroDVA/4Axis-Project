"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const body_parser_1 = __importDefault(require("body-parser"));
const convertor_1 = require("./convertor");
const schemas_1 = __importDefault(require("./schemas"));
const historySchema_1 = __importDefault(require("./historySchema"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const uri = "mongodb+srv://admin:OT2O4X3qU6WO5Rgn@cluster0.rrn19fc.mongodb.net/?retryWrites=true&w=majority";
const app = (0, express_1.default)();
const port = 3000;
const axiosInstance = axios_1.default.create({
    httpsAgent: new https_1.default.Agent({ rejectUnauthorized: false })
});
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.post('/convert', async (req, res) => {
    const { date, value, user } = req.body;
    try {
        const url = `https://165.227.94.139/api/uf/${date}`;
        const { data, status } = await axiosInstance.get(url);
        const ufValue = (0, convertor_1.converterStringToNumber)(value);
        const valor = data.serie[0].valor;
        const responseCLP = (0, convertor_1.converterUF)(ufValue, valor);
        const result = {
            valor,
            responseCLP
        };
        res.status(status);
        res.json(result);
        saveValues(date, valor, responseCLP.toString(), user, ufValue.toString());
    }
    catch (error) {
        res.status(500).send('Error en la solicitud a la API');
    }
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const User = mongoose_1.default.model('User', schemas_1.default);
        const user = await User.find({ email: email, password: password });
        if (user.length == 0) {
            console.log(user);
            res.status(401);
            res.json(user);
        }
        else {
            console.log(user);
            res.status(200);
            res.json(user);
        }
    }
    catch (error) {
        res.status(500).send('Error en la solicitud a la base de datos');
    }
});
const saveValues = async (date, valor, responseCLP, user, ufValue) => {
    try {
        const History = mongoose_1.default.model('History', historySchema_1.default);
        const saveAction = new History({
            activityDate: date,
            user: user,
            originAmount: valor,
            convertionDate: new Date(),
            coinValue: ufValue,
            convertionAmount: responseCLP,
        });
        await saveAction.save();
        console.log("save success");
    }
    catch (error) {
        console.log("error");
    }
};
app.get('/history', async (req, res) => {
    try {
        const History = mongoose_1.default.model('History', historySchema_1.default);
        const response = await History.find();
        res.status(200);
        res.json(response);
    }
    catch (error) {
        res.status(500).send('Error en la solicitud a la base de datos');
    }
});
app.listen(port, async () => {
    await mongoose_1.default.connect(uri, { retryWrites: true, w: 'majority' });
    return console.log(`Express está escuchando en http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map