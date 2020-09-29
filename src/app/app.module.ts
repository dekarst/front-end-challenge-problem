import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {BackendInterceptor} from './backend-interceptor/BackendInterceptor';
import {HomeComponent} from './home/home.component';
import {EquipmentComponent} from './equipment/equipment.component';
import {EquipmentItemComponent} from './shared/components/equipment-item/equipment-item.component';
import {EquipmentService} from './shared/services/equipment.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        EquipmentComponent,
        EquipmentItemComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        AngularFontAwesomeModule,
        HttpClientModule,
    ],
    providers: [
        // Leverage a bogus backend so we don't have to stand something up somewhere on the internet.
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BackendInterceptor,
            multi: true
        },
        EquipmentService,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule {
}
