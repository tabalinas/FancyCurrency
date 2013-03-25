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
                self.renderChart()
            });
        };

        $scope.renderChart = function() {
            var series = [];

            angular.forEach(this.currencies, function(currency) {
                series.push({
                    name: currency.ticker,
                    data: [currency.value]
                });
            });

            $('#chart').highcharts({
                chart: {
                    type: 'bar'
                },
                series: series,
                title: {
                    text: 'Value in different currencies'
                },
                xAxis: {
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    formatter: function() {
                        return "<b>" + this.series.name + "</b>: " + this.y.toFixed(2);
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                                return this.y.toFixed(2);
                            }
                        }
                    }
                },
                credits: { enabled: false }
            });
        };
    };

})(app);