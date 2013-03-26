(function(app) {
    
    app.models.Currency = function(attrs) {
        angular.extend(this, {
            name: "",
            ticker: "",
            rate: 0,
            value: 0,
        }, attrs);
    };

    app.models.Currency.prototype = {

        formattedRate: function() {
            return this._formatNumber(this.rate);
        },

        formattedValue: function() {
            return this._formatNumber(this.value);
        },

        _formatNumber: function(number) {
            return number ? number.toFixed(2) : "-";
        }
    }

})(app);