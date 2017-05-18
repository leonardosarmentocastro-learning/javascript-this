/**
 * "this" é sempre referente a quem está invocando a função/objeto etc.
 * "this" só é setado quando você invoca de fato a função. Ele não existe antes disso(lembre-se do exemplo do jquery).
 */

let person = {
  firstName: "Penelope",
  lastName: "Barrymore",
  showFullName: function () {
    // Se refere ao contexto de quem está chamando esta função, no caso, o objeto "person".
    console.log(`${this.firstName} ${this.lastName}`);
  }
}

person.showFullName(); // "Penelope Barrymore"

let anotherPerson = {
  firstName: "Rohit",
  lastName: "Khan"
};

// O "apply" vai invocar a função "person.showFullName" substituindo o 'this' desta função
// pela variável "anotherPerson", que tem a mesma estrutura de objeto.
person.showFullName.apply(anotherPerson); // "Rohit Khan".
