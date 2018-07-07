import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
 
declare var google: any;
declare var ymaps: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private title: string;

  public travelMode: string;

  public mapType: string = "Google";
  position = undefined;
  constructor(public navCtrl: NavController,
    private geolocation: Geolocation) {

  }

  // view her yüklendiğinde çağrılır
  async ionViewDidLoad() {

    if (this.position == undefined) {
      console.log("loooking for coords");
      await this.getCurrentPosition()
        .then(coords => {
          this.position = coords;
        })
        .catch(err => console.log(err));
    }
    this.showMapWithGoogle();
    //this.showMapWithYandex();

  }

  showMapWithGoogle() {

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
          })
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
            })
          }); // end marker click
        }
      }
    });
  }

  showMapWithYandex() {
    var lat = this.position.latitude,
      lng = this.position.longitude;
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
              geoObjectsArray[i].geometry._coordinates[1]],
                {
                  balloonContent: geoObjectsArray[i].properties.get("name")
                },
                {
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
                }
                );
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

  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then(location => {
        resolve(location.coords);
      })
    });
  }

  onChange(travelMode) {
    console.log(travelMode);
    document.getElementById("travelModeLabel").innerText = travelMode;
    console.log("label : " + document.getElementById("travelModeLabel").innerText);

  }  //Travel mode her değiştiğinde tetiklenecek
  onChangeMaps(mapsType) {
    document.getElementById("map").innerHTML = "";
    document.getElementById("directionsPanel").innerHTML = "";
    if (this.mapType === "Yandex") {
      this.showMapWithYandex();
    }
    else {
      this.showMapWithGoogle();
    }
  }
  //END
}
