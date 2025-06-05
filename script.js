class Animal {
    constructor (nom, espece, age)
    {
        this.nom = nom;
        this.espece = espece;
        this.age = age;
    }
}

const animaux = new Animal("Loulou", "Chien", 5);

//console.log(animaux);


class Chien extends Animal { // Définition de la classe Chien qui hérite de la classe Animal 
    constructor (nom, espece, age, race) {
        super(nom, espece, age); // Appel du constructeur de la classe parente Animal
        this.race = race;
    }  
}
const clebard = new Chien("Loulou", "Chien", 5, "Labrador");
//console.log(clebard);



class user {
    constructor (nom, prenom, age)
    {
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
    }
    afficherNomComplet() {
        return `${this.prenom} ${this.nom}`;
    }
    afficherAge = () => {
        return this.age;
    }


}
const utilisateur = new user("Dupont", "Jean", 30);
console.log(utilisateur.afficherNomComplet());
console.log(utilisateur.afficherAge());