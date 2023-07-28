import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import axios from 'axios'

const app = express();
app.use(express.json()); // Habilitar soporte para la lectura de datos de tipo JSON
dotenv.config(); // Usar variables de entorno

// Configurar CORS
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {

        if (dominiosPermitidos.indexOf(origin) !== -1) {

            // El origen de la petición está permitido
            callback(null, true);

        } else {

            callback(new Error('No permitido por CORS'));

        }

    }
}

// Indicarle a la app que use las opciones especificadas de CORS
app.use(cors(corsOptions));

app.use('/api/:categoria/:pagina', async (req, res) => {

    const { categoria, pagina } = req.params;

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&page=${pagina}&apiKey=${process.env.NEWS_API_KEY}`;
    const { data } = await axios(url);
    res.json(data);

})

const port = process.env.PORT || 4000;

app.listen(port, () => {

    console.log(`Servidor funcionando en el puerto ${port}`);

});