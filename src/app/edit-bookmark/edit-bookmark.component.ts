import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../shared/bookmark.service';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {
  bookmark!: Bookmark | undefined

  constructor(
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const bookmarkId = paramMap.get('id');
      if (bookmarkId) {
        this.bookmark = this.bookmarkService.getBookmark(bookmarkId);
      }
    });

    this.notificationService.show('Bookmark updated!')
  }

  onFormSubmit(form: NgForm) {
    if (!this.bookmark) return; // Handle case when bookmark is undefined

    const { name, url} = form.value;
    this.bookmarkService.updateBookmark(this.bookmark.id, {
      name,
      url: new URL(url)
    });
  }

  delete() {
    if (!this.bookmark) return // Handle case when bookmark is undefined

    this.bookmarkService.deleteBookmark(this.bookmark.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
