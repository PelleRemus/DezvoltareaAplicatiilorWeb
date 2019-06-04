import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment';

@Injectable()
export class CommentsService {

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    getComments(articleId: string) {
        return this.http.get<Comment[]>(this.baseUrl + `api/Comments/GetComments/${articleId}`);
    }

    postComment(comment: Comment) {
        return this.http.post<any>(this.baseUrl + `api/Comments/PostComment`, comment);
    }

    putComment(comment: Comment) {
        return this.http.put<any>(this.baseUrl + `api/Comments/PutComment`, comment);
    }

    deleteComment(commentId: string) {
        return this.http.delete<any>(this.baseUrl + `api/Comments/DeleteComment/${commentId}`);
    }
}
