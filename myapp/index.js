const express = require('express');
const path = require('path') ;
const app = express()

// configuration du moteur de modele
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))


// middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')))


// Middleware personnalisé pour vérifier les heures ouvrables
app.use((req, res, next) => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send('L\'application est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
    }
});

// definition des routes 
app.get('/', (req,res)=>{
    res.render('page_accueil' )
})

app.get('/nosServices', (req,res)=>{
    res.render('nosServices' )
})

app.get('/contactezNous', (req,res)=>{
    res.render('contactezNous' )
})


//ecoute au port 3001
app.listen(3001, () => {
    console.log(`attente de requete au port 3001`)
})

