import { Component  } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            // Show progress spinner or progress bar
            console.log('Route change detected');
        }
        if (event instanceof NavigationEnd) {
            if(event.url !== '/signIn' && event.url !== '/signUp'){
              localStorage.setItem('prevLocation',event.url);
            }
        }
        if (event instanceof NavigationError) {
            console.log(event.error);
        }
    });
}
  title = 'MedicalServices';
}
