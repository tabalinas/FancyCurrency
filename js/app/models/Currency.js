(function(app) {
    
    app.models.Currency = function(attrs) {
        angular.extend(this, {
            name: "",
            ticker: "",
            price: 0,
            value: 0,
        }, attrs);
    };

})(app);