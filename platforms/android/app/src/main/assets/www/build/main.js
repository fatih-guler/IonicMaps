webpackJsonp([0],{

/***/ 110:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 110;

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 151;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl, geolocation) {
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.mapType = "Google";
        this.currentLat = 0;
        this.currentLng = 0;
    }
    // view her yüklendiğinde çağrılır
    HomePage.prototype.ionViewDidLoad = function () {
        this.showMapWithGoogle();
        //this.showMapWithYandex();
    };
    //STARt
    HomePage.prototype.showMapWithGoogle = function () {
        this.title = "Google Maps";
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log(resp.coords.latitude);
            console.log(resp.coords.longitude);
            var from = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            var directionsService = new google.maps.DirectionsService();
            var directionDisplay = new google.maps.DirectionsRenderer();
            var options = {
                center: from,
                zoom: 15,
                scrollwheel: false
            };
            var map = new google.maps.Map(document.getElementById('map'), options);
            map.setMapTypeId('hybrid');
            // map.setMapTypeId('terrain');
            directionDisplay.setMap(map);
            directionDisplay.setPanel(document.getElementById('directionsPanel'));
            var request = {
                location: from,
                radius: '500',
                types: ['pharmacy']
            };
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, function (results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        var marker = new google.maps.Marker({
                            map: map,
                            position: place.geometry.location
                        });
                        marker.addListener('click', function (e) {
                            console.log(e.latLng.lat());
                            console.log(e.latLng.lng());
                            var to = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
                            var request = {
                                origin: from,
                                destination: to,
                                travelMode: document.getElementById('travelModeLabel').innerText.toUpperCase()
                            };
                            directionsService.route(request, function (response, status) {
                                if (status == "OK") {
                                    directionDisplay.setDirections(response);
                                }
                            });
                        });
                    }
                }
            });
        }).catch(function (error) {
            console.log('Error getting location', error);
            return null;
        });
    };
    HomePage.prototype.showMapWithYandex = function () {
        this.title = "Yandex Maps";
        this.geolocation.getCurrentPosition().then(function (resp) {
            if (ymaps.Map) {
                var ymap, previousRoute;
                ymaps.ready(function () {
                    ymap = new ymaps.Map("map", {
                        center: [resp.coords.latitude, resp.coords.longitude],
                        zoom: 10,
                        controls: []
                        // controls: ['zoomControl', 'typeSelector',
                        //   'geolocationControl', 'trafficControl',
                        //   'fullscreenControl']
                    });
                    // Eczaneleri getirme
                    /// start
                    var searchControl = new ymaps.control.SearchControl({
                        options: {
                            float: 'right',
                            floatIndex: 100,
                            noPlaceMark: true,
                            provider: 'yandex#search'
                        }
                    });
                    // ** geoObjectsArray[i].geometry._coordinates[0] -> latitude
                    // ** geoObjectsArray[i].geometry._coordinates[1] -> longitude
                    ymap.controls.add(searchControl);
                    searchControl.search('eczane').then(function () {
                        // Eczaneler bir diziye atıldı
                        var geoObjectsArray = searchControl.getResultsArray();
                        //Eczaneler silindi, tekrar eklenemecek
                        searchControl.clear();
                        if (geoObjectsArray.length) {
                            console.log(geoObjectsArray);
                            for (var i = 0; i < geoObjectsArray.length; i++) {
                                // Harita üzerinde eczanelerin işaretlenmesi
                                var placemark = new ymaps.Placemark([geoObjectsArray[i].geometry._coordinates[0], geoObjectsArray[i].geometry._coordinates[1]], {
                                    balloonContent: geoObjectsArray[i].properties.get("name")
                                }, {
                                    preset: "islands#dotCircleIcon",
                                    iconColor: '#ff0000'
                                });
                                placemark.events.add('click', function (e) {
                                    var thisPlacemark = e.get('target');
                                    var to = [thisPlacemark.geometry._coordinates[0], thisPlacemark.geometry._coordinates[1]];
                                    ymaps.route([
                                        [resp.coords.latitude, resp.coords.longitude],
                                        to
                                    ]).then(function (route) {
                                        if (previousRoute != null) {
                                            ymap.geoObjects.remove(previousRoute);
                                        }
                                        previousRoute = route;
                                        ymap.geoObjects.add(route);
                                    }, function (error) {
                                        alert("Hata : " + error.status +
                                            ":" + error.message);
                                    });
                                });
                                ymap.geoObjects.add(placemark);
                            }
                        }
                    });
                });
                //// end
            }
            else {
                console.log("Harita yüklenemedi");
            }
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    HomePage.prototype.onChange = function (travelMode) {
        console.log(travelMode);
        document.getElementById("travelModeLabel").innerText = travelMode;
        console.log("label : " + document.getElementById("travelModeLabel").innerText);
    }; //Travel mode her değiştiğinde tetiklenecek
    HomePage.prototype.onChangeMaps = function (mapsType) {
        document.getElementById("map").innerHTML = "";
        document.getElementById("directionsPanel").innerHTML = "";
        if (this.mapType === "Yandex") {
            this.showMapWithYandex();
        }
        else {
            this.showMapWithGoogle();
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\fathig\source\repos\BBB_Mobile\ionic-maps v1\src\pages\home\home.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      {{title}}\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content id="content">\n\n  <label hidden id="travelModeLabel">Driving</label>\n\n  \n\n    <div class="travelMode">\n\n      <ion-select [(ngModel)]="travelMode" (ngModelChange)="onChange($event)" style="float:left;height:40px;width:100%; font-size:12px ;\n\n                    background-color :white;">\n\n        <ion-option selected value="Driving">Driving</ion-option>\n\n        <ion-option value="Walking">Walking</ion-option>\n\n        <ion-option value="Bicycling">Bicycling</ion-option>\n\n       <!-- <ion-option value="Transit">Transit</ion-option>-->\n\n      </ion-select>\n\n    </div>\n\n    <div class="changeMaps">\n\n      <ion-select [(ngModel)]="mapType" (ngModelChange)="onChangeMaps($event)" style="float:left;height:40px;width:100%; font-size:12px ;\n\n    background-color :white;">\n\n        <ion-option selected value="Google">Google Maps</ion-option>\n\n        <ion-option value="Yandex">Yandex Maps</ion-option>\n\n      </ion-select>\n\n    </div>\n\n   \n\n  <div id="map">\n\n\n\n  </div>\n\n  <div id="directionsPanel" style="width:100%;">\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\fathig\source\repos\BBB_Mobile\ionic-maps v1\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(220);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\fathig\source\repos\BBB_Mobile\ionic-maps v1\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\fathig\source\repos\BBB_Mobile\ionic-maps v1\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[196]);
//# sourceMappingURL=main.js.map