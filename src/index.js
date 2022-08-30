const express = require('express');
const app = express();
const routes = require('./routes/auth.routes');

app.set('port', 3000);
app.use(express.json());

app.use('/auth', routes);

app.listen(app.get('port'), () => {
    console.log('port', app.get('port'))
})