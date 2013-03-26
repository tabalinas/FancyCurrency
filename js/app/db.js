(function(app) {

    app.db = {
        Currencies: [
            new app.models.Currency({ name: "Australian Dollar", ticker: "AUD" }),
            new app.models.Currency({ name: "Brazilian Real", ticker: "BRL" }),
            new app.models.Currency({ name: "Bulgarian Lev", ticker: "BGN" }),
            new app.models.Currency({ name: "Canadian Dollar", ticker: "CAD" }),
            new app.models.Currency({ name: "Chinese Yuan", ticker: "CNY" }),
            new app.models.Currency({ name: "Danish Krone", ticker: "DKK" }),
            new app.models.Currency({ name: "Euro", ticker: "EUR" }),
            new app.models.Currency({ name: "Great Britan Pound", ticker: "GBP" }),
            new app.models.Currency({ name: "Hongkong Dollar", ticker: "HKD" }),
            new app.models.Currency({ name: "Indian Rupee", ticker: "INR" }),
            new app.models.Currency({ name: "Japanese Yen", ticker: "JPY" }),
            new app.models.Currency({ name: "Mexican Peso", ticker: "MXN" }),
            new app.models.Currency({ name: "New Zealand dollar", ticker: "NZD" }),
            new app.models.Currency({ name: "Norwegian Krone", ticker: "NOK" }),
            new app.models.Currency({ name: "Russian Ruble", ticker: "RUB" }),
            new app.models.Currency({ name: "Singapore Dollar", ticker: "SGD" }),
            new app.models.Currency({ name: "South African Rand", ticker: "ZAR" }),
            new app.models.Currency({ name: "Swedish Krona", ticker: "SEK" }),
            new app.models.Currency({ name: "Swiss Franc", ticker: "CHF" }),
            new app.models.Currency({ name: "Turkish Lira", ticker: "TRY" }),
            new app.models.Currency({ name: "U.S. Dollar", ticker: "USD" }),
        ]
    };

})(app);
