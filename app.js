//MODULES NODE JS par npm
const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const fileupload = require("express-fileupload")
const expressSession = require("express-session")
const Mongostore = require("connect-mongo")
const connectFlash = require("connect-flash")
const methodeOverride = require("method-override")
const MomentHandler = require("handlebars.moment");
const Handlebars = require("handlebars");

// const morgan = require("morgan")



const app = express();

//PORT 3010
var PORT = process.env.PORT || 3020;
const http = require('http');
const server = http.Server(app);

//method override
app.use(methodeOverride("_method"));

//CONTROLLERS "Modules Perso"
//home
const homePageController = require("./controllers/homePage")
const accueilPageController = require("./controllers/accueilPage")


//ARTICLES
const bouteilleAddController = require("./controllers/bouteilles/bouteilleAdd")
const bouteillePostController = require("./controllers/bouteilles/bouteillePost")
const bouteilleDeleteController = require("./controllers/bouteilles/bouteilleDelete")
const bouteilleModifController = require("./controllers/bouteilles/bouteilleModif")


//USER
const userCreate = require("./controllers/user/userCreate")
const userRegister = require("./controllers/user/userRegister")
const userLogin = require("./controllers/user/userLogin")
const userLoginAuth = require("./controllers/user/userLoginAuth")
const userLogout = require("./controllers/user/userLogout")
const userMdpOubli = require("./controllers/user/userMdpOublie")
const userSendPasswordEmailController = require("./controllers/user/userSendPasswordEmail")
//reservation bouteilles
const reservationBouteille = require("./controllers/CompteUtilisateur/resaBouteille")
const mesReservations = require("./controllers/CompteUtilisateur/mesResasBouteilles")
//message utilisateur
const messageGetUser = require("./controllers/CompteUtilisateur/messageGetUser")
const messagePostUser = require("./controllers/CompteUtilisateur/messagePostUser")
//compte utilisateur
const compteGetUser = require("./controllers/CompteUtilisateur/compteGetUser")

//admin modif users
const getUser = require("./controllers/adminModifUser/adminGetUser")
const putUser = require("./controllers/CompteUtilisateur/comptePutUser")
const deleteUser = require("./controllers/adminModifUser/adminDeleteUserById")

// connection base de données
// mongoose.connect("mongodb://localhost:27017/cave-test", {
//     useNewUrlParser: true,
//     useCreateIndex: true
// })
const db = "mongodb+srv://frezer:camoun@cluster0-ghfyn.mongodb.net/test?retryWrites=true&w=majority"
// base de donné atlas en attente
// ajouter un admin a la main sur mongo atlas



mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connecter a la mongo atlas'))
    .catch(err => console.log(err));

const mongostore = Mongostore(expressSession)

app.use(connectFlash())
// app.use(morgan("dev"))
app.use(expressSession({
    secret: "securite",
    name: "biscuit",
    saveUninitialized: true,
    resave: false,
    store: new mongostore({
        mongooseConnection: mongoose.connection
    })

}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(fileupload())

//MIDDLEWARE
//pour verif q'un user est admin
const authAdmin = require("./middleware/authAdmin")
//pour  q'un user se connecte
const auth = require("./middleware/auth")
const redirectAuthSucess = require("./middleware/redirectAuthSucess")


//moment
MomentHandler.registerHelpers(Handlebars);

Handlebars.registerHelper("inc", function (value, options) {
    return parseInt(value) + 1;
});
Handlebars.registerHelper("dec", function (value, options) {
    return parseInt(value) - 1;
});


app.use(express.static("public"));

//ROUTE
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use("*", (req, res, next) => {
    res.locals.user = req.session.user;
    // if (res.locals.user)
    // console.log("isAdmin : ", res.locals.user);
    next()

})







// home
app.get("/", homePageController)

//Page d'accueil
app.get("/pagePrincipale", auth, accueilPageController)
app.get("/pagePrincipale/:pageNum", auth, accueilPageController)

//ARTICLES
app.get("/bouteilles/add", authAdmin, bouteilleAddController);
app.get("/bouteilles/add/:pageNum", authAdmin, bouteilleAddController);
app.post("/bouteilles/post/:pageNum", authAdmin, bouteillePostController);
app.post("/bouteilles/post/:pageNum/:id", authAdmin, bouteillePostController);
app.get("/bouteille/del/:id", authAdmin, bouteilleDeleteController);
app.get("/bouteille/modif/:pageNum/:id", authAdmin, bouteilleModifController);





// USERS

app.get("/user/create", redirectAuthSucess, userCreate);
app.post("/user/register", redirectAuthSucess, userRegister);
app.get("/user/login", redirectAuthSucess, userLogin);
app.post("/user/loginAuth", redirectAuthSucess, userLoginAuth);
app.get("/user/logout", userLogout);
app.get("/user/mdpoublie", userMdpOubli)
//nodeMailer
app.post("/user/mdpOublie", userSendPasswordEmailController)
//message utilisateur
app.get("/user/userMessage", messageGetUser);
app.post("/user/userMessage", messagePostUser);
//compte utilisateur
app.get("/user/userCompte", compteGetUser)
app.post("/user/userModifCompte", putUser)
//reservation d'une bouteille
app.get("/reservation/:bouteilleId", reservationBouteille)
app.get("/user/mesResas", mesReservations)


//ADMIN

//admin get user
app.get("/adminModifUser", authAdmin, getUser);






//admin delete user by id
app.route("/user/adminModifUser/:id")
    .get(authAdmin, deleteUser)
    .delete(authAdmin, deleteUser)






//ERROR404
app.use((req, res) => {
    res.render("error404")
})

server.listen(PORT, function () {
    console.log(`le serveur tourne sur ${PORT} et lancé à ${new Date().toLocaleString()}`);
});


// app.listen(3010, function () {
//     console.log(("le serveur est sur le port 3010"));

// })