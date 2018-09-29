import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));
};

bootstrap().then(() => {
    document.querySelector('.preloader').className += ' preloader-hidden preloader-hidden-add preloader-hidden-add-active';
});