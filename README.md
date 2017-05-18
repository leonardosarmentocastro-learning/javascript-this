# <funcao-a-ser-invocada>.apply()

Invoca(executa) uma determinada função passando um contexto(no caso, um `this`) da sua escolha.

No exemplo a seguir, vamos invocar a função `person.showFullName` utilizando o objeto `anotherPerson` como contexto, ao invés
de utilizar o próprio `this` de `person` como contexto, acarretando em nomes diferentes printados no console.

```javascript
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
```

# <referencia-da-funcao>.bind()

Utilizado no caso em que você está passando uma "referência de uma função" como callback para outra função, e dentro desta referência,
você utiliza o `this`, pensando que este `this` estará se referenciando ao contexto da onde a função de callback foi setada, porém, como o
`this` é aplicado referente a quem chama a função, o `this` acaba por tomar o contexto da função que está chamando o callback, e não o contexto
da onde o callback foi setado.

Mais complicadinho, não é? Mas dá um look no código a seguir.

```html
<!DOCTYPE html>
<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<meta charset=utf-8 />
<title>JS Bin</title>
</head>
<body>
  <button class="buttonError">Show Golfer: Non-Bind Example</button>
  <button class="buttonGood">Show Golfer: Bind Example</button>
  <script>
    var user = {
        data: [{
                name: "T. Woods",
                age: 37
            },
            {
                name: "P. Mickelson",
                age: 43
            }
        ],
        clickHandler: function(event) {
            var randomNum = ((Math.random() * 2 | 0) + 1) - 1; // random number between 0 and 1

            // This line is printing a random person's name and age from the data array
            console.log(this.data[randomNum].name + " " + this.data[randomNum].age);
        }

    }

    // Pass the user object's clickHandler method as a callback to the button's click method
    // The button is wrapped inside a jQuery $ wrapper, so it is now a jQuery object
    // And the output will be undefined
    $(".buttonError").click(user.clickHandler); // undefined

    // Here we tell that this "function reference" will use, as its context, the `user` object where the
    // callback was primarily set.
    var callback = user.clickHandler.bind(user);
    $(".buttonGood").click(callback);
  </script>

</body>
</html>
```

Um outro exemplo seria de usar o `this` quando o método em questão está atrelado a uma variável.
Eu particularmente achei isso uma loucura, hahaha.

```javascript
let data = [
  {name: 'Samantha', age: 12},
  {name: 'Alexis', age: 14}
];

let user = {
  data: [
    {name: "T. Woods", age: 37},
    {name: "P. Mickelson", age: 43}
  ],
  showData: function() {
    var randomNum = ((Math.random() * 2 | 0) + 1) - 1; // random number between 0 and 1

    // This line is printing a random person's name and age from the data array
    console.log(this.data[randomNum].name + " " + this.data[randomNum].age);
  }
};

// Assign the user.showData to a variable
let showUserData = user.showUserData;

// When we execute the showUserData function, the values printed to the console are from the global data array, not from the data array in the user object
showUserData(); // Samantha 12 (from the global data array)
```

**mindfuck.jpg**, né não? Hahaha.

Solução:
Utilizar o `.bind()` na referência da função para dizer qual contexto deve ser utilizado.
```javascript
// Bind the showData method to the user object​
let showUserData = user.showUserData.bind(user);

// Now we get the value from the user object, because the <em>this</em> keyword is bound to the user object
showUserData(); // P. Mickelson 43 (from the "user.data").
```

# Referencias

http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/
http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
