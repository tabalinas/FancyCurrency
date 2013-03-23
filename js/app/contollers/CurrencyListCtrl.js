(function(app) {

    app.ctrls.CurrencyListCtrl = function($scope) {
        $scope.currencies = app.db.Currencies;
    };

})(app);