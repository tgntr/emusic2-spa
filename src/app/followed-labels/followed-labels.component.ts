import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../_helpers/base.component';
import { takeUntil } from 'rxjs/operators';
import { FollowDetails } from '../_models/followDetails';
import { LabelService } from '../_services/label.service';

@Component({
  selector: 'app-followed-labels',
  templateUrl: './followed-labels.component.html',
  styleUrls: ['./followed-labels.component.css']
})
export class FollowedLabelsComponent extends BaseComponent implements OnInit {
  followedLabels: FollowDetails[];
  page: number = 1;

  constructor(private labelService: LabelService) { super() }

  ngOnInit() {
    this.labelService.getFollowedLabels(this.page)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(followedLabels => this.followedLabels = followedLabels);
  }

  unfollow(index) {
    this.labelService.unfollow(this.followedLabels[index].id).subscribe(() => {
      this.followedLabels.splice(index, 1);
    })
  }

  onScroll() {
    this.page ++;
    this.labelService.getFollowedLabels(this.page).pipe(takeUntil(this.unsubscribe)).subscribe(followedLabels=> {
      this.followedLabels = this.followedLabels.concat(followedLabels);
    })
  }
}
