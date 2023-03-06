require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


require("./database/Connect");
require('./PassPort/bearer');

app.use((err,req,res,next)=>{
    res.status(422).send({error:err.message})
});

const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authentificat.Route')
const livreRoute = require('./routes/livresRoute')
const categorieRoute = require('./routes/categorieRoute')
const countRoute = require('./routes/count')








app.use('/api',userRoute);
app.use('/api',authRoute );
app.use('/api',livreRoute );
app.use('/api',categorieRoute);
app.use('/api',countRoute);







const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}!`));