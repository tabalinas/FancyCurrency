(function(app) {

    var CONVERT_SERVICE_URL = "https://rate-exchange.appspot.com/currency";

    app.ctrls.CurrencyConvertCtrl = function($scope) {
        var chart,
            currencies = [];

        angular.forEach(app.db.Currencies, function(currency) {
            currencies.push(new app.models.Currency(currency));
        });

        angular.extend($scope, {

            currencies: currencies,

            loading: false,

            convert: function() {
                var self = this,
                    valueToConvert = self.value,
                    currencyTicker = self.currency,
                    promises = [];

                self.loading = true;

                angular.forEach(self.currencies, function(currency) {
                    if(currency.ticker === currencyTicker) {
                        currency.rate = 1;
                        currency.value = parseFloat(valueToConvert);
                        return;
                    }

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
                        currency.rate = data.rate;
                        currency.value = data.v;
                    });

                    promises.push(promise);
                });

                $.when.apply(null, promises).done(function() {
                    self.loading = false;
                    self.setChartData();
                    self.$apply();
                });
            },

            setChartData: function() {
                var currencyTickers = [],
                    values = [];

                angular.forEach(this.currencies, function(currency) {
                    currencyTickers.push(currency.ticker);
                    values.push(currency.value);
                });

                chart.xAxis[0].setCategories(currencyTickers);
                chart.series[0].setData(values);
            },

            columns: [
                { field: "name", title: "Currency" },
                { field: "ticker", title: "Ticker" },
                { field: "rate", title: "Rate" },
                { field: "value", title: "Converted" }
            ],

            sorting: {
                field: "name",
                asc: true
            },

            columnClass: function(field) {
                return this.sorting.field === field ? "sorted" : "";
            },

            columnSortingPrefix: function(field) {
                if(this.sorting.field === field) {
                    return this.sorting.asc ? "↑" : "↓";
                }
            },

            setSorting: function(field) {
                var sorting = this.sorting;
                if(sorting.field === field) {
                    sorting.asc = !sorting.asc;
                } else {
                    sorting.field = field;
                    sorting.asc = true;
                }
            }
        });

        chart = new Highcharts.Chart({
            chart: {
                renderTo: "chart",
                type: "bar"
            },
            series: [{
                name: "Value",
                data: []
            }],
            title: {
                text: "Value in different currencies"
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
                    overflow: "justify"
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
            credits: { 
                enabled: false 
            }
        });
    };

})(app);