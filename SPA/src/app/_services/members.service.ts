import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMember } from '../_models/imember';
import { Observable, map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: IMember[] = [];
  paginatedResult: PaginatedResult<IMember[]> = new PaginatedResult<
    IMember[]
  >();

  constructor(private http: HttpClient) {}

  getMembers(
    page?: number,
    itemsPerPage?: number
  ): Observable<PaginatedResult<IMember[]>> {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<IMember[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map((response) => {
          if (response.body) {
            this.paginatedResult.result = response.body;
          }
          const pagination = response.headers.get('Pagination');
          if (pagination) {
            this.paginatedResult.pagination = JSON.parse(pagination);
          }
          return this.paginatedResult;
        })
      );
  }

  getMember(username: string): Observable<IMember> {
    const member = this.members.find((x) => x.userName === username);
    if (member) return of(member);
    return this.http.get<IMember>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: IMember): Observable<void> {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member };
      })
    );
  }

  setMainPhoto(photoId: number): Observable<Object> {
    return this.http.put(this.baseUrl + 'users/photo/' + photoId, {});
  }

  deletePhoto(photoId: number): Observable<Object> {
    console.log('photoId de nuevo: ' + photoId);
    return this.http.delete(this.baseUrl + 'users/photo/' + photoId, {});
  }
}
