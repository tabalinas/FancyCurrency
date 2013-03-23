(function(app) {
    
    app.models.Currency = function(config) {
        this.name = "";
        this.ticker = "";
        this.price = 0;
        this.value = 0;

        angular.extend(this, config);
    };

})(app);