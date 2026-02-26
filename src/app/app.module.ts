import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {  HttpClientModule, HttpHeaders } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { AppComponent } from './app.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
// import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
// import { FormsModule } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CalendarModule } from 'ion2-calendar';
// import { Camera } from '@ionic-native/camera/ngx';
import { ClintTicketsEditComponent } from './clint-tickets-edit/clint-tickets-edit.component';
// geolocation and native-geocoder
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
// import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';

import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
@NgModule({
  declarations: [AppComponent,ClintTicketsEditComponent,  PopupModalComponent,],
  imports: [BrowserModule,IonicModule.forRoot(),    IonicStorageModule.forRoot(),   Ng2SearchPipeModule,  ReactiveFormsModule,  FormsModule , CalendarModule , AppRoutingModule, NgxOtpInputModule, HttpClientModule, NgxUiLoaderModule, 

   ],
  providers: [
    StatusBar,
    DatePipe,
    Geolocation,
    FirebaseX,
    NativeGeocoder,
     LocalNotifications ,
    AndroidPermissions,
    NativeAudio,
    BarcodeScanner,
    LocationAccuracy,
    Device ,
  InAppBrowser ,
    // Camera,
    SplashScreen,
    { provide:
     RouteReuseStrategy,
    
      useClass: IonicRouteStrategy 
     
    }],
  bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}


 
   