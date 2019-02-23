const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');


const app = express();
app.engine('hbs', expressHbs({layoutsDir : 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})); 
//app.engine('hbs', expressHbs()); //express engine 
app.set('view engine','hbs');
app.set('views','views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(shopRoutes);
app.use('/admin',adminData.routes);

app.use((req,res,next) => {
    res.status(404).render('4O4', {pageTitle : 'Page Not Found'});
    //res.status(404).sendFile(path.join(__dirname,'views','4O4.html'));
});

app.listen(3000);