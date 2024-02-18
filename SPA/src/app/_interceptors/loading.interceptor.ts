import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { SpinnerService } from '../_services/spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.spin();

    return next.handle(request).pipe(
      delay(500),
      finalize(() => {
        this.spinnerService.idle();
      })
    );
  }
}
