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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var HomePage = (function () {
    function HomePage(navCtrl, geolocation) {
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.mapType = "Google";
        this.position = undefined;
    }
    // view her yüklendiğinde çağrılır
    HomePage.prototype.ionViewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.position == undefined)) return [3 /*break*/, 2];
                        console.log("loooking for coords");
                        return [4 /*yield*/, this.getCurrentPosition()
                                .then(function (coords) {
                                _this.position = coords;
                            })
                                .catch(function (err) { return console.log(err); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.showMapWithGoogle();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.showMapWithGoogle = function () {
        this.title = "Google Maps";
        var origin = new google.maps.LatLng(this.position.latitude, this.position.longitude);
        var directionsService = new google.maps.DirectionsService();
        var directionDisplay = new google.maps.DirectionsRenderer();
        // map in ilk açıldığındaki konumu
        var options = {
            center: origin,
            zoom: 15,
            scrollwheel: false
        };
        var map = new google.maps.Map(document.getElementById('map'), options);
        map.setMapTypeId('hybrid');
        // map.setMapTypeId('terrain');
        directionDisplay.setMap(map);
        directionDisplay.setPanel(document.getElementById('directionsPanel'));
        //Konuma yakın olan eczaneleri bulmak için bir istek oluşturulur
        //Desteklenen diğer yerler için; https://developers.google.com/places/web-service/supported_types
        var request = {
            location: origin,
            radius: '500',
            types: ['pharmacy']
        };
        var service = new google.maps.places.PlacesService(map);
        // Oluşturulan servise istek gönderilir, results ve status olmak üzere 2 parametre döner.
        service.nearbySearch(request, function (results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                // results ;  eczanelerin adı, enlem ve boylam bilgilerini içerir
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    // Eczaneleri harita üzerinde işaretlemek için marker oluşturulur.
                    // map : oluşturulacağu harita, position ise enlem/boylam bilgisidir.
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                    });
                    // Eklenen her marker için bir 'click' event i oluştulur
                    marker.addListener('click', function (e) {
                        // e paramatresi, tıklanılan marker a ait bilgileri getirir.
                        console.log(e.latLng.lat());
                        console.log(e.latLng.lng());
                        var destination = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
                        // marker a tıklandığında, kullanıcının konumundan(from), marker'ın(eczanenin)
                        // konumuna bir direction çizilir. 
                        //Bunun için başlangıç noktası, hedef ve travel modunu içeren bir request oluşturulur.
                        var request = {
                            origin: origin,
                            destination: destination,
                            travelMode: document.getElementById('travelModeLabel').innerText.toUpperCase()
                        };
                        // İstek service gönderildi, response olarak dönen değer ise rotadır.
                        directionsService.route(request, function (response, status) {
                            if (status == "OK") {
                                // Rota bilgisi harita üzerine eklendi.
                                directionDisplay.setDirections(response);
                            }
                        });
                    }); // end marker click
                }
            }
        });
    };
    HomePage.prototype.showMapWithYandex = function () {
        var lat = this.position.latitude, lng = this.position.longitude;
        console.log(lat, lng);
        this.title = "Yandex Maps";
        if (ymaps.Map) {
            var ymap, previousRoute;
            ymaps.ready(function () {
                // 'map' id li div üzerinde bir ymap(yandex map) oluşturduk.
                ymap = new ymaps.Map("map", {
                    center: [lat, lng],
                    zoom: 10,
                    controls: []
                });
                // Eczaneleri getirme
                // search control oluşturuldu. Girilen kelimeyi içeren yerleri döndürür.
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
                // search control ile 'eczane' keyword ü nü arattık. 
                searchControl.search('eczane').then(function () {
                    // Eczaneler bir diziye atıldı
                    var geoObjectsArray = searchControl.getResultsArray();
                    // searchControl içindeki veriler silindi.
                    //  searhcontrol sonuçları otomatik olarak haritaya ekleniyor.
                    //Ancak placemark lara click event ini atayamıyoruz. O yüzden manuel olarak ekleyeceğiz. 
                    searchControl.clear();
                    if (geoObjectsArray.length) {
                        console.log(geoObjectsArray);
                        for (var i = 0; i < geoObjectsArray.length; i++) {
                            // Harita üzerinde eczanelerin işaretlenmesi
                            var placemark = new ymaps.Placemark([geoObjectsArray[i].geometry._coordinates[0],
                                geoObjectsArray[i].geometry._coordinates[1]], {
                                balloonContent: geoObjectsArray[i].properties.get("name")
                            }, {
                                preset: "islands#dotCircleIcon",
                                iconColor: '#ff0000'
                            });
                            // Eklenilen placemark için click event i eklendi.
                            // e paramatresi tıklanılan placemark ın bilgisini verir.
                            placemark.events.add('click', function (e) {
                                var thisPlacemark = e.get('target');
                                var destination = [thisPlacemark.geometry._coordinates[0], thisPlacemark.geometry._coordinates[1]];
                                // Bir yandex rotası oluşturuldu
                                ymaps.route([
                                    [lat, lng],
                                    destination
                                ]).then(function (route) {
                                    // Daha önce herhangi bir eczane tıklandıysa, ona ait rota silinir. 
                                    // Son tıklanılan eczanenin rota bilgisi eklenir.
                                    if (previousRoute != null) {
                                        ymap.geoObjects.remove(previousRoute);
                                    }
                                    previousRoute = route;
                                    //Rota bilgisi haritaya eklenir
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
    };
    HomePage.prototype.getCurrentPosition = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.geolocation.getCurrentPosition().then(function (location) {
                resolve(location.coords);
            });
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
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\fathig\source\repos\BBB_Mobile\ionic-maps v1\src\pages\home\home.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="danger">\n\n    <ion-title>\n\n      {{title}}\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content id="content">\n\n  <label hidden id="travelModeLabel">Driving</label>\n\n\n\n  <div class="travelMode">\n\n    <ion-select [(ngModel)]="travelMode" (ngModelChange)="onChange($event)" style="float:left;height:40px;width:100%; font-size:12px ;\n\n                    background-color :white;">\n\n      <ion-option selected value="Driving">Driving</ion-option>\n\n      <ion-option value="Walking">Walking</ion-option>\n\n      <!-- <ion-option value="Bicycling">Bicycling</ion-option> -->\n\n      <!-- <ion-option value="Transit">Transit</ion-option>-->\n\n    </ion-select>\n\n  </div>\n\n  <div class="changeMaps">\n\n    <ion-select [(ngModel)]="mapType" (ngModelChange)="onChangeMaps($event)" style="float:left;height:40px;width:100%; font-size:12px ;\n\n    background-color :white;">\n\n      <ion-option selected value="Google">Google Maps</ion-option>\n\n      <ion-option value="Yandex">Yandex Maps</ion-option>\n\n    </ion-select>\n\n  </div>\n\n\n\n  <div id="map">\n\n\n\n  </div>\n\n  <div id="directionsPanel" style="width:100%;">\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\fathig\source\repos\BBB_Mobile\ionic-maps v1\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _b || Object])
    ], HomePage);
    return HomePage;
    var _a, _b;
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
            //statusBar.overlaysWebView(true);
            // set status bar to white
            statusBar.backgroundColorByHexString("#fff");
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