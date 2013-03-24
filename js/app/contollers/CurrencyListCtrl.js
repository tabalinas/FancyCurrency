(function(app) {

    var CONVERT_SERVICE_URL = "http://rate-exchange.appspot.com/currency";

    app.ctrls.CurrencyListCtrl = function($scope, $http) {
        $scope.currencies = app.db.Currencies;
        
        $scope.convert = function() {
            var self = this,
                valueToConvert = self.value,
                currencyTicker = self.currency,
                promises = [];

            angular.forEach(self.currencies, function(currency) {
                var promise = $.ajax({
                    type: "GET",
                    url: CONVERT_SERVICE_URL,
                    dataType: "jsonp",
                    data: {
                        from: currencyTicker,
                        to: currency.ticker,
                        q: valueToConvert
                    }
                }).done(function(data) {
                    currency.price = data.rate;
                    currency.value = data.v;
                });

                promises.push(promise);
            });

            $.when.apply(null, promises).done(function() {
                self.$apply();
            });
        };
    };

})(app);