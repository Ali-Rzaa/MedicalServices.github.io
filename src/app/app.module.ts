import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './user/home/home.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './services/errorhandler/errorhandler.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { StoreModule } from '@ngrx/store';
import { getUserProfileReducer } from './NGRX/reducers/user-reducer';

@NgModule({
  declarations: [AppComponent, HomeComponent, UserProfileComponent, NotFoundComponent],
  imports: [BrowserModule, FontAwesomeModule, HttpClientModule, UserModule, AuthModule, MatTabsModule, UserModule, AdminModule, NgbModule, BrowserAnimationsModule, MatButtonModule, AppRoutingModule, MatIconModule, StoreModule.forRoot({userReducer:getUserProfileReducer})],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
